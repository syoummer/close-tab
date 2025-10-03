/**
 * Background script for Close Random Tab extension
 * Handles the core logic for randomly closing tabs and undo functionality
 */

/**
 * Store the last closed tab for undo functionality
 */
let lastClosedTab = null;

/**
 * Closes a randomly selected tab from the current window
 * Prevents closing the last remaining tab for safety
 */
async function closeRandomTab() {
  try {
    // Get all tabs in the current window
    const tabs = await chrome.tabs.query({ currentWindow: true });
    
    // Safety check: don't close if only one tab remains
    if (tabs.length <= 1) {
      console.log('Cannot close the last remaining tab');
      return { success: false, reason: 'last_tab' };
    }
    
    // Select a random tab
    const randomIndex = Math.floor(Math.random() * tabs.length);
    const tabToClose = tabs[randomIndex];
    
    console.log(`Closing random tab: "${tabToClose.title}" (${tabToClose.url})`);
    
    // Store tab info for undo functionality before closing
    lastClosedTab = {
      title: tabToClose.title,
      url: tabToClose.url,
      index: tabToClose.index,
      pinned: tabToClose.pinned,
      closedAt: Date.now()
    };
    
    // Close the selected tab
    await chrome.tabs.remove(tabToClose.id);
    
    return { 
      success: true, 
      closedTab: {
        title: tabToClose.title,
        url: tabToClose.url,
        index: randomIndex,
        totalTabs: tabs.length
      }
    };
    
  } catch (error) {
    console.error('Error closing random tab:', error);
    return { success: false, reason: 'error', error: error.message };
  }
}

/**
 * Reopens the last closed tab
 */
async function reopenLastTab() {
  try {
    if (!lastClosedTab) {
      return { success: false, reason: 'no_tab_to_reopen' };
    }
    
    // Check if the tab was closed recently (within 5 minutes)
    const timeSinceClosed = Date.now() - lastClosedTab.closedAt;
    if (timeSinceClosed > 5 * 60 * 1000) { // 5 minutes
      lastClosedTab = null;
      return { success: false, reason: 'tab_too_old' };
    }
    
    console.log(`Reopening tab: "${lastClosedTab.title}" (${lastClosedTab.url})`);
    
    // Create new tab with the stored properties
    const newTab = await chrome.tabs.create({
      url: lastClosedTab.url,
      index: lastClosedTab.index,
      pinned: lastClosedTab.pinned,
      active: true
    });
    
    // Clear the stored tab since it's been reopened
    const reopenedTab = { ...lastClosedTab };
    lastClosedTab = null;
    
    return {
      success: true,
      reopenedTab: {
        title: reopenedTab.title,
        url: reopenedTab.url,
        id: newTab.id
      }
    };
    
  } catch (error) {
    console.error('Error reopening tab:', error);
    return { success: false, reason: 'error', error: error.message };
  }
}

/**
 * Get information about the last closed tab
 */
function getLastClosedTabInfo() {
  if (!lastClosedTab) {
    return { hasLastTab: false };
  }
  
  // Check if the tab is still recent enough to reopen
  const timeSinceClosed = Date.now() - lastClosedTab.closedAt;
  if (timeSinceClosed > 5 * 60 * 1000) { // 5 minutes
    lastClosedTab = null;
    return { hasLastTab: false };
  }
  
  return {
    hasLastTab: true,
    tab: {
      title: lastClosedTab.title,
      url: lastClosedTab.url,
      closedAt: lastClosedTab.closedAt
    }
  };
}

/**
 * Handle messages from popup or other extension components
 */
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.action === 'closeRandomTab') {
    closeRandomTab().then(result => {
      sendResponse(result);
    });
    return true;
  } else if (request.action === 'reopenLastTab') {
    reopenLastTab().then(result => {
      sendResponse(result);
    });
    return true;
  } else if (request.action === 'getLastClosedTabInfo') {
    sendResponse(getLastClosedTabInfo());
    return false;
  }
});

/**
 * Handle extension installation
 */
chrome.runtime.onInstalled.addListener((details) => {
  if (details.reason === 'install') {
    console.log('Close Random Tab extension installed');
  } else if (details.reason === 'update') {
    console.log('Close Random Tab extension updated');
  }
});