import { Page } from 'puppeteer';
import { RankingSourceAdapter, ExtractionResult } from './rankingSourceAdapter';

export class USNewsAdapter implements RankingSourceAdapter {
  name = 'us_news';
  displayName = 'US News';

  getSectionMapping(): Record<string, string> {
    return {
      rankings: '#rankings',
      admissions: '#admissions',
      financials: '#paying-for-college',
    };
  }

  async extractFields(page: Page, fields: string[]): Promise<ExtractionResult> {
    // Standard extraction result following interface
    return {
      data: {},
      fieldsFound: [],
      fieldsNotFound: fields,
      confidence: 0,
      modelUsed: 'none'
    };
  }

  async login(page: Page, credentials: any): Promise<boolean> {
    console.log(`[SCRAPER] [${this.displayName}] Starting Natural login process for ${credentials.email}...`);
    try {
      // 1. Visit main page to initialize session naturally
      console.log(`[SCRAPER] [${this.displayName}] Navigating to home page...`);
      await page.goto('https://www.usnews.com/', { waitUntil: 'networkidle2' });
      
      // 2. Locate and click the Sign In button (simulating human behavior)
      console.log(`[SCRAPER] [${this.displayName}] Clicking Sign In button...`);
      const triggerFound = await page.evaluate(() => {
        const elements = Array.from(document.querySelectorAll('button, a, span'));
        const signInBtn = elements.find(el => 
          el.textContent?.trim() === 'Sign In' || 
          el.textContent?.trim() === 'Log In' ||
          el.classList.contains('user-login-link')
        );
        if (signInBtn) {
          (signInBtn as HTMLElement).click();
          return true;
        }
        return false;
      });

      if (!triggerFound) {
        console.log(`[SCRAPER] [${this.displayName}] Sign In button not found, trying common login path...`);
        await page.goto('https://www.usnews.com/emailprefs/login', { waitUntil: 'networkidle2' });
      }

      // 3. Wait for the form elements to appear
      console.log(`[SCRAPER] [${this.displayName}] Waiting for login fields...`);
      const usernameSelector = 'input[type="email"], input[name="username"], input[id*="email"], #username';
      await page.waitForSelector(usernameSelector, { timeout: 15000 });
      
      // 4. Interaction
      console.log(`[SCRAPER] [${this.displayName}] Entering email...`);
      await page.type(usernameSelector, credentials.email, { delay: 100 });
      
      // Some forms use a multi-step process
      const hasPasswordInput = await page.$('input[type="password"], input[name="password"], #password');
      if (!hasPasswordInput) {
        console.log(`[SCRAPER] [${this.displayName}] Multi-step login detected, revealing password field...`);
        const continueBtnFound = await page.evaluate(() => {
          const btns = Array.from(document.querySelectorAll('button'));
          const continueBtn = btns.find(b => b.textContent?.match(/Continue|Next/i));
          if (continueBtn) {
            continueBtn.click();
            return true;
          }
          return false;
        });

        if (!continueBtnFound) await page.keyboard.press('Enter');
        await page.waitForSelector('input[type="password"], input[name="password"], #password', { timeout: 10000 });
      }
      
      console.log(`[SCRAPER] [${this.displayName}] Entering password...`);
      const passwordSelector = 'input[type="password"], input[name="password"], #password';
      await page.type(passwordSelector, credentials.password, { delay: 150 });
      
      console.log(`[SCRAPER] [${this.displayName}] Submitting login...`);
      await page.keyboard.press('Enter');
      
      // 5. Verification with iterative context tracking
      console.log(`[SCRAPER] [${this.displayName}] Finalizing session (iterative verification)...`);
      
      let success = false;
      for (let i = 0; i < 20; i++) {
        const isLoggedIn = await this.isLoggedIn(page);
        if (isLoggedIn) {
          success = true;
          break;
        }
        await new Promise(r => setTimeout(r, 1000));
      }

      console.log(`[SCRAPER] [${this.displayName}] Login result: ${success ? 'SUCCESS' : 'FAILED'}`);
      return success;
    } catch (error: any) {
      console.error(`[SCRAPER] [${this.displayName}] ERROR during login:`, error.message);
      return false;
    }
  }

  async isLoggedIn(page: Page): Promise<boolean> {
    return await page.evaluate(() => {
      const text = document.body.innerText;
      const avatarIcon = document.querySelector('.user-profile-icon, .profile-avatar, svg[class*="avatar"]');
      const hasSignOut = !!Array.from(document.querySelectorAll('a, button')).find(el => el.textContent?.match(/Sign Out|Log Out/i));
      return text.includes('Welcome') || !!avatarIcon || hasSignOut;
    });
  }
}
