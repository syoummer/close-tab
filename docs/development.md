# Development Guide

## Prerequisites

- Google Chrome browser
- Text editor or IDE
- Basic knowledge of JavaScript and Chrome Extension APIs

## Project Setup

### 1. Clone or Initialize Project

```bash
mkdir close-tab
cd close-tab
```

### 2. Create Project Structure

```bash
mkdir src docs dist
mkdir src/icons
```

### 3. Required Files

Create these essential files in the `src/` directory:

- `manifest.json` - Extension configuration
- `background.js` - Core functionality
- `popup.html` - UI (optional)
- `popup.js` - UI logic (optional)
- Icons in `icons/` directory

## Development Workflow

### 1. Load Extension in Chrome

1. Open Chrome and navigate to `chrome://extensions/`
2. Enable "Developer mode" (toggle in top right)
3. Click "Load unpacked"
4. Select your `src/` directory
5. Extension will appear in the extensions list

### 2. Testing Changes

After making code changes:

1. Go to `chrome://extensions/`
2. Find your extension
3. Click the reload icon (↻)
4. Test the updated functionality

### 3. Debug Console

- **Background Script**: Right-click extension → "Inspect views: background page"
- **Popup Script**: Right-click extension icon → "Inspect popup"

## File Specifications

### manifest.json

```json
{
  "manifest_version": 2,
  "name": "Close Random Tab",
  "version": "1.0",
  "description": "Randomly closes one of your open tabs",
  
  "permissions": ["tabs"],
  
  "background": {
    "scripts": ["background.js"],
    "persistent": false
  },
  
  "browser_action": {
    "default_title": "Close Random Tab",
    "default_popup": "popup.html",
    "default_icon": {
      "16": "icons/icon16.png",
      "48": "icons/icon48.png",
      "128": "icons/icon128.png"
    }
  },
  
  "icons": {
    "16": "icons/icon16.png",
    "48": "icons/icon48.png",
    "128": "icons/icon128.png"
  }
}
```

### Icon Requirements

Create icons in these sizes:
- 16x16 pixels (toolbar)
- 48x48 pixels (extension management)
- 128x128 pixels (Chrome Web Store)

## Build Process

### Development Build

For development, the `src/` directory can be loaded directly into Chrome.

### Production Build

1. Copy all files from `src/` to `dist/`
2. Minify JavaScript files (optional)
3. Optimize images (optional)
4. Create ZIP file for Chrome Web Store submission

```bash
# Simple build script
cp -r src/* dist/
cd dist
zip -r ../close-random-tab.zip .
```

## Code Style Guidelines

### JavaScript

- Use ES6+ features where supported
- Add error handling for all Chrome API calls
- Use meaningful variable names
- Add comments for complex logic

### Example Error Handling

```javascript
chrome.tabs.query({currentWindow: true}, (tabs) => {
  if (chrome.runtime.lastError) {
    console.error('Error querying tabs:', chrome.runtime.lastError);
    return;
  }
  
  // Process tabs...
});
```

## Local Testing Guide

### Loading Unpacked Extensions (2024)

#### Step 1: Access Extensions Page
Multiple ways to reach `chrome://extensions/`:
- Type `chrome://extensions` in address bar
- Chrome menu → More Tools → Extensions
- Click Extensions puzzle icon → Manage Extensions

#### Step 2: Enable Developer Mode
Toggle "Developer mode" switch in top-right corner

#### Step 3: Load Your Extension
1. Click "Load unpacked" button
2. Navigate to your `src/` directory
3. Select the folder containing `manifest.json`
4. Click "Open" or "Select Folder"

#### Real-time Development
- Make code changes in your editor
- Click reload icon (↻) next to your extension
- Chrome automatically loads changes
- No need to repackage during development

### Debugging Techniques

#### DevTools Access
- **Background Script**: Right-click extension → "Inspect views: background page"
- **Popup Script**: Right-click extension icon → "Inspect popup"
- **Content Scripts**: Use regular DevTools on target page

#### Error Detection
- Red "Errors" button appears on extension card if errors occur
- Click "Errors" to view detailed error information
- Check console logs in DevTools for runtime errors

#### Performance Monitoring
- Use Chrome Task Manager (Shift+Esc) to monitor resource usage
- Track memory and CPU consumption
- Ensure background scripts are optimized

### Manual Testing Strategy

#### Basic Functionality Tests
1. **Single Tab Test**: Verify extension doesn't close last remaining tab
2. **Multiple Tabs Test**: Confirm random tab closure with 3+ tabs
3. **Tab Types**: Test with regular, pinned, and special pages
4. **Edge Cases**: Test with chrome:// URLs and extension pages

#### Cross-Environment Testing
1. **Incognito Mode**: Enable extension in incognito, test behavior
2. **Different Profiles**: Test with guest and restricted profiles
3. **Multiple Windows**: Verify only current window tabs affected
4. **Platform Testing**: Test on Windows, macOS, Linux if possible

### Automated Testing Setup

#### Prerequisites
```bash
npm install --save-dev jest puppeteer
```

#### Jest + Puppeteer Configuration

Create `jest.config.js`:
```javascript
module.exports = {
  preset: 'jest-puppeteer',
  testEnvironment: 'node',
  setupFilesAfterEnv: ['./test/setup.js']
};
```

Create `test/setup.js`:
```javascript
const path = require('path');

beforeEach(async () => {
  // Launch browser with extension
  browser = await puppeteer.launch({
    headless: false, // Extensions don't work in headless mode
    args: [
      `--disable-extensions-except=${path.join(__dirname, '../src')}`,
      `--load-extension=${path.join(__dirname, '../src')}`,
      '--no-sandbox'
    ],
    slowMo: 50 // Slow down for debugging
  });
  
  page = await browser.newPage();
});

afterEach(async () => {
  await browser.close();
});
```

#### Sample Test File (`test/extension.test.js`)
```javascript
describe('Close Random Tab Extension', () => {
  test('should load extension without errors', async () => {
    // Open multiple tabs
    await page.goto('https://example.com');
    const page2 = await browser.newPage();
    await page2.goto('https://google.com');
    
    // Get initial tab count
    const initialPages = await browser.pages();
    expect(initialPages.length).toBeGreaterThan(1);
    
    // Trigger extension (method depends on implementation)
    // This would need to be adapted based on your specific extension UI
    
    // Verify tab was closed
    await page.waitForTimeout(1000);
    const finalPages = await browser.pages();
    expect(finalPages.length).toBe(initialPages.length - 1);
  });

  test('should not close last remaining tab', async () => {
    // Ensure only one tab is open
    const pages = await browser.pages();
    for (let i = 1; i < pages.length; i++) {
      await pages[i].close();
    }
    
    // Trigger extension
    // Verify tab count remains 1
    const finalPages = await browser.pages();
    expect(finalPages.length).toBe(1);
  });
});
```

#### Running Tests
```bash
# Run all tests
npm test

# Run tests in watch mode
npm test -- --watch

# Run with verbose output
npm test -- --verbose
```

### Unit Testing for Utility Functions

#### Example Unit Test (`test/utils.test.js`)
```javascript
// If you have utility functions to test
const { getRandomTabIndex, isValidTab } = require('../src/utils');

describe('Utility Functions', () => {
  test('getRandomTabIndex returns valid index', () => {
    const tabs = new Array(5).fill({});
    const index = getRandomTabIndex(tabs);
    expect(index).toBeGreaterThanOrEqual(0);
    expect(index).toBeLessThan(tabs.length);
  });

  test('isValidTab validates tab objects', () => {
    expect(isValidTab({ id: 1, url: 'https://example.com' })).toBe(true);
    expect(isValidTab({ id: 1, url: 'chrome://settings' })).toBe(true);
    expect(isValidTab(null)).toBe(false);
    expect(isValidTab({})).toBe(false);
  });
});
```

### Testing Limitations

#### Puppeteer Constraints
- **No Headless Mode**: Extensions require `headless: false`
- **Popup Access**: Cannot directly interact with extension popups
- **Workaround**: Open popup as new tab for testing

#### Chrome API Mocking
For unit tests, mock Chrome APIs:
```javascript
// In test setup
global.chrome = {
  tabs: {
    query: jest.fn(),
    remove: jest.fn()
  },
  runtime: {
    lastError: null
  }
};
```

### Development Mode Detection
Check if extension is running unpacked:
```javascript
// Extension is in development if no update_url in manifest
const isDevelopment = !chrome.runtime.getManifest().update_url;
```

## Common Issues

### Permission Errors

- Ensure `"tabs"` permission is in manifest.json
- Some special pages (chrome://) may be restricted

### API Changes

- Chrome Extension APIs change between manifest versions
- Test across different Chrome versions
- Monitor Chrome Developer documentation for updates

## Publishing Checklist

Before submitting to Chrome Web Store:

- [ ] Test in incognito mode
- [ ] Test with various tab configurations
- [ ] Verify all icons display correctly
- [ ] Update version number in manifest.json
- [ ] Create production build
- [ ] Test production build
- [ ] Prepare store listing materials