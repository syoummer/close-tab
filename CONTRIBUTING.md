# Contributing to Close Random Tab

Thank you for your interest in contributing to Close Random Tab! This document provides guidelines for contributing to this Chrome extension project.

## Getting Started

### Prerequisites

- Node.js 14.0.0 or higher
- Google Chrome browser
- Git

### Development Setup

1. **Fork and clone the repository**
   ```bash
   git clone https://github.com/syoummer/close-tab.git
   cd close-tab
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Load the extension in Chrome**
   - Open Chrome and go to `chrome://extensions/`
   - Enable "Developer mode"
   - Click "Load unpacked" and select the `src/` directory

## Development Workflow

### Making Changes

1. **Create a feature branch**
   ```bash
   git checkout -b feature/your-feature-name
   ```

2. **Make your changes**
   - Edit files in the `src/` directory
   - Follow the existing code style and conventions

3. **Test your changes**
   ```bash
   # Run linting
   npm run lint
   
   # Run tests
   npm test
   
   # Test manually in Chrome
   # Reload extension and verify functionality
   ```

4. **Build the extension**
   ```bash
   npm run build:dev
   ```

### Code Style

- Use ES6+ JavaScript features where supported
- Add error handling for all Chrome API calls
- Use meaningful variable and function names
- Add JSDoc comments for functions
- Follow existing indentation (2 spaces)

### Example Code Style

```javascript
/**
 * Closes a randomly selected tab from the current window
 * @param {Function} callback - Optional callback function
 */
function closeRandomTab(callback) {
  chrome.tabs.query({currentWindow: true}, (tabs) => {
    if (chrome.runtime.lastError) {
      console.error('Error querying tabs:', chrome.runtime.lastError);
      return;
    }
    
    if (tabs.length <= 1) {
      console.log('Cannot close the last remaining tab');
      return;
    }
    
    const randomIndex = Math.floor(Math.random() * tabs.length);
    const tabToClose = tabs[randomIndex];
    
    chrome.tabs.remove(tabToClose.id, () => {
      if (callback) callback();
    });
  });
}
```

## Testing

### Manual Testing

Before submitting your contribution:

1. **Load the extension** in Chrome developer mode
2. **Test basic functionality** with multiple tabs
3. **Test edge cases**:
   - Single tab scenario
   - Different types of tabs (regular, pinned, chrome://)
   - Incognito mode (if applicable)
4. **Verify no console errors** in DevTools

### Automated Testing

```bash
# Run all tests
npm test

# Run tests with coverage
npm run test:coverage

# Run tests in watch mode during development
npm test:watch
```

### Writing Tests

- Add unit tests for utility functions
- Add integration tests for Chrome API interactions
- Mock Chrome APIs in tests
- Ensure tests are isolated and don't affect each other

## Submitting Changes

### Pull Request Process

1. **Ensure all tests pass**
   ```bash
   npm test
   npm run lint
   ```

2. **Update documentation** if needed
   - Update README.md if adding new features
   - Update API documentation in `docs/api.md`
   - Add JSDoc comments to new functions

3. **Create a pull request**
   - Use a descriptive title
   - Explain what changes you made and why
   - Reference any related issues
   - Include screenshots for UI changes

### Pull Request Template

```markdown
## Description
Brief description of changes made.

## Type of Change
- [ ] Bug fix (non-breaking change which fixes an issue)
- [ ] New feature (non-breaking change which adds functionality)
- [ ] Breaking change (fix or feature that would cause existing functionality to not work as expected)
- [ ] Documentation update

## Testing
- [ ] Manual testing completed
- [ ] Automated tests pass
- [ ] Extension loads without errors
- [ ] Functionality works as expected

## Screenshots (if applicable)
Add screenshots to help explain your changes.
```

## Reporting Issues

### Bug Reports

When reporting bugs, please include:

- **Chrome version** and operating system
- **Extension version** or commit hash
- **Steps to reproduce** the issue
- **Expected behavior** vs actual behavior
- **Console errors** (if any)
- **Screenshots** (if applicable)

### Feature Requests

For feature requests, please:

- **Describe the feature** and its use case
- **Explain why** it would be valuable
- **Consider implementation** complexity and alternatives

## Code of Conduct

### Our Standards

- Be respectful and inclusive
- Focus on constructive feedback
- Help others learn and grow
- Maintain a professional tone

### Unacceptable Behavior

- Harassment or discrimination
- Offensive language or imagery
- Personal attacks
- Spam or off-topic discussions

## Development Resources

### Useful Links

- [Chrome Extension Developer Guide](https://developer.chrome.com/docs/extensions/)
- [Chrome Extension APIs](https://developer.chrome.com/docs/extensions/reference/)
- [Testing Chrome Extensions](https://developer.chrome.com/docs/extensions/how-to/test/)

### Project Structure

```
close-tab/
├── src/                 # Extension source code
├── docs/               # Documentation
├── test/               # Test files
├── dist/               # Built extension
└── package.json        # Dependencies and scripts
```

## Questions?

If you have questions about contributing:

1. Check existing [issues](https://github.com/syoummer/close-tab/issues)
2. Create a new issue with the "question" label
3. Join our community discussions

Thank you for contributing to Close Random Tab! 🎉