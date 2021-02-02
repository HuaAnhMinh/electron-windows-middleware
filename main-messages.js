document.getElementById('send-all-button').addEventListener('click', () => {
  const message = document.getElementById('message-input').value;
  window.windowsHandler.sendAll(message);
});

document.getElementById('send-message-button').addEventListener('click', () => {
  const message = document.getElementById('message-input').value;
  const id = document.getElementById('list-sub-windows').value;
  window.windowsHandler.sendTo(id, message);
});