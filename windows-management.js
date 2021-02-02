class Windows {
  constructor() {
    this.windows = [];
  }

  sendAllSync(message = '') {
    this.windows.forEach((childWindow) => {
      childWindow.window.postMessage(message);
    });
    return this;
  }

  async sendAll(message = '') {
    this.windows.forEach(async (childWindow) => {
      childWindow.window.postMessage(message);
    });
    return this;
  }

  sendToSync(id = '', message = '') {
    const foundWindow = this.windows.find((childWindow) => childWindow.id = id);
    foundWindow.window.postMessage(message);
  }

  async sendTo(id = '', message = '') {
    const foundWindow = this.windows.find((childWindow) => childWindow.id = id);
    foundWindow.window.postMessage(message);
  }

  receiveMiddleware(postMessage, from = '') {
    return function (message = '') {
      // mock test checking message from sub window
      console.log(message);
      if (message.includes('test')) {
        return console.log('Message can not have "test"');
      }
      postMessage({
        from,
        message,
      });
    }
  }

  sendMiddleware(postMessage) {
    return function (message = '') {
      postMessage(message);
    }
  }
}

function subscribe(id, subcriber, windows) {
  const alreadyExists = windows.windows.some((childWindow) => childWindow === subcriber);
  if (!alreadyExists) {
    windows.windows.push({
      id,
      window: subcriber,
    });
  }
}

function unsubscribe(id, windows) {
  windows.windows = windows.windows.filter((childWindow) => childWindow.id !== id);
  return this;
}

module.exports = {
  Windows,
  subscribe,
  unsubscribe,
};