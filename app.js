// Simple placeholder WebRTC logic
console.log('Walkie-Talkie app loaded');
const statusEl = document.getElementById('status');
const talkBtn = document.getElementById('talkBtn');
const userCountEl = document.getElementById('userCount');

// Fake connection status
setTimeout(() => {
  statusEl.textContent = 'Connected';
  talkBtn.disabled = false;
}, 1500);

// Simulate user count
setInterval(() => {
  const count = Math.floor(Math.random() * 5) + 1;
  userCountEl.textContent = count;
}, 3000);
