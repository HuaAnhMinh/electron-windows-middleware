window.opener.postMessage('My post message!!!');

setTimeout(() => {
  window.opener.postMessage('My test message!');
}, 3000);

window.addEventListener('message', (event) => {
  console.log(`From main window: ${event.data}`);
});