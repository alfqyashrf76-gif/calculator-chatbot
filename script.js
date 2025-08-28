function sendMessage() {
  const userInput = document.getElementById('userInput');
  const message = userInput.value.trim();

  if (message === '') return;

  displayMessage(message, 'user-message');

  setTimeout(() => {
    processMessage(message);
  }, 500);

  userInput.value = '';
}

function processMessage(message) {
  let reply;
  try {
    // Remove anything that is not a number, operator, or parenthesis for safety
    const sanitizedMessage = message.replace(/[^-()\d/*+.]/g, '');
        
    if (sanitizedMessage === '') {
        reply = "عذراً، لم أجد أي عملية حسابية في رسالتك.";
    } else {
        const result = eval(sanitizedMessage);
        if (isNaN(result) || !isFinite(result)) {
          reply = "عذراً، لا يمكنني حساب هذه العملية. تأكد من أنها صحيحة.";
        } else {
          reply = `النتيجة هي: ${result}`;
        }
    }
  } catch (error) {
    reply = "عذراً، تبدو العملية الحسابية غير صحيحة.";
  }
      
  displayMessage(reply, 'bot-message');
}

function displayMessage(message, className) {
  const chatWindow = document.getElementById('chat-window');
  const messageDiv = document.createElement('div');
  messageDiv.className = 'message ' + className;
  messageDiv.textContent = message;
  chatWindow.appendChild(messageDiv);
  chatWindow.scrollTop = chatWindow.scrollHeight;
}

document.getElementById('userInput').addEventListener('keyup', function(event) {
  if (event.key === 'Enter') {
    sendMessage();
  }
});
