// --- CONFIGURATION ---
const config = {
    type: Phaser.AUTO,
    width: 800,
    height: 600,
    parent: 'game-container',
    backgroundColor: '#34495e',
    physics: {
        default: 'arcade',
        arcade: {
            gravity: { y: 2000 }, // Stronger gravity for a snappier feel
            debug: false
        }
    },
    scene: {
        preload: preload,
        create: create,
        update: update
    }
};

// --- GAME VARIABLES ---
let player;
let ground;
let obstacles;
let score = 0;
let scoreText;
let gameOver = false;
const gameSpeed = -350;
const jumpVelocity = -800;

const game = new Phaser.Game(config);


// --- PHASER SCENE FUNCTIONS ---

function preload() {
    // No assets to load, we are generating graphics dynamically
}

function create() {
    // --- GROUND ---
    // A TileSprite will scroll its texture, creating an infinite ground effect
    ground = this.add.tileSprite(400, 580, 800, 40, 0x2c3e50).setOrigin(0.5);
    this.physics.add.existing(ground, true); // Make it a static physics body
    ground.body.setImmovable(true);
    ground.body.allowGravity = false;

    // --- PLAYER ---
    player = this.physics.add.sprite(200, 500, null);
    player.setBodySize(40, 40); // Set collision box size
    player.setOrigin(0.5);
    // Use a graphics object to draw the player's square shape
    const playerGraphics = this.add.graphics();
    playerGraphics.fillStyle(0x3498db, 1); // Blue color
    playerGraphics.fillRect(-20, -20, 40, 40);
    playerGraphics.generateTexture('player-texture', 40, 40);
    playerGraphics.destroy();
    player.setTexture('player-texture');
    
    player.setCollideWorldBounds(true);
    player.body.world.bounds.bottom = 560; // Prevent player from falling through the edge

    // --- OBSTACLES ---
    obstacles = this.physics.add.group({
        allowGravity: false,
        immovable: true
    });

    // --- COLLISION DETECTION ---
    this.physics.add.collider(player, ground);
    this.physics.add.collider(player, obstacles, onPlayerDeath, null, this);

    // --- CONTROLS ---
    // Jump on spacebar press or pointer click/tap
    this.input.on('pointerdown', handleJump, this);
    this.input.keyboard.on('keydown-SPACE', handleJump, this);

    // --- SCORE ---
    scoreText = document.getElementById('score');

    // --- OBSTACLE SPAWNING ---
    this.time.addEvent({
        delay: 1400,
        callback: spawnObstacle,
        callbackScope: this,
        loop: true
    });
}

function update() {
    if (gameOver) {
        return; // Stop all updates if the game is over
    }

    // Scroll the ground texture
    ground.tilePositionX += Math.abs(gameSpeed) / 60;

    // Add rotation to the player when in the air
    if (!player.body.touching.down) {
        player.angle += 8;
    } else {
        player.angle = 0; // Reset angle when on ground
    }

    // Update the score
    score++;
    scoreText.innerText = `Score: ${score}`;

    // Clean up obstacles that are off-screen
    obstacles.getChildren().forEach(obstacle => {
        if (obstacle.getBounds().right < 0) {
            obstacle.destroy();
        }
    });
}


// --- HELPER FUNCTIONS ---

function handleJump() {
    // Only allow jumping if the player is on the ground
    if (player.body.touching.down && !gameOver) {
        player.setVelocityY(jumpVelocity);
    }
}

function spawnObstacle() {
    if (gameOver) return;

    // Create a spike (triangle)
    const spike = this.add.graphics();
    spike.fillStyle(0xe74c3c, 1); // Red color
    spike.beginPath();
    spike.moveTo(0, 50);
    spike.lineTo(25, 0);
    spike.lineTo(50, 50);
    spike.closePath();
    spike.fillPath();
    
    // Position it on the ground, off-screen to the right
    const obstacleContainer = this.add.container(850, 540, [spike]);
    obstacleContainer.setSize(50, 50);
    
    // Add it to the obstacles physics group
    obstacles.add(obstacleContainer);
    obstacleContainer.body.setVelocityX(gameSpeed);
}

function onPlayerDeath() {
    if (gameOver) return; // Prevent this from running multiple times
    
    gameOver = true;
    this.physics.pause();
    player.setTint(0xff0000); // Tint player red

    // Hide UI and game
    document.getElementById('ui-container').style.display = 'none';
    document.getElementById('game-container').style.display = 'none';

    // Show and play video
    const video = document.getElementById('game-over-video');
    video.style.display = 'block';
    video.play();
    
    // Add a click listener to the video to restart the game
    video.addEventListener('click', () => {
        window.location.reload();
    });
        }
