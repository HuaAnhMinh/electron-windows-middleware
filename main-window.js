const { ipcRenderer } = require('electron');
const { Windows, subscribe, unsubscribe } = require('./windows-management');

window.windowsHandler = new Windows();

let newWindow;

document.getElementById('create-sub-window').addEventListener('click', () => {
  document.getElementById('create-sub-window').disabled = true;
  newWindow = window.open(__dirname + '/sub-window.html', '');
  newWindow.postMessage = window.windowsHandler.sendMiddleware(newWindow.postMessage);
});

const refreshListWindowsOnUI = () => {
  document.getElementById('list-sub-windows').innerHTML = '<option hidden value="">Choose a sub window</option>';

  window.windowsHandler.windows.forEach((childWindow) => {
    const option = document.createElement('option');
    option.textContent = `Id: ${childWindow.id}`;
    option.value = childWindow.id;
    document.getElementById('list-sub-windows').appendChild(option);
  })
};

ipcRenderer.on('send-new-window-id', (_, arg) => {
  subscribe(arg, newWindow, window.windowsHandler);
  newWindow.opener.postMessage = window.windowsHandler.receiveMiddleware(newWindow.window.opener.postMessage, arg);
  refreshListWindowsOnUI();
  document.getElementById('create-sub-window').disabled = false;
});

ipcRenderer.on('sub-window-close', (_, arg) => {
  unsubscribe(arg, window.windowsHandler);
  refreshListWindowsOnUI();
});

window.addEventListener('message', (event) => {
  console.log(event.data)
}, false);