const chatForm = document.getElementById('chat-form');
const chatMessage = document.querySelector('.chat-message');

const socket = io();

// Message from server
socket.on('message', (message) => {
	outputMessage(message);

	// Scroll down
	chatMessage.scrollTop = chatMessage.scrollHeight;
});

// Message submit
chatForm.addEventListener('submit', (event) => {
	event.preventDefault();

	// Get message text
	const msg = event.target.elements.msg.value;

	// Emit message to server
	socket.emit('chatMessage', msg);

	// Clear input
	event.target.elements.msg.value = '';
	event.target.elements.msg.focus();
});

// Output message to DOM
function outputMessage(message) {
	const div = document.createElement('div');
	div.classList.add('message');

	div.innerHTML = `<p class="meta">Brad <span>9:12pm</span></p>
    <p class="text">
        ${message}
    </p>`;

	document.querySelector('.chat-messages').appendChild(div);
}
