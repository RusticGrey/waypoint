import { Page } from 'puppeteer';

export interface ExtractionResult {
  data: any;
  fieldsFound: string[];
  fieldsNotFound: string[];
  confidence: number;
  modelUsed: string;
}

export interface RankingSourceAdapter {
  name: string;
  displayName: string;
  
  /**
   * Extracts specific fields from the rendered page using LLM
   */
  extractFields(page: Page, fields: string[]): Promise<ExtractionResult>;
  
  /**
   * Returns a map of field categories to URL segments or hash fragments
   */
  getSectionMapping(): Record<string, string>;

  /**
   * Performs login on the source website
   */
  login(page: Page, credentials: any): Promise<boolean>;

  /**
   * Checks if current page indicates a successful login/premium state
   */
  isLoggedIn(page: Page): Promise<boolean>;
}
