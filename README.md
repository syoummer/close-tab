# Close Random Tab 🎲

A Chrome extension that randomly closes one of your open tabs to help manage tab overload.

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![Chrome Web Store](https://img.shields.io/badge/Chrome-Web%20Store-blue)](https://chromewebstore.google.com/detail/close-random-tab/ljnahamcajanhfikhngchoehgedlmnci)

## 🚀 Features

- **Random Tab Closure**: Closes a randomly selected tab from your current browser window
- **One-Click Action**: Simple browser action button for immediate use
- **Safe Operation**: Prevents closing the last remaining tab
- **Lightweight**: Minimal resource usage and permissions
- **Cross-Platform**: Works on Windows, macOS, and Linux

## 📦 Installation

### From Chrome Web Store (Recommended)

1. Visit the [Close Random Tab extension page](https://chromewebstore.google.com/detail/close-random-tab/ljnahamcajanhfikhngchoehgedlmnci)
2. Click "Add to Chrome"
3. Confirm installation when prompted

### Manual Installation (Development)

1. Clone this repository:
   ```bash
   git clone https://github.com/syoummer/close-tab.git
   cd close-tab
   ```

2. Load the extension in Chrome:
   - Open Chrome and go to `chrome://extensions/`
   - Enable "Developer mode"
   - Click "Load unpacked"
   - Select the `src/` directory

## 🎯 Usage

1. **Open multiple tabs** in your Chrome browser
2. **Click the extension icon** in your toolbar
3. **One random tab will close** automatically

> **Note**: The extension will never close your last remaining tab.

## 🛠️ Development

### Prerequisites

- Node.js 14.0.0 or higher
- Google Chrome browser
- Git

### Setup

```bash
# Install dependencies
npm install

# Run tests
npm test

# Build extension
npm run build:dev

# Lint code
npm run lint
```

### Project Structure

```
close-tab/
├── src/                 # Extension source code
│   ├── manifest.json    # Extension manifest
│   ├── background.js    # Background script
│   ├── popup.html       # Extension popup UI
│   ├── popup.js         # Popup functionality
│   └── icons/           # Extension icons
├── docs/                # Documentation
├── test/                # Test files
├── dist/                # Built extension files
└── package.json         # Dependencies and scripts
```

### Testing

```bash
# Run all tests
npm test

# Run tests in watch mode
npm run test:watch

# Run tests with coverage
npm run test:coverage
```

For detailed development instructions, see our [Development Guide](docs/development.md).

## 📚 Documentation

- [Development Guide](docs/development.md) - Setup and development workflow
- [API Documentation](docs/api.md) - Chrome Extension APIs used
- [User Guide](docs/user-guide.md) - Installation and usage instructions

## 🤝 Contributing

We welcome contributions! Please see our [Contributing Guide](CONTRIBUTING.md) for details.

### Quick Start for Contributors

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/amazing-feature`
3. Make your changes and test them
4. Commit your changes: `git commit -m 'Add amazing feature'`
5. Push to the branch: `git push origin feature/amazing-feature`
6. Open a Pull Request

## 🐛 Issues

Found a bug or have a feature request? Please [open an issue](https://github.com/syoummer/close-tab/issues) on GitHub.

When reporting bugs, please include:
- Chrome version and operating system
- Steps to reproduce the issue
- Expected vs actual behavior
- Screenshots (if applicable)

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🔒 Privacy & Security

- **No Data Collection**: This extension does not collect, store, or transmit any user data
- **Minimal Permissions**: Only requests access to browser tabs
- **Local Operation**: All functionality runs locally in your browser
- **Open Source**: Code is publicly available for security review

## ❓ FAQ

### Why would I want to randomly close tabs?

When you have too many tabs open, decision fatigue can make it difficult to choose which ones to close. This extension removes that decision-making burden by randomly selecting a tab for you.

### Can I undo closing a tab?

Yes! Use Chrome's built-in "Recently Closed" feature:
- Press `Ctrl+Shift+T` (Windows/Linux) or `Cmd+Shift+T` (Mac)
- Or go to Menu → History → Recently Closed

### Will it close important tabs?

The extension doesn't distinguish between tabs - it's completely random. Be cautious if you have unsaved work in open tabs.

## 🙏 Acknowledgments

- Thanks to all contributors who help improve this extension
- Inspired by the need to manage tab overload in modern web browsing
- Dice emoji icons by [Twemoji](https://github.com/twitter/twemoji) (CC-BY 4.0)

## 📄 Attribution

This project uses the dice emoji from Twemoji, licensed under CC-BY 4.0. See [ATTRIBUTION.md](ATTRIBUTION.md) for full details.

---

Made with ❤️ for productive browsing