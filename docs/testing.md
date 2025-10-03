# Testing the Close Random Tab Extension

## Manual Testing Instructions

### 1. Load the Extension in Chrome

1. Open Chrome and navigate to `chrome://extensions/`
2. Enable "Developer mode" (toggle in top right)
3. Click "Load unpacked"
4. Select the `src/` directory (or `dist/` if you built it)
5. The extension should appear in your extensions list

### 2. Basic Functionality Test

1. **Open multiple tabs** (at least 3-4 tabs)
2. **Click the extension icon** in the toolbar
3. **Click "Close Random Tab"** in the popup
4. **Verify** that one tab closes randomly
5. **Check** that the popup shows success message with tab info
6. **Verify** that the undo section appears with last closed tab info

### 2a. Undo Functionality Test

1. **After closing a tab**, verify the "Reopen Last Closed Tab" button appears
2. **Check** that the undo info shows the correct tab title and time
3. **Click "Reopen Last Closed Tab"**
4. **Verify** that the tab reopens correctly
5. **Check** that the undo section disappears after reopening

### 3. Edge Cases to Test

#### Single Tab Test
1. Close all tabs except one
2. Click the extension icon
3. Verify the popup shows "Only one tab open - cannot close"
4. Verify the button is disabled
5. Check that undo section still appears if there's a recent closed tab

#### Multiple Windows Test
1. Open a new Chrome window with multiple tabs
2. Use the extension in one window
3. Verify it only affects tabs in the current window

#### Undo Time Expiry Test
1. Close a tab using the extension
2. Wait 5+ minutes (or modify timeout for testing)
3. Open the extension popup
4. Verify the undo section no longer appears

#### No Recent Closed Tab Test
1. Fresh browser session or clear extension data
2. Open the extension popup
3. Verify no undo section appears initially

### 4. Debug Console Testing

1. **Background Script Console**:
   - Right-click extension → "Inspect views: service worker"
   - Look for console logs when closing tabs

2. **Popup Console**:
   - Right-click extension icon → "Inspect popup"
   - Check for any JavaScript errors

### 5. Expected Behavior

✅ **Should Work:**
- Close random tabs when multiple tabs are open
- Show success message with closed tab info
- Prevent closing the last remaining tab
- Work with different types of web pages
- Show proper error messages
- **Display undo section after closing a tab**
- **Reopen the last closed tab with one click**
- **Show time elapsed since tab was closed**
- **Hide undo section after 5 minutes or after reopening**
- **Preserve tab properties (pinned status, position)**

❌ **Should NOT:**
- Close the last remaining tab
- Close tabs from other windows
- Crash or show JavaScript errors
- Work in headless/incognito without permission
- **Allow reopening tabs closed more than 5 minutes ago**
- **Show undo section when no tabs have been closed**

## Troubleshooting

### Common Issues

1. **Extension doesn't load**: Check manifest.json syntax
2. **No popup appears**: Check popup.html path in manifest
3. **Nothing happens on click**: Check background.js console for errors
4. **Permission errors**: Ensure "tabs" permission is in manifest

### Console Commands for Testing

```javascript
// In background script console:
chrome.tabs.query({currentWindow: true}, (tabs) => {
  console.log('Current tabs:', tabs.length);
});

// Test the close function directly:
closeRandomTab().then(result => console.log(result));

// Test the undo function:
reopenLastTab().then(result => console.log(result));

// Check last closed tab info:
console.log(getLastClosedTabInfo());

// Check stored tab data:
console.log('Last closed tab:', lastClosedTab);
```

## Success Criteria

The extension is working correctly if:
- ✅ It loads without errors
- ✅ Popup appears when clicking the icon
- ✅ Button works and closes random tabs
- ✅ Shows appropriate messages for different scenarios
- ✅ Respects the "last tab" safety rule
- ✅ Only affects current window tabs
- ✅ **Undo section appears after closing tabs**
- ✅ **Undo button successfully reopens last closed tab**
- ✅ **Time stamps update correctly**
- ✅ **Undo functionality expires after 5 minutes**
- ✅ **Tab properties are preserved when reopening**