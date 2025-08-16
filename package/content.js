// content.js

// Gematria functions
function englishOrdinal(word) {
    let total = 0;
    word = word.replace(/\s/g, '');
    word = word.replace(/[^a-zA-Z]/g, ""); // remove non-letter characters
    for (let i = 0; i < word.length; i++) {
      let letter = word[i].toUpperCase();
      let value = letter.charCodeAt(0) - 'A'.charCodeAt(0) + 1;
      total += value;
    }
    return total;
  }
  
  function fullReduction(word) {
    let letters = { 'A': 1, 'B': 2, 'C': 3, 'D': 4, 'E': 5, 'F': 6, 'G': 7, 'H': 8, 'I': 9, 'J': 1, 'K': 2, 'L': 3, 'M': 4, 'N': 5, 'O': 6, 'P': 7, 'Q': 8, 'R': 9, 'S': 1, 'T': 2, 'U': 3, 'V': 4, 'W': 5, 'X': 6, 'Y': 7, 'Z': 8 };
    word = word.replace(/\s/g, '');
    word = word.replace(/[^a-zA-Z]/g, "");
    let total = 0;
    for (let i = 0; i < word.length; i++) {
      total += letters[word[i].toUpperCase()];
    }
    return total;
  }
  
  function reverseOrdinal(word) {
    let letters = { 'A': 26, 'B': 25, 'C': 24, 'D': 23, 'E': 22, 'F': 21, 'G': 20, 'H': 19, 'I': 18, 'J': 17, 'K': 16, 'L': 15, 'M': 14, 'N': 13, 'O': 12, 'P': 11, 'Q': 10, 'R': 9, 'S': 8, 'T': 7, 'U': 6, 'V': 5, 'W': 4, 'X': 3, 'Y': 2, 'Z': 1 };
    word = word.replace(/\s/g, '');
    word = word.replace(/[^a-zA-Z]/g, "");
    let total = 0;
    for (let i = 0; i < word.length; i++) {
      total += letters[word[i].toUpperCase()];
    }
    return total;
  }
  
  function reverseFullReduction(word) {
    let letters = { 'A': 8, 'B': 7, 'C': 6, 'D': 5, 'E': 4, 'F': 3, 'G': 2, 'H': 1, 'I': 9, 'J': 8, 'K': 7, 'L': 6, 'M': 5, 'N': 4, 'O': 3, 'P': 2, 'Q': 1, 'R': 9, 'S': 8, 'T': 7, 'U': 6, 'V': 5, 'W': 4, 'X': 3, 'Y': 2, 'Z': 1 };
    word = word.replace(/\s/g, '');
    word = word.replace(/[^a-zA-Z]/g, "");
    let total = 0;
    for (let i = 0; i < word.length; i++) {
      total += letters[word[i].toUpperCase()];
    }
    return total;
  }
  
  // Global flag for extension state; default is enabled.
  let enabled = true;
  // Global dismiss interval in seconds; default is 10.
  let dismissInterval = 10;
  
  // Initialize settings from storage.
  chrome.storage.sync.get({ enabled: true, dismissInterval: 10 }, (data) => {
    enabled = data.enabled;
    dismissInterval = data.dismissInterval;
  });
  
  // Listen for storage changes to update settings dynamically.
  chrome.storage.onChanged.addListener((changes, area) => {
    if (area === "sync") {
      if (changes.enabled) {
        enabled = changes.enabled.newValue;
      }
      if (changes.dismissInterval) {
        dismissInterval = changes.dismissInterval.newValue;
      }
    }
  });
  
  // Function to calculate gematria and display tooltip.
  function calculateGematria(selectedText) {
    if (!selectedText.trim() || !/[a-zA-Z]/.test(selectedText)) {
      return;
    }
  
    var gematriaValue1 = englishOrdinal(selectedText);
    var gematriaValue2 = fullReduction(selectedText);
    var gematriaValue3 = reverseOrdinal(selectedText);
    var gematriaValue4 = reverseFullReduction(selectedText);
  
    selectedText = selectedText.replace(/[^a-zA-Z\s]/g, "");
  
    var tooltip = document.createElement("div");
    tooltip.innerHTML = `<font style="color:#ffffff;font-size:100%;text-align:center;font-family:Tahoma;">${selectedText}</font></br>
                         <font style="color:#00ba00;font-size:200%;font-family:Tahoma;">${gematriaValue1}</font>&nbsp;&nbsp;
                         <font style="color:#587dfe;font-size:200%;font-family:Tahoma;">${gematriaValue2}</font>&nbsp;&nbsp;
                         <font style="color:#50eb15;font-size:200%;font-family:Tahoma;">${gematriaValue3}</font>&nbsp;&nbsp;
                         <font style="color:#64e2e2;font-size:200%;font-family:Tahoma;">${gematriaValue4}</font>`;
                         
    tooltip.style.cssText = "position:absolute; background-color:#111111; padding:15px; border:3px solid #ececec; border-radius: 10px; z-index: 9999; box-shadow: 0 0 10px 0 rgba(0, 0, 0, 0.5);";
  
    var rect = window.getSelection().getRangeAt(0).getBoundingClientRect();
    var tooltipTop = rect.top - 100;
    var tooltipBottom = tooltipTop + tooltip.offsetHeight;
  
    if (tooltipTop < window.pageYOffset) {
      tooltipTop = window.pageYOffset;
    } else if (tooltipBottom > window.pageYOffset + window.innerHeight) {
      tooltipTop = window.pageYOffset + window.innerHeight - tooltip.offsetHeight;
    }
  
    tooltip.style.left = rect.left + 'px';
    tooltip.style.top = tooltipTop + 'px';
  
    document.body.appendChild(tooltip);
  
    tooltip.addEventListener("mouseover", function() {
      tooltip.style.cursor = "pointer";
    });
  
    // If dismissInterval is greater than 0, auto-dismiss the tooltip after that many seconds.
    if (dismissInterval > 0) {
      setTimeout(function() {
        if (tooltip.parentNode) {
          tooltip.parentNode.removeChild(tooltip);
        }
      }, dismissInterval * 1000);
    }
  
    tooltip.addEventListener("click", function() {
      tooltip.style.display = "none";
    });
  }
  
  document.addEventListener('mouseup', function () {
    if (!enabled) return;
    var selectedText = window.getSelection().toString();
    if (selectedText) {
      calculateGematria(selectedText);
    }
  });
  