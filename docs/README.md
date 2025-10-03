# Close Random Tab - Chrome Extension

A Chrome extension that randomly closes one of your open tabs to help manage tab overload.

## Overview

This extension provides a simple solution for users who accumulate too many tabs and need a random way to close them. With a single click, it will randomly select and close one of your currently open tabs.

## Features

- **Random Tab Closure**: Closes a randomly selected tab from your current browser window
- **One-Click Action**: Simple browser action button for immediate use
- **Safe Operation**: Prevents closing the last remaining tab
- **Lightweight**: Minimal resource usage

## Project Structure

```
close-tab/
├── docs/
│   ├── README.md           # Project overview (this file)
│   ├── api.md             # Extension API documentation
│   ├── development.md     # Development setup and guidelines
│   ├── testing.md         # Manual testing instructions
│   └── user-guide.md      # User installation and usage guide
├── src/
│   ├── manifest.json      # Extension manifest
│   ├── background.js      # Background script
│   ├── popup.html         # Extension popup UI
│   ├── popup.js           # Popup functionality
│   └── icons/             # Extension icons
└── dist/                  # Built extension files
```

## Quick Start

1. See [Development Guide](development.md) for setup instructions
2. See [User Guide](user-guide.md) for installation and usage
3. See [Testing Guide](testing.md) for manual testing instructions
4. See [API Documentation](api.md) for technical details

## Contributing

This project follows standard Chrome extension development practices. See the development guide for contribution guidelines.