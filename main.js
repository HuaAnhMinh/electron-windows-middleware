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
    },
  });

  window.loadFile('./index.html');
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