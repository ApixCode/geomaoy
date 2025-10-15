const config = {
    type: Phaser.AUTO,
    width: 800,
    height: 600,
    parent: 'game-container',
    physics: {
        default: 'arcade',
        arcade: {
            gravity: { y: 1500 },
            debug: false
        }
    },
    scene: {
        preload: preload,
        create: create,
        update: update
    }
};

const game = new Phaser.Game(config);

let player;
let obstacles;
let gameOver = false;

function preload() {
    // You can load images for your player and obstacles here
    // For simplicity, we'll use colored rectangles
}

function create() {
    // Create the player as a green square
    player = this.physics.add.sprite(100, 450, null).setOrigin(0.5, 0.5);
    player.displayWidth = 50;
    player.displayHeight = 50;
    player.body.setCollideWorldBounds(true);

    // Create a group for obstacles
    obstacles = this.physics.add.group();

    // Allow the player to jump with the spacebar
    this.input.keyboard.on('keydown-SPACE', () => {
        if (player.body.touching.down) {
            player.setVelocityY(-700);
        }
    });

    // Spawn obstacles periodically
    this.time.addEvent({
        delay: 1500,
        callback: spawnObstacle,
        callbackScope: this,
        loop: true
    });

    // Check for collisions between the player and obstacles
    this.physics.add.collider(player, obstacles, onPlayerDeath, null, this);
}

function update() {
    if (gameOver) {
        return;
    }

    // Move obstacles to the left
    obstacles.getChildren().forEach(obstacle => {
        if (obstacle.getBounds().right < 0) {
            obstacle.destroy();
        }
    });
}

function spawnObstacle() {
    const obstacleHeight = Math.floor(Math.random() * 200) + 50;
    const obstacle = this.add.rectangle(800, 600 - obstacleHeight / 2, 50, obstacleHeight, 0xff0000);
    obstacles.add(obstacle);
    this.physics.world.enable(obstacle);
    obstacle.body.setAllowGravity(false);
    obstacle.body.setVelocityX(-300);
}

function onPlayerDeath() {
    gameOver = true;
    this.physics.pause();
    player.setTint(0xff0000);

    // Hide the game and show the video
    document.getElementById('game-container').style.display = 'none';
    const video = document.getElementById('game-over-video');
    video.style.display = 'block';
    video.play();
}

// Simple implementation of add.rectangle for clarity if it's not in your Phaser version
Phaser.GameObjects.GameObjectFactory.prototype.rectangle = function (x, y, width, height, fillColor) {
    const rect = this.graphics();
    rect.fillStyle(fillColor);
    rect.fillRect(0, 0, width, height);
    rect.x = x;
    rect.y = y;
    this.displayList.add(rect);
    return rect;
};
