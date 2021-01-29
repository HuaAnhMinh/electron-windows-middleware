const { ipcRenderer } = require('electron');
const { Windows, subscribe, unsubscribe } = require('./windows-management');

window.windowsHandler = new Windows();

let newWindow;

document.getElementById('create-sub-window').addEventListener('click', () => {
  document.getElementById('create-sub-window').disabled = true;
  newWindow = window.open(__dirname + '/sub-window.html', '');
  newWindow.postMessage = window.windowsHandler.sendMiddleware(newWindow.postMessage);
  newWindow.opener.postMessage = window.windowsHandler.receiveMiddleware(newWindow.window.opener.postMessage);
});

ipcRenderer.on('send-new-window-id', (_, arg) => {
  subscribe(arg, newWindow, window.windowsHandler);
  document.getElementById('create-sub-window').disabled = false;
});

ipcRenderer.on('sub-window-close', (_, arg) => {
  unsubscribe(arg, window.windowsHandler);
});

window.addEventListener('message', (event) => {
  console.log(event.data)
}, false);