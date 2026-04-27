import puppeteer from 'puppeteer';

async function debugLogin() {
  const email = process.argv[2];
  const password = process.argv[3];
  const collegeToSearch = process.argv[4] || 'Carnegie Mellon University';

  if (!email || !password) {
    console.error('Usage: npx ts-node scripts/debug-usnews-login.ts <email> <password> [collegeName]');
    process.exit(1);
  }

  console.log(`[DEBUG] Starting Iteration #4: Premium Handshake test for ${email}...`);
  
  const browser = await puppeteer.launch({ 
    headless: false, 
    defaultViewport: null,
    args: [
      '--no-sandbox', 
      '--disable-setuid-sandbox', 
      '--disable-http2', 
      '--start-maximized',
      '--disable-blink-features=AutomationControlled'
    ] 
  });
  
  const page = await browser.newPage();
  
  await page.evaluateOnNewDocument(() => {
    Object.defineProperty(navigator, 'webdriver', { get: () => false });
  });

  await page.setUserAgent('Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/122.0.0.0 Safari/537.36');

  try {
    // 1. Visit home page
    console.log('[DEBUG] Step 1: Navigating to US News home page...');
    await page.goto('https://www.usnews.com/', { waitUntil: 'networkidle2' });

    // 2. Click Sign In
    console.log('[DEBUG] Step 2: Triggering Sign In overlay...');
    const loginTriggered = await page.evaluate(() => {
      const el = Array.from(document.querySelectorAll('button, a, span')).find(e => 
        e.textContent?.trim().match(/Sign In|Log In/i)
      ) as HTMLElement;
      if (el) {
        el.scrollIntoView();
        const rect = el.getBoundingClientRect();
        return { x: rect.left + rect.width / 2, y: rect.top + rect.height / 2 };
      }
      return null;
    });

    if (loginTriggered) {
      console.log('[DEBUG] Moving mouse to Sign In and clicking...');
      await page.mouse.move(loginTriggered.x, loginTriggered.y, { steps: 15 });
      await page.mouse.click(loginTriggered.x, loginTriggered.y);
      await new Promise(r => setTimeout(r, 4000));
    } else {
      console.log('[DEBUG] Sign In button not found. Falling back to direct URL...');
      await page.goto('https://www.usnews.com/emailprefs/login', { waitUntil: 'networkidle2' });
    }

    // 3. Login Interaction
    console.log('[DEBUG] Waiting for login fields...');
    const usernameSelector = 'input[type="email"], input[name="username"], input[id*="email"], #username';
    await page.waitForSelector(usernameSelector, { timeout: 15000 });
    
    console.log('[DEBUG] Entering email...');
    await page.type(usernameSelector, email, { delay: 100 });
    
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
    
    console.log('[DEBUG] Waiting for password field...');
    const passwordSelector = 'input[type="password"], input[name="password"], #password';
    await page.waitForSelector(passwordSelector, { timeout: 10000 });
    
    console.log('[DEBUG] Entering password...');
    await page.type(passwordSelector, password, { delay: 150 });
    
    console.log('[DEBUG] Submitting login...');
    const submitClicked = await page.evaluate(() => {
      const btns = Array.from(document.querySelectorAll('button'));
      const loginBtn = btns.find(b => b.textContent?.match(/Log In|Sign In|Submit/i) && b.type === 'submit');
      if (loginBtn) {
        loginBtn.click();
        return true;
      }
      return false;
    });
    if (!submitClicked) {
      console.log('[DEBUG] Submit button not found by text, pressing Enter...');
      await page.keyboard.press('Enter');
    }
    
    // 4. Verification
    console.log('[DEBUG] Step 4: Verifying session status...');
    let success = false;
    for (let i = 0; i < 20; i++) {
      const currentUrl = page.url();
      const sessionInfo = await page.evaluate(() => {
        const text = document.body.innerText;
        // ULTRA-BROAD Check: Any svg in the header, or disappearance of Sign In
        const header = document.querySelector('header');
        const headerSvgs = header ? header.querySelectorAll('svg').length : 0;
        const hasUserIcon = !!document.querySelector('svg[class*="user"], [class*="user-icon"], [class*="profile-icon"], [aria-label*="Account"], [aria-label*="Profile"], .user-login-link svg');
        const hasLogout = !!Array.from(document.querySelectorAll('a, button')).find(el => el.textContent?.match(/Sign Out|Log Out|My Account/i));
        
        const signInBtn = Array.from(document.querySelectorAll('button, a')).find(el => el.textContent?.trim().match(/Sign In|Log In/i));
        const signInVisible = signInBtn && (signInBtn as HTMLElement).offsetParent !== null;

        // If Sign In is gone, or we have more SVGs in header than usual, or logout exists
        return hasLogout || hasUserIcon || !signInVisible || text.includes('Welcome');
      });

      if (sessionInfo) {
        console.log(`[DEBUG] SUCCESS! Session confirmed via page state change at ${currentUrl} (Iteration ${i})`);
        success = true;
        break;
      }
      
      if (currentUrl.includes('premium.usnews.com')) {
        console.log(`[DEBUG] Session confirmed via premium domain redirect at ${currentUrl} (Iteration ${i})`);
        success = true;
        break;
      }

      if (i % 5 === 0) console.log(`[DEBUG] Still waiting for session... Current URL: ${currentUrl}`);
      await new Promise(r => setTimeout(r, 1000));
    }

    console.log('[DEBUG] Final login result:', success ? 'LOGGED IN ✓' : 'FAILED ✗');

    if (success) {
      console.log('[DEBUG] !!! PROCEEDING TO SEARCH !!!');
      console.log('[DEBUG] Post-login wait (8s) to allow session to settle...');
      await new Promise(r => setTimeout(r, 8000));

      console.log(`[DEBUG] Step 5: Stealth Search for "${collegeToSearch}"`);
      const searchBtnCoords = await page.evaluate(() => {
        const el = Array.from(document.querySelectorAll('button, a, svg')).find(e => 
          e.textContent?.match(/Search/i) || e.getAttribute('aria-label')?.match(/Search/i) || e.classList.contains('search-icon')
        ) as HTMLElement;
        if (el) {
          // VISUAL FEEDBACK: Highlight the button in red
          const visualEl = el.tagName === 'svg' ? (el.parentElement as HTMLElement) : (el as HTMLElement);
          visualEl.style.border = '5px solid red';
          visualEl.style.backgroundColor = 'rgba(255, 0, 0, 0.2)';
          
          const rect = el.getBoundingClientRect();
          return { x: rect.left + rect.width / 2, y: rect.top + rect.height / 2 };
        }
        return null;
      });

      if (searchBtnCoords) {
        console.log('[DEBUG] Iteration #5: Simulating Curved Mouse Path and Human Hover...');
        // Curved movement (Bezier-ish)
        const start = { x: 100, y: 100 };
        const control = { x: searchBtnCoords.x / 2, y: searchBtnCoords.y + 100 };
        for (let i = 0; i <= 1; i += 0.05) {
          const x = (1 - i) * (1 - i) * start.x + 2 * (1 - i) * i * control.x + i * i * searchBtnCoords.x;
          const y = (1 - i) * (1 - i) * start.y + 2 * (1 - i) * i * control.y + i * i * searchBtnCoords.y;
          await page.mouse.move(x, y);
          await new Promise(r => setTimeout(r, 20));
        }

        console.log('[DEBUG] Hovering search button for 3s (mimicking human pause)...');
        await new Promise(r => setTimeout(r, 3000));
        
        console.log('[DEBUG] Performing jittered click...');
        await page.mouse.down();
        await new Promise(r => setTimeout(r, Math.random() * 100 + 50));
        await page.mouse.up();
        
        console.log('[DEBUG] Waiting for search overlay to animate...');
        await new Promise(r => setTimeout(r, 5000));
      }

      // 2. Wait for the actual input field (Broadened)
      console.log('[DEBUG] Locating Search Input (broadened search)...');
      const searchInputSelector = await page.evaluate(() => {
        // Try to find a visible input that might be a search box
        const inputs = Array.from(document.querySelectorAll('input'));
        const searchInput = inputs.find(i => {
          const style = window.getComputedStyle(i);
          return style.display !== 'none' && style.visibility !== 'hidden' && 
                 (i.placeholder?.match(/Search/i) || i.name?.match(/q|search/i) || i.className?.match(/search/i));
        });
        if (searchInput) {
          searchInput.style.border = '5px solid blue'; // Highlight input in blue
          return 'input'; // We'll find it specifically by property in type command
        }
        return null;
      });

      if (!searchInputSelector) {
        console.log('[DEBUG] Direct selector wait for fallback...');
      }
      
      const finalSelector = 'input[placeholder*="Search"], input[name="q"], .search-input, input[type="search"]';
      await page.waitForSelector(finalSelector, { timeout: 15000, visible: true });
      
      console.log('[DEBUG] Typing query with human-like jitter...');
      const query = `${collegeToSearch} college ranking`;
      for (const char of query) {
        await page.keyboard.type(char, { delay: Math.random() * 200 + 100 });
      }
      
      console.log('[DEBUG] Contemplation pause before submitting search...');
      await new Promise(r => setTimeout(r, 3000));
      await page.keyboard.press('Enter');

      console.log('[DEBUG] Step 6: Waiting for results page load...');
      await page.waitForNavigation({ waitUntil: 'networkidle2', timeout: 30000 }).catch(() => {});

      console.log('[DEBUG] Step 7: Searching for target link in results...');
      const targetData = await page.evaluate((name) => {
        const links = Array.from(document.querySelectorAll('a'));
        const target = links.find(l => 
          l.textContent?.toLowerCase().includes(name.toLowerCase()) && 
          l.href.includes('/best-colleges/')
        ) as HTMLAnchorElement;
        if (target) {
          target.scrollIntoView();
          const rect = target.getBoundingClientRect();
          return { x: rect.left + rect.width / 2, y: rect.top + rect.height / 2, href: target.href };
        }
        return null;
      }, collegeToSearch);

      if (targetData) {
        console.log(`[DEBUG] Target link found: ${targetData.href}`);
        console.log('[DEBUG] Moving mouse to target link...');
        await page.mouse.move(targetData.x + 2, targetData.y + 2, { steps: 30 });
        await new Promise(r => setTimeout(r, 1500));
        
        console.log('[DEBUG] Clicking target link (Premium Handshake Trigger)...');
        await page.mouse.click(targetData.x, targetData.y);
        
        console.log('[DEBUG] Handshake clicked. Monitoring URL bar for "premium.usnews.com"...');
        for (let i = 0; i < 15; i++) {
          const finalUrl = page.url();
          console.log(`[DEBUG] Current URL Check #${i}: ${finalUrl}`);
          if (finalUrl.includes('premium.usnews.com')) {
            console.log('[DEBUG] PREMISUM ACCESS CONFIRMED! Redirect to premium domain detected.');
            break;
          }
          await new Promise(r => setTimeout(r, 1000));
        }
      } else {
        console.log('[DEBUG] ERROR: Could not find the college link in search results.');
      }
    }

    console.log('[DEBUG] Manual verification window active (60s). Please check the browser URL bar.');
    await new Promise(resolve => setTimeout(resolve, 60000));

  } catch (err: any) {
    console.error('[DEBUG] FATAL ERROR:', err.message);
  } finally {
    await browser.close();
    console.log('[DEBUG] Test finished.');
  }
}

debugLogin();
