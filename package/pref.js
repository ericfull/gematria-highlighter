document.addEventListener('DOMContentLoaded', () => {
    const toggle = document.getElementById('toggle');
    const dismissIntervalInput = document.getElementById('dismissInterval');
  
    // Load current settings from storage, defaulting to enabled: true and dismissInterval: 10 seconds.
    chrome.storage.sync.get({ enabled: true, dismissInterval: 10 }, (data) => {
      toggle.checked = data.enabled;
      dismissIntervalInput.value = data.dismissInterval;
    });
  
    // Save setting when toggle is changed.
    toggle.addEventListener('change', () => {
      chrome.storage.sync.set({ enabled: toggle.checked });
    });
  
    // Save setting when dismiss interval is changed.
    dismissIntervalInput.addEventListener('input', () => {
      let value = parseInt(dismissIntervalInput.value);
      if (isNaN(value) || value < 0) {
        value = 10;
        dismissIntervalInput.value = value;
      }
      chrome.storage.sync.set({ dismissInterval: value });
    });
  });
  