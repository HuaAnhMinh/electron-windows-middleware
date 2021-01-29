const { app, BrowserWindow } = require('electron');

const createWindow = () => {
  const window = new BrowserWindow({
    title: 'Main window',
    height: 600,
    width: 800,
    webPreferences: {
      nodeIntegration: true,
      nodeIntegrationInSubFrames: true,
      nodeIntegrationInWorker: true,
      nativeWindowOpen: true
    },
  });

  window.loadFile('./main-window.html');

  window.webContents.on('new-window', (event, url, frameName, disposition, options) => {
    event.preventDefault();
    Object.assign(options, {
      parent: window,
    });
    const subWindow = new BrowserWindow(options);

    subWindow.on('close', () => {
      window.webContents.send('sub-window-close', subWindow.id);
    });

    event.newGuest = subWindow;

    window.webContents.send('send-new-window-id', subWindow.id);
  });
};

app
.whenReady()
.then(createWindow)
.catch((error) => {
  console.log(error.message);
  app.quit();
});

app.on('window-all-closed', () => {
  app.quit();
});