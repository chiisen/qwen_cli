// Create matrix-style background effect
document.addEventListener('DOMContentLoaded', function () {
    createMatrixEffect();
});

// Global configuration for matrix effect
let matrixColor = '#00ff41'; // Default green
let matrixInterval;

function createMatrixEffect() {
    const canvas = document.createElement('canvas');
    canvas.classList.add('matrix-effect');
    document.body.appendChild(canvas);

    // Store canvas reference to recreate/resize later if needed
    window.matrixCanvas = canvas;

    startMatrixAnimation();
}

function startMatrixAnimation() {
    const canvas = window.matrixCanvas;
    if (!canvas) return;

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

        ctx.fillStyle = matrixColor; // Use dynamic color
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

    if (matrixInterval) clearInterval(matrixInterval);
    matrixInterval = setInterval(draw, 35);
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
    const isRedTheme = body.getAttribute('data-theme') === 'red';

    if (!isRedTheme) {
        // Switch to "Red Alert" Theme
        body.style.background = 'linear-gradient(135deg, #2b0000, #800000, #330000)';
        matrixColor = '#ff0033'; // Bright Red Matrix
        body.setAttribute('data-theme', 'red');

        // Update Title Color for contrast
        const h1 = document.querySelector('h1');
        if (h1) h1.style.background = 'linear-gradient(to right, #ff4d4d, #ff9900, #ff4d4d)';

    } else {
        // Revert to "Cyber Blue" Theme
        body.style.background = 'linear-gradient(135deg, #0f0c29, #302b63, #24243e)';
        matrixColor = '#00ff41'; // Classic Green Matrix
        body.removeAttribute('data-theme');

        // Revert Title Color
        const h1 = document.querySelector('h1');
        if (h1) h1.style.background = ''; // Reverts to CSS default
    }

    // Restart animation to apply new color immediately
    // Note: In a real app we might just update the variable, but restarting ensures clean state
    // startMatrixAnimation is now available because we refactored createMatrixEffect
    if (typeof startMatrixAnimation === 'function') {
        startMatrixAnimation();
    }
}

// Add window resize listener to adjust canvas size
// Add window resize listener to adjust canvas size
window.addEventListener('resize', function () {
    if (typeof startMatrixAnimation === 'function') {
        startMatrixAnimation();
    }
});
