'use client';

import { useState, useEffect } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { ux } from '@/lib/ux';
import { Database, Save, Loader2, RefreshCw, Terminal, CheckCircle2, AlertCircle } from 'lucide-react';
import { cn } from '@/lib/utils';

export function TemplateManager() {
  const [sourceType, setSourceType] = useState('us_news');
  const [prompt, setPrompt] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  const fetchTemplateForSource = async (src: string) => {
    setIsLoading(true);
    setError(null);
    setSuccess(false);
    try {
      const res = await fetch('/api/counselor/extraction-templates');
      const templates = await res.json();
      
      // Match using the new schema which maps to rankingSourceId 
      // The API returns rankingSource with name mapping, so we filter where rankingSource.name === src
      const matches = templates.filter((t: any) => t.rankingSource?.name === src && t.isActive);
      matches.sort((a: any, b: any) => b.version - a.version);
      
      if (matches.length > 0) {
        setPrompt(matches[0].promptText);
      } else {
        setPrompt('');
      }
    } catch (err) {
      console.error('Failed to fetch template for source:', src);
      setError('Failed to load existing template.');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchTemplateForSource(sourceType);
  }, [sourceType]);

  const handleSavePrompt = async () => {
    setIsSaving(true);
    setError(null);
    setSuccess(false);

    try {
      const res = await fetch(`/api/counselor/extraction-templates`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          sourceType,
          promptText: prompt
        })
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Failed to save prompt');
      
      setSuccess(true);
      setTimeout(() => setSuccess(false), 3000);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <Card className={ux.card.base}>
        <CardHeader>
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-brand-50 rounded-xl flex items-center justify-center text-brand-600">
              <Database className="w-5 h-5" />
            </div>
            <div>
              <CardTitle className="text-sm font-black uppercase tracking-widest text-slate-900">
                Source Extraction Prompt
              </CardTitle>
              <p className="text-[10px] text-slate-500 font-medium leading-relaxed uppercase tracking-tight mt-1">
                Define the single AI extraction prompt for all documents from this source.
              </p>
            </div>
          </div>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid gap-6 md:grid-cols-2 bg-slate-50 p-4 rounded-xl border border-slate-100">
            <div className="space-y-2">
              <label className={ux.form.label}>Data Source</label>
              <select 
                className={ux.form.input}
                value={sourceType}
                onChange={(e) => setSourceType(e.target.value)}
                disabled={isSaving || isLoading}
              >
                <option value="us_news">US News Prompt</option>
                <option value="niche">Niche Prompt</option>
                <option value="common_app">Common App Prompt</option>
                <option value="institutional">Generic Institutional Prompt</option>
              </select>
            </div>
          </div>

          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <label className="text-[10px] font-black uppercase text-slate-500 tracking-widest flex items-center gap-1.5">
                <Terminal className="w-3 h-3 text-brand-400" />
                LLM Instructions
              </label>
              {isLoading && <Loader2 className="w-3.5 h-3.5 animate-spin text-slate-400" />}
            </div>
            
            <Textarea 
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              disabled={isLoading || isSaving}
              className="font-mono text-xs h-96 bg-slate-950 text-brand-300 border-none focus:ring-4 focus:ring-brand-500/20 transition-all resize-none leading-relaxed p-6 rounded-2xl shadow-inner custom-scrollbar"
              placeholder="Enter the AI extraction instructions here... (e.g. Extract the acceptance rate, tuition cost, and top 3 majors from this raw HTML...)"
            />
          </div>

          {error && (
            <div className="p-4 bg-red-50 border border-red-100 rounded-xl flex items-center gap-3 text-red-600 animate-in fade-in">
              <AlertCircle className="w-5 h-5 flex-shrink-0" />
              <p className="text-xs font-bold uppercase tracking-tight">{error}</p>
            </div>
          )}

          {success && (
            <div className="p-4 bg-green-50 border border-green-100 rounded-xl flex items-center gap-3 text-green-700 animate-in fade-in">
              <CheckCircle2 className="w-5 h-5 flex-shrink-0" />
              <p className="text-xs font-bold uppercase tracking-tight">Template saved successfully</p>
            </div>
          )}

          <div className="pt-4 border-t border-slate-100 flex justify-end">
            <Button 
              onClick={handleSavePrompt} 
              disabled={isSaving || isLoading || !prompt.trim()}
              className="h-10 bg-brand-600 hover:bg-brand-500 text-white shadow-md text-xs uppercase font-black px-8"
            >
              {isSaving ? (
                <><Loader2 className="w-4 h-4 animate-spin mr-2" /> Saving Prompt...</>
              ) : (
                <><Save className="w-4 h-4 mr-2" /> Save Prompt Configuration</>
              )}
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
