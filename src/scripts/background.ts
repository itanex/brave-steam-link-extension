// // import loadImagePathForServiceWorker from './loadImage';
// async function loadImagePathForServiceWorker(path: string, callback?: Function, failureCallback?: Function) {
//   path = chrome.runtime.getURL(path);
//   console.debug('loading image', path);
//   const response = await fetch(path);
//   if (!response.ok) {
//     throw new Error('Response from fetching icon not ok.');
//   }

//   const imageBlob = await response.blob();
//   const image = await createImageBitmap(imageBlob);

//   const canvas = new OffscreenCanvas(image.width, image.height);
//   const canvasContext = canvas.getContext('2d');

//   if (canvasContext == null) {
//     throw "canvasContext was null";
//   }

//   canvasContext.clearRect(0, 0, canvas.width, canvas.height);
//   canvasContext.drawImage(image, 0, 0, canvas.width, canvas.height);

//   return canvasContext.getImageData(0, 0, canvas.width, canvas.height);
// }

// console.log('Steam URL Opener Init');

// const install = async () => {
//   console.log('Steam URL Opener install');

//   const openTabInSteam = async (tab: chrome.tabs.Tab) => {
//     const steamURL = `steam://openurl/${tab.url}`;
//     console.log('navigating to:', steamURL);

//     chrome.tabs.update({ url: steamURL });
//   };

//   const RULE_ACTION_ENABLE = {
//     conditions: [
//       new chrome.declarativeContent.PageStateMatcher({
//         pageUrl: { hostEquals: 'store.steampowered.com', }
//       }),
//       new chrome.declarativeContent.PageStateMatcher({
//         pageUrl: { hostEquals: 'steamcommunity.com' }
//       })
//     ],
//     actions: [
//       new chrome.declarativeContent.ShowAction(),
//       // new chrome.declarativeContent.SetIcon({
//       //   imageData: {
//       //     '64': await loadImagePathForServiceWorker('images/icon-on-64.png'),
//       //     '128': await loadImagePathForServiceWorker('images/icon-on-128.png')
//       //     // '64': 'images/icon-on-64.png',
//       //     // '128': 'images/icon-on-128.png'
//       //   }
//       // })
//     ]
//   };

//   chrome.action.disable(); // do not show action by default, only when rules are fullfilled
//   chrome.declarativeContent.onPageChanged.removeRules(undefined, () => {
//     console.log('Steam URL Opener: Rules Removed');

//     chrome.declarativeContent.onPageChanged.addRules([RULE_ACTION_ENABLE], () => {
//       console.log('Steam URL Opener: Rules Added');
//     });
//   });

//   chrome.action.onClicked.addListener(openTabInSteam);
//   chrome.contextMenus

// };

// install();
chrome.webRequest.onBeforeRequest.addListener((details: chrome.webRequest.WebRequestBodyDetails) => {
  // console.log(details.url)
  // debugger;
  if (details.url.indexOf("://store.steampowered.com/") > -1) {
    return {
      redirectUrl: details.url.replace(/^https?\:/, "steam:"),
      cancel: true
    }
  }
  return { cancel: false }
},
  { urls: ["*://store.steampowered.com/*"] },
  ["blocking"]
);
