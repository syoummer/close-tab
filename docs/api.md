# API Documentation

## Chrome Extension APIs Used

### chrome.tabs

The extension uses the Chrome Tabs API to interact with browser tabs.

#### Required Permissions

```json
{
  "permissions": ["tabs"]
}
```

#### Key Methods

##### `chrome.tabs.query(queryInfo, callback)`

Used to get a list of all open tabs in the current window.

```javascript
chrome.tabs.query({currentWindow: true}, (tabs) => {
  // Process tabs array
});
```

**Parameters:**
- `queryInfo`: Object with `currentWindow: true` to get tabs from active window
- `callback`: Function that receives the tabs array

##### `chrome.tabs.remove(tabId, callback)`

Used to close the randomly selected tab.

```javascript
chrome.tabs.remove(tabId, () => {
  // Tab closed successfully
});
```

**Parameters:**
- `tabId`: Integer ID of the tab to close
- `callback`: Optional callback function

## Extension Architecture

### Background Script

The background script handles the core logic:

```javascript
// Listen for browser action clicks
chrome.browserAction.onClicked.addListener(() => {
  closeRandomTab();
});

function closeRandomTab() {
  // Get all tabs in current window
  chrome.tabs.query({currentWindow: true}, (tabs) => {
    if (tabs.length <= 1) {
      // Don't close the last tab
      return;
    }
    
    // Select random tab
    const randomIndex = Math.floor(Math.random() * tabs.length);
    const tabToClose = tabs[randomIndex];
    
    // Close the selected tab
    chrome.tabs.remove(tabToClose.id);
  });
}
```

### Popup Interface (Optional)

If using a popup interface:

```javascript
// popup.js
document.getElementById('close-random').addEventListener('click', () => {
  // Send message to background script
  chrome.runtime.sendMessage({action: 'closeRandomTab'});
  window.close();
});
```

## Error Handling

The extension should handle these scenarios:

1. **Single Tab**: Don't close if only one tab is open
2. **Permission Denied**: Handle cases where tab access is restricted
3. **Tab Already Closed**: Handle race conditions where tab is closed before action

## Security Considerations

- Extension only accesses tabs in the current window
- No external network requests required
- Minimal permissions requested (only `tabs`)
- No user data storage or transmission