# User Guide

## Installation

### From Chrome Web Store (Recommended)

1. Open Google Chrome
2. Visit the Chrome Web Store
3. Search for "Close Random Tab"
4. Click "Add to Chrome"
5. Confirm installation when prompted

### Manual Installation (Development)

1. Download the extension files
2. Open Chrome and go to `chrome://extensions/`
3. Enable "Developer mode" (toggle in top right)
4. Click "Load unpacked"
5. Select the folder containing the extension files
6. The extension icon will appear in your browser toolbar

## How to Use

### Basic Usage

1. **Open multiple tabs** in your Chrome browser
2. **Click the extension icon** in your toolbar (looks like a close/X button)
3. **One random tab will close** automatically

### Alternative Usage (Popup Version)

If the extension has a popup interface:

1. Click the extension icon
2. Click the "Close Random Tab" button in the popup
3. The popup will close and a random tab will be closed

## Features

### Safe Operation

- **Last Tab Protection**: The extension will never close your last remaining tab
- **Current Window Only**: Only affects tabs in the currently active browser window
- **Instant Action**: Tabs close immediately with no confirmation dialog

### What Gets Closed

The extension can close:
- Regular web pages
- Extension pages
- Most chrome:// pages (settings, bookmarks, etc.)

The extension may not be able to close:
- Some protected system pages
- Tabs that are actively being used by other extensions

## Troubleshooting

### Extension Not Working

**Problem**: Clicking the icon does nothing

**Solutions**:
1. Check that you have multiple tabs open (won't close the last tab)
2. Reload the extension at `chrome://extensions/`
3. Restart Chrome browser
4. Reinstall the extension

### No Icon in Toolbar

**Problem**: Can't find the extension icon

**Solutions**:
1. Look for it in the extensions menu (puzzle piece icon)
2. Pin the extension to your toolbar:
   - Click the extensions menu (puzzle piece)
   - Find "Close Random Tab"
   - Click the pin icon next to it

### Permission Issues

**Problem**: Extension shows permission errors

**Solutions**:
1. Make sure the extension has "tabs" permission
2. Reinstall the extension
3. Check Chrome's extension security settings

## Privacy and Security

### What the Extension Can Access

- **Tab Information**: Can see titles and URLs of your open tabs
- **Tab Control**: Can close tabs in your current window

### What the Extension Does NOT Do

- **No Data Collection**: Does not store or transmit any browsing data
- **No External Connections**: Does not connect to external servers
- **No Cross-Window Access**: Only affects the current browser window
- **No Background Monitoring**: Only active when you click the icon

### Permissions Explained

- **"tabs" permission**: Required to see and close tabs
- This is the only permission the extension requests

## Frequently Asked Questions

### Can I choose which tab to close?

No, the extension randomly selects which tab to close. This is the intended behavior to help with decision fatigue when you have too many tabs open.

### Will it close important tabs?

The extension doesn't distinguish between "important" and "unimportant" tabs. It's completely random. Be cautious if you have unsaved work in open tabs.

### Can I undo closing a tab?

Use Chrome's built-in "Recently Closed" feature:
- Press `Ctrl+Shift+T` (Windows/Linux) or `Cmd+Shift+T` (Mac)
- Or go to Menu → History → Recently Closed

### Does it work in incognito mode?

The extension will work in incognito mode if you explicitly allow it:
1. Go to `chrome://extensions/`
2. Find "Close Random Tab"
3. Click "Details"
4. Enable "Allow in incognito"

## Uninstalling

To remove the extension:

1. Go to `chrome://extensions/`
2. Find "Close Random Tab"
3. Click "Remove"
4. Confirm removal

Or right-click the extension icon and select "Remove from Chrome".