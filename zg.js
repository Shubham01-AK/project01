let score = 0;
let lives = 3;
let currentZombieWord = '';
const zombieContainer = document.querySelector('.zombie-container');
const typingInput = document.getElementById('typing-input');
const scoreDisplay = document.getElementById('score');
const livesDisplay = document.getElementById('lives');
const messageDisplay = document.getElementById('message');

function spawnZombie() {
    const words = ['have', 'for', 'cat', 'dog', 'function', 'code'];
    currentZombieWord = words[Math.floor(Math.random() * words.length)];
    
    const zombie = document.createElement('div');
    zombie.className = 'zombie';
    zombie.textContent = currentZombieWord;
    zombieContainer.appendChild(zombie);

    setTimeout(() => {
        zombie.remove();
        loseLife();
    }, 5000); // Zombie disappears after 5 seconds
}

function loseLife() {
    lives--;
    livesDisplay.textContent = lives;
    if (lives <= 0) {
        endGame();
    }
}

function endGame() {
    messageDisplay.textContent = 'Game Over!';
    typingInput.disabled = true;
}

typingInput.addEventListener('input', (event) => {
    if (event.target.value === currentZombieWord) {
        score += 10;
        scoreDisplay.textContent = score;
        messageDisplay.textContent = 'Zombie Defeated!';
        typingInput.value = ''; // Clear input
        spawnZombie(); // Spawn a new zombie
    }
});

// Start the game
spawnZombie();
setInterval(spawnZombie, 3000); // Spawn a new zombie every 3 seconds
