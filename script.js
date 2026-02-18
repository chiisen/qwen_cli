// Create matrix-style background effect
document.addEventListener('DOMContentLoaded', function () {
    createMatrixEffect();
});

function createMatrixEffect() {
    const canvas = document.createElement('canvas');
    canvas.classList.add('matrix-effect');
    document.body.appendChild(canvas);

    const ctx = canvas.getContext('2d');
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789@#$%^&*()';
    const fontSize = 12;
    const columns = canvas.width / fontSize;

    const drops = [];
    for (let i = 0; i < columns; i++) {
        drops[i] = Math.floor(Math.random() * canvas.height / fontSize);
    }

    function draw() {
        ctx.fillStyle = 'rgba(0, 0, 0, 0.05)';
        ctx.fillRect(0, 0, canvas.width, canvas.height);

        ctx.fillStyle = '#00ff41';
        ctx.font = `${fontSize}px monospace`;

        for (let i = 0; i < drops.length; i++) {
            const text = characters.charAt(Math.floor(Math.random() * characters.length));
            ctx.fillText(text, i * fontSize, drops[i] * fontSize);

            if (drops[i] * fontSize > canvas.height && Math.random() > 0.975) {
                drops[i] = 0;
            }

            drops[i]++;
        }
    }

    setInterval(draw, 35);
}

function glitchEffect() {
    const h1 = document.querySelector('h1');
    h1.classList.add('glitch-text');

    // Add a temporary class for enhanced glitch effect
    h1.style.animation = 'glitch 0.3s 3';

    setTimeout(() => {
        h1.style.animation = '';
    }, 1000);

    // Add visual feedback to terminal
    const terminal = document.querySelector('.terminal-content');
    const newLine = document.createElement('div');
    newLine.className = 'terminal-line';
    newLine.innerHTML = '<span class="pulse"></span> 指令執行成功';
    terminal.appendChild(newLine);
}

function toggleTheme() {
    const body = document.body;
    const currentBG = getComputedStyle(body).backgroundImage;

    if (currentBG.includes('0f0c29')) {
        body.style.background = 'linear-gradient(135deg, #0c290f, #2b6330, #243e24)';
    } else {
        body.style.background = 'linear-gradient(135deg, #0f0c29, #302b63, #24243e)';
    }
}

// Add window resize listener to adjust canvas size
window.addEventListener('resize', function () {
    const canvas = document.querySelector('.matrix-effect');
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
});
