/**
 * Popup script for Close Random Tab extension
 * Handles user interactions and communicates with background script
 */

class PopupController {
  constructor() {
    this.closeButton = document.getElementById('closeButton');
    this.statusElement = document.getElementById('status');
    this.tabInfoElement = document.getElementById('tabInfo');
    this.undoSection = document.getElementById('undoSection');
    this.undoButton = document.getElementById('undoButton');
    this.undoInfo = document.getElementById('undoInfo');
    
    this.init();
  }

  init() {
    this.closeButton.addEventListener('click', () => this.handleCloseClick());
    this.undoButton.addEventListener('click', () => this.handleUndoClick());
    this.updateTabCount();
    this.updateUndoSection();
  }

  /**
   * Handle the close button click
   */
  async handleCloseClick() {
    this.setButtonState(true, 'Closing...');
    this.clearStatus();

    try {
      const response = await this.sendMessage({ action: 'closeRandomTab' });
      
      if (response.success) {
        this.showSuccess(response.closedTab);
        this.updateUndoSection(); // Update undo section after successful close
        // Close popup after a short delay to show success message
        setTimeout(() => window.close(), 1500);
      } else {
        this.showError(response.reason);
      }
    } catch (error) {
      console.error('Error communicating with background script:', error);
      this.showError('communication_error');
    } finally {
      this.setButtonState(false, '🎯 Close Random Tab');
    }
  }

  /**
   * Handle the undo button click
   */
  async handleUndoClick() {
    this.setUndoButtonState(true, 'Reopening...');

    try {
      const response = await this.sendMessage({ action: 'reopenLastTab' });
      
      if (response.success) {
        this.showUndoSuccess(response.reopenedTab);
        this.updateUndoSection(); // Hide undo section after successful reopen
        // Close popup after a short delay
        setTimeout(() => window.close(), 1500);
      } else {
        this.showUndoError(response.reason);
      }
    } catch (error) {
      console.error('Error reopening tab:', error);
      this.showUndoError('communication_error');
    } finally {
      this.setUndoButtonState(false, '↶ Reopen Last Closed Tab');
    }
  }

  /**
   * Update the tab count display
   */
  async updateTabCount() {
    try {
      const tabs = await chrome.tabs.query({ currentWindow: true });
      const count = tabs.length;
      
      if (count <= 1) {
        this.statusElement.textContent = 'Only one tab open - cannot close';
        this.statusElement.className = 'status error';
        this.closeButton.disabled = true;
      } else {
        this.statusElement.textContent = `${count} tabs open`;
        this.statusElement.className = 'status';
        this.closeButton.disabled = false;
      }
    } catch (error) {
      console.error('Error getting tab count:', error);
      this.statusElement.textContent = 'Error getting tab info';
      this.statusElement.className = 'status error';
    }
  }

  /**
   * Update the undo section visibility and information
   */
  async updateUndoSection() {
    try {
      const response = await this.sendMessage({ action: 'getLastClosedTabInfo' });
      
      if (response.hasLastTab) {
        const timeSince = this.getTimeSinceText(response.tab.closedAt);
        this.undoInfo.textContent = `"${this.truncateText(response.tab.title, 30)}" closed ${timeSince}`;
        this.undoSection.classList.remove('hidden');
      } else {
        this.undoSection.classList.add('hidden');
      }
    } catch (error) {
      console.error('Error getting last closed tab info:', error);
      this.undoSection.classList.add('hidden');
    }
  }

  /**
   * Show success message with closed tab info
   */
  showSuccess(closedTab) {
    this.statusElement.textContent = '✅ Tab closed successfully!';
    this.statusElement.className = 'status success';
    
    // Show info about the closed tab
    this.tabInfoElement.innerHTML = `
      <div class="tab-title">Closed: "${this.truncateText(closedTab.title, 40)}"</div>
      <div class="tab-count">Closed tab ${closedTab.index + 1} of ${closedTab.totalTabs}</div>
    `;
    this.tabInfoElement.style.display = 'block';
  }

  /**
   * Show error message based on error reason
   */
  showError(reason) {
    let message;
    switch (reason) {
      case 'last_tab':
        message = '❌ Cannot close the last tab';
        break;
      case 'communication_error':
        message = '❌ Extension communication error';
        break;
      case 'error':
        message = '❌ Error closing tab';
        break;
      default:
        message = '❌ Unknown error occurred';
    }
    
    this.statusElement.textContent = message;
    this.statusElement.className = 'status error';
    this.tabInfoElement.style.display = 'none';
  }

  /**
   * Set button state (enabled/disabled and text)
   */
  setButtonState(disabled, text) {
    this.closeButton.disabled = disabled;
    this.closeButton.innerHTML = text.includes('🎯') ? text : `<span class="dice-icon">⏳</span>${text}`;
  }

  /**
   * Clear status messages
   */
  clearStatus() {
    this.statusElement.textContent = '';
    this.statusElement.className = 'status';
    this.tabInfoElement.style.display = 'none';
  }

  /**
   * Send message to background script
   */
  sendMessage(message) {
    return new Promise((resolve, reject) => {
      chrome.runtime.sendMessage(message, (response) => {
        if (chrome.runtime.lastError) {
          reject(new Error(chrome.runtime.lastError.message));
        } else {
          resolve(response);
        }
      });
    });
  }

  /**
   * Show undo success message
   */
  showUndoSuccess(reopenedTab) {
    this.statusElement.textContent = '✅ Tab reopened successfully!';
    this.statusElement.className = 'status success';
    
    this.tabInfoElement.innerHTML = `
      <div class="tab-title">Reopened: "${this.truncateText(reopenedTab.title, 40)}"</div>
    `;
    this.tabInfoElement.style.display = 'block';
  }

  /**
   * Show undo error message
   */
  showUndoError(reason) {
    let message;
    switch (reason) {
      case 'no_tab_to_reopen':
        message = '❌ No tab to reopen';
        break;
      case 'tab_too_old':
        message = '❌ Tab closed too long ago';
        break;
      case 'communication_error':
        message = '❌ Extension communication error';
        break;
      case 'error':
        message = '❌ Error reopening tab';
        break;
      default:
        message = '❌ Cannot reopen tab';
    }
    
    this.statusElement.textContent = message;
    this.statusElement.className = 'status error';
    this.tabInfoElement.style.display = 'none';
  }

  /**
   * Set undo button state (enabled/disabled and text)
   */
  setUndoButtonState(disabled, text) {
    this.undoButton.disabled = disabled;
    this.undoButton.innerHTML = text.includes('↶') ? text : `<span class="undo-icon">⏳</span>${text}`;
  }

  /**
   * Get human-readable time since text
   */
  getTimeSinceText(timestamp) {
    const seconds = Math.floor((Date.now() - timestamp) / 1000);
    
    if (seconds < 10) return 'just now';
    if (seconds < 60) return `${seconds}s ago`;
    
    const minutes = Math.floor(seconds / 60);
    if (minutes < 60) return `${minutes}m ago`;
    
    const hours = Math.floor(minutes / 60);
    return `${hours}h ago`;
  }

  /**
   * Truncate text to specified length
   */
  truncateText(text, maxLength) {
    if (text.length <= maxLength) return text;
    return text.substring(0, maxLength - 3) + '...';
  }
}

// Initialize popup when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
  new PopupController();
});