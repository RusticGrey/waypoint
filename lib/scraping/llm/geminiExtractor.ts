import { GoogleGenerativeAI, SchemaType } from '@google/generative-ai';
import { ExtractionResult } from '../sources/dataSourceAdapter';

export class GeminiExtractor {
  private genAI: GoogleGenerativeAI;

  constructor(apiKey: string) {
    this.genAI = new GoogleGenerativeAI(apiKey);
  }

  async extract(html: string, fields: string[]): Promise<ExtractionResult> {
    const promptTemplate = `
      You are a specialized data extractor for college ranking websites.
      Extract the following fields from the provided HTML: {{fields}}.
      
      Rules:
      1. Return ONLY a valid JSON object.
      2. If a field is not found, set its value to null.
      3. For rankings, extract the numeric value.
      4. For financial values, extract as numbers if possible.
      
      Expected JSON format:
      {
        "data": { ...extracted values... },
        "fieldsFound": ["field1", "field2"],
        "fieldsNotFound": ["field3"],
        "confidence": 0.95
      }
      
      HTML Content:
      {{html}}
    `;
    
    const prompt = promptTemplate
      .replace('{{fields}}', fields.join(', '))
      .replace('{{html}}', html.substring(0, 30000));

    return await this.extractWithPrompt(prompt);
  }

  async extractWithTemplate(
    content: string | string[], 
    promptTemplate: string, 
    options?: { documentType?: string, mimeType?: string }
  ): Promise<any> {
    
    let parts: any[] = [];
    
    // If it's a base64 encoded document (image_pdf or image), structure it for Gemini Vision
    if (options?.documentType === 'image_pdf' || options?.documentType === 'image') {
      parts.push({ text: promptTemplate });
      parts.push({ text: "Please transcribe the attached document(s) into JSON format." });

      const contents = Array.isArray(content) ? content : [content];
      
      for (const item of contents) {
        // Sanitized base64
        const base64Data = item.includes(',') ? item.split(',')[1] : item;

        // VALIDATION: Check if content is empty or looks like an invalid base64
        if (!base64Data || base64Data.trim().length < 20) {
          console.warn('Skipping empty/invalid document part in multi-block feed.');
          continue;
        }
        
        parts.push({
          inlineData: {
            data: base64Data,
            mimeType: options.mimeType || 'application/pdf'
          }
        });
      }

      if (parts.length <= 2) {
        throw new Error('DOCUMENT_EMPTY_OR_INVALID: No valid document parts provided for extraction.');
      }
    } else {
      // Normal HTML or Text
      const contents = Array.isArray(content) ? content.join("\n\n---\n\n") : content;
      const cleanHtmlString = this.cleanHtml(contents);
      
      let finalPrompt = promptTemplate;
      if (finalPrompt.includes('{{html}}')) {
        finalPrompt = finalPrompt.replace('{{html}}', cleanHtmlString.substring(0, 30000));
      } else {
        finalPrompt = `${promptTemplate}\n\nDocument Content:\n${cleanHtmlString.substring(0, 30000)}`;
      }
      parts.push(finalPrompt);
    }
    
    return await this.extractWithPrompt(parts);
  }

  private async extractWithPrompt(
    promptParts: any, 
    modelName: string = process.env.LLM_MODEL_EXTRACTION || 'gemini-2.5-flash',
    skipHandshake: boolean = true // Optimized: skip by default in high-frequency loops
  ): Promise<any> {
    if (!this.genAI.apiKey) {
      throw new Error('Gemini API Key is missing.');
    }

    // Handshake check
    if (!skipHandshake) {
      try {
         const handshakeModel = this.genAI.getGenerativeModel({ model: modelName });
         await handshakeModel.generateContent("READY?");
         console.log(`LLM Handshake SUCCESS for model: ${modelName}`);
      } catch (err) {
         console.error(`LLM Handshake FAILED for model: ${modelName}`);
      }
    }

    try {
      const model = this.genAI.getGenerativeModel({ 
        model: modelName,
        generationConfig: {
          responseMimeType: "application/json",
          temperature: 0.1, // Low temperature for high-fidelity transcription
          topP: 0.95,
          topK: 40,
        }
      });
      const result = await model.generateContent(promptParts);
      const response = await result.response;
      const text = response.text();
      
      // Senior Engineer approach: isolate JSON using balance matching or regex fallback
      let jsonStr = text;
      
      // 1. Try to find content between first { and last }
      const firstBrace = text.indexOf('{');
      const lastBrace = text.lastIndexOf('}');
      
      if (firstBrace !== -1 && lastBrace !== -1 && lastBrace > firstBrace) {
        jsonStr = text.substring(firstBrace, lastBrace + 1);
      } else {
        // Fallback: simple markdown cleanup
        jsonStr = text.replace(/```json|```/g, '').trim();
      }

      try {
        return JSON.parse(jsonStr);
      } catch (parseError) {
        console.error('Initial JSON parse failed. Raw LLM response:', text);
        // Last resort: try to fix common LLM mistakes (like trailing commas)
        const cleaned = jsonStr
          .replace(/,\s*}/g, '}')
          .replace(/,\s*]/g, ']');
        return JSON.parse(cleaned);
      }
    } catch (error: any) {
      const isFlash = modelName.includes('flash');
      if (isFlash && (error?.message?.includes('429') || error?.message?.includes('limit'))) {
        console.warn('Gemini limit reached, attempting fallback to alternative Flash...');
        // Try 1.5 Flash as alternative if 2.5 is busy or not available
        return await this.extractWithPrompt(promptParts, 'gemini-1.5-flash');
      }
      throw error;
    }
  }

  private cleanHtml(html: string): string {
    // Basic cleaning to reduce tokens: remove scripts, styles, and extra whitespace
    return html
      .replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, '')
      .replace(/<style\b[^<]*(?:(?!<\/style>)<[^<]*)*<\/style>/gi, '')
      .replace(/\s+/g, ' ')
      .trim();
  }

  private async attemptExtraction(html: string, fields: string[], modelName: string): Promise<ExtractionResult> {
    // This is now replaced by extractWithPrompt, keeping for compatibility if needed elsewhere
    // but refactoring to use the new common method
    const prompt = `Extract ${fields.join(', ')} from this HTML as JSON: ${html.substring(0, 20000)}`;
    const data = await this.extractWithPrompt([prompt], modelName);
    return {
      data: data.data || data,
      fieldsFound: data.fieldsFound || Object.keys(data.data || data),
      fieldsNotFound: data.fieldsNotFound || [],
      confidence: data.confidence || 0.9,
      modelUsed: modelName
    };
  }

  async generateAnswer(context: string, query: string, history: { role: string, content: string }[] = []): Promise<string> {
    const model = this.genAI.getGenerativeModel({ 
      model: process.env.LLM_MODEL_CHAT || 'gemini-2.5-flash' 
    });

    // Construct a context-aware prompt with history
    const historyContext = history.length > 0 
      ? `Recent Conversation History:\n${history.map(h => `${h.role.toUpperCase()}: ${h.content}`).join('\n')}\n\n`
      : '';

    const prompt = `
      You are the Waypoint Knowledge Assistant, a professional admissions consultant.
      
      STRICT INTERACTION RULES:
      1. Data Priority: ALWAYS prioritize data from the "Repository Context" (the verified Waypoint database).
      2. Enrichment: For open-ended questions, profiles, or comparisons, you MUST supplement the verified data with your general AI knowledge (e.g., faculty prestige, research labs, culture). 
      3. Mandatory Caveat: Anytime you use general knowledge NOT found in the context, you MUST explicitly start that section with "[OUTSIDE SOURCE]:".
      4. Tabular Comparisons: When comparing multiple colleges, ALWAYS present the verified numerical data (Acceptance rates, SATs, Tuition) in clean, side-by-side Markdown tables.
      5. Tone: Maintain a professional, counselor-grade tone. Be comprehensive but well-structured.
      6. Synonyms: "CMU" refers to "Carnegie Mellon University" and "MIT" refers to "Massachusetts Institute of Technology".

      Repository Context (Verified Local Data):
      ${context}
      
      ${historyContext}
      User Question: ${query}
      
      Assistant Response:
    `;

    const result = await model.generateContent(prompt);
    const response = await result.response;
    return response.text();
  }

  // AGENTIC UPGRADE: Define granular tools for precision intelligence
  static readonly TOOLS = {
    functionDeclarations: [
      {
        name: "get_college_ids",
        description: "Resolves names or acronyms to unique database IDs. Call this whenever you have a name/shorthand but not the technical ID.",
        parameters: {
          type: SchemaType.OBJECT,
          properties: {
            names: {
              type: SchemaType.ARRAY,
              items: { type: SchemaType.STRING },
              description: "List of institution names to resolve."
            }
          },
          required: ["names"]
        }
      },
      {
        name: "get_subject_rankings",
        description: "Fetches ALL major/minor/subject rankings for one or more colleges. Use this when the user asks for 'all rankings' or 'all majors'.",
        parameters: {
          type: SchemaType.OBJECT,
          properties: {
            collegeIds: {
              type: SchemaType.ARRAY,
              items: { type: SchemaType.STRING },
              description: "Database IDs of the colleges."
            }
          },
          required: ["collegeIds"]
        }
      },
      {
        name: "get_specific_ranking",
        description: "Fetches the rank for a SPECIFIC major or subject. ALWAYS expand abbreviations to full formal names (e.g., 'Computer Science' NOT 'CS').",
        parameters: {
          type: SchemaType.OBJECT,
          properties: {
            collegeIds: {
              type: SchemaType.ARRAY,
              items: { type: SchemaType.STRING }
            },
            subject: {
              type: SchemaType.STRING,
              description: "The FULL formal name of the subject (e.g., 'Computer Science'). NEVER use acronyms."
            }
          },
          required: ["collegeIds", "subject"]
        }
      },
      {
        name: "get_global_college_metrics",
        description: "Returns a high-level summary of EVERY college in the system, including acceptance rates, tuition/cost of attendance, and basic stats. Use this when the user asks for comparisons, rankings by stat (e.g. 'lowest acceptance rate' or 'cheapest college'), or lists of colleges meeting numeric criteria.",
        parameters: {
          type: SchemaType.OBJECT,
          properties: {
            academicYear: {
              type: SchemaType.STRING,
              description: "Filter by academic year (e.g., '2024'). Defaults to latest available."
            }
          }
        }
      },
      {
        name: "get_admissions_stats",
        description: "Fetches acceptance rates, SAT/ACT ranges, GPA requirements, application deadlines, AND supplementary insights including campus life, housing types, and student activities.",
        parameters: {
          type: SchemaType.OBJECT,
          properties: {
            collegeIds: {
              type: SchemaType.ARRAY,
              items: { type: SchemaType.STRING }
            }
          },
          required: ["collegeIds"]
        }
      },
      {
        name: "get_financial_stats",
        description: "Fetches tuition, fees, and total sticker price for colleges.",
        parameters: {
          type: SchemaType.OBJECT,
          properties: {
            collegeIds: {
              type: SchemaType.ARRAY,
              items: { type: SchemaType.STRING }
            }
          },
          required: ["collegeIds"]
        }
      },
      {
        name: "search_intelligence_repository",
        description: "Global search for discovery queries. ALWAYS expand abbreviations to full formal names (e.g., 'Computer Science' NOT 'CS').",
        parameters: {
          type: SchemaType.OBJECT,
          properties: {
            searchTopic: {
              type: SchemaType.STRING,
              description: "The FULL formal name of the subject or major (e.g., 'Computer Science'). NEVER use acronyms."
            }
          },
          required: ["searchTopic"]
        }
      },
      {
        name: "learn_new_acronym",
        description: "Saves a new acronym or shorthand expansion to the Intelligence Glossary. Call this if you identify a term that isn't resolved by other tools but you know its expansion from general knowledge.",
        parameters: {
          type: SchemaType.OBJECT,
          properties: {
            term: {
              type: SchemaType.STRING,
              description: "The acronym or shorthand (e.g., 'GT', 'Berkeley')."
            },
            expansion: {
              type: SchemaType.STRING,
              description: "The full formal name (e.g., 'Georgia Institute of Technology')."
            },
            category: {
              type: SchemaType.STRING,
              description: "The category of the term (e.g., 'college', 'major', 'test')."
            }
          },
          required: ["term", "expansion"]
        }
      }
    ]
  };

  static readonly SYSTEM_INSTRUCTION = `
    You are the Waypoint Beacon AI, a professional institutional analyst. 
    
    STRICT INTERACTION RULES:
    1. Data Priority: ALWAYS prioritize data retrieved through your tools (the Waypoint Repository) as the primary source of truth.
    2. External Knowledge Fallback: If your tools return no data or insufficient information to answer a user's question, you MAY use your general AI knowledge (external sources) to provide a helpful response.
    3. Mandatory Caveat: If you provide any information that did NOT come from your tools, you MUST explicitly start that sentence or paragraph with "[OUTSIDE SOURCE]:" or "Note (External Source):".
    4. Holistic Comparisons: When asked to "compare" or evaluate colleges, do not just return the rankings. You MUST use all relevant tools (e.g., admissions, financial, and subject rankings) to provide a multi-dimensional, high-value analysis including outcomes and research where available.
    5. Data Analysis: You are highly encouraged to sort, filter, and mathematically compare data provided by your tools. 
    6. Rankings: Treat requests for "top" or "best" colleges as objective data requests. Use your tools to fetch the verified rankings from the database and present them objectively.
    7. Multi-turn: Use history to maintain context (e.g., knowing which college is being discussed).
    8. Comprehensive Overviews: When a user asks for a 'summary' or 'overview', ALWAYS fetch ALL available data points using your tools to provide a 360-degree view.

    RESOLVING COLLEGES (CRITICAL):
    - If a user uses a nickname (e.g. 'uchicago', 'gt', 'cal') that 'get_college_ids' returns as NOT_FOUND:
      a) Check your internal knowledge for the full formal name (e.g. 'University of Chicago').
      b) IMMEDIATELY call 'learn_new_acronym' to save the mapping.
      c) SIMULTANEOUSLY call 'get_college_ids' again using the FULL FORMAL NAME to get the ID.
      d) NEVER tell the user a college is missing until you have tried both the nickname AND the formal name.
  `;
}

export const extractDataFromDocument = async (
  content: string | string[], 
  promptTemplate: string, 
  outputSchema: any,
  options?: { documentType?: string, mimeType?: string }
) => {
  const extractor = new GeminiExtractor(process.env.GOOGLE_AI_API_KEY!);
  return await extractor.extractWithTemplate(content, promptTemplate, options);
};
