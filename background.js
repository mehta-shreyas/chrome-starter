
//Listener for tab changes: we want to inject script when url changes
chrome.tabs.onUpdated.addListener(function(tabid, info, tab) {
  if (info.status == "complete") { //page script has finished loading
      //pause, then execute script
      setTimeout(() => {  chrome.tabs.executeScript({file:"content.js"}); console.log("complete");}, 1000);
  }
});
