window.opener.postMessage('My post message!!!');

setTimeout(() => {
  window.opener.postMessage('My test message!');
}, 3000);

window.addEventListener('message', (event) => {
  const message = event.data;
  console.log(message);
  const li = document.createElement('li');
  li.textContent = `From main: ${message}`;
  document.getElementById('list-messages').append(li);
});

document.getElementById('send-message-button').addEventListener('click', () => {
  const message = document.getElementById('message-input').value;
  window.opener.postMessage(message);
});