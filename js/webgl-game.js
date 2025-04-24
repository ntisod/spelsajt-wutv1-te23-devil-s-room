// WebGL Game Initialization
document.addEventListener('DOMContentLoaded', () => {
    const canvas = document.getElementById('game-canvas');
    const startButton = document.getElementById('start-game');
    let gameStarted = false;

    // Initialize WebGL context
    const gl = canvas.getContext('webgl2');
    if (!gl) {
        console.error('WebGL 2.0 not supported');
        canvas.style.display = 'none';
        startButton.style.display = 'none';
        return;
    }

    // Set canvas size
    function resizeCanvas() {
        canvas.width = canvas.clientWidth;
        canvas.height = canvas.clientHeight;
        gl.viewport(0, 0, canvas.width, canvas.height);
    }
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    // Game state
    let gameState = {
        isRunning: false,
        isPaused: false
    };

    // Start game function
    function startGame() {
        if (!gameStarted) {
            gameStarted = true;
            gameState.isRunning = true;
            startButton.textContent = 'Pausa Spel';
            // Initialize game assets and start game loop
            initGame();
        } else {
            gameState.isPaused = !gameState.isPaused;
            startButton.textContent = gameState.isPaused ? 'Fortsätt Spel' : 'Pausa Spel';
        }
    }

    // Initialize game
    function initGame() {
        // Set up WebGL context and shaders
        gl.clearColor(0.0, 0.0, 0.0, 1.0);
        
        // Game loop
        function gameLoop() {
            if (!gameState.isRunning || gameState.isPaused) return;

            // Clear canvas
            gl.clear(gl.COLOR_BUFFER_BIT);

            // Update game state
            updateGame();

            // Render game
            renderGame();

            // Request next frame
            requestAnimationFrame(gameLoop);
        }

        // Start game loop
        gameLoop();
    }

    // Update game state
    function updateGame() {
        // Add game logic here
    }

    // Render game
    function renderGame() {
        // Add rendering code here
    }

    // Event listeners
    startButton.addEventListener('click', startGame);

    // Keyboard controls
    document.addEventListener('keydown', (e) => {
        if (!gameState.isRunning || gameState.isPaused) return;

        switch(e.key.toLowerCase()) {
            case 'w':
                // Move forward
                break;
            case 's':
                // Move backward
                break;
            case 'a':
                // Move left
                break;
            case 'd':
                // Move right
                break;
            case 'escape':
                gameState.isPaused = !gameState.isPaused;
                startButton.textContent = gameState.isPaused ? 'Fortsätt Spel' : 'Pausa Spel';
                break;
        }
    });

    // Mouse controls
    canvas.addEventListener('click', (e) => {
        if (!gameState.isRunning || gameState.isPaused) return;
        
        // Handle mouse interaction
        const rect = canvas.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        
        // Add interaction logic here
    });
}); 