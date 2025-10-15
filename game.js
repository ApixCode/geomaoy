// --- SCENE CLASS ---
class GameScene extends Phaser.Scene {
    constructor() {
        super('GameScene');
        this.score = 0;
        this.gameSpeed = 350;
        this.isGameOver = false;
    }

    // --- LOAD ASSETS ---
    preload() {
        // Using Base64 URIs to embed assets directly in the code. No need for extra files!
        // Player Cube Texture (White with blue glow)
        this.load.image('player', 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADAAAAAwCAYAAABXAvmHAAAAAXNSR0IArs4c6QAAArVJREFUaEPtmG1oFEEQh71VbdGLoAiK4MGDIj4IiiCCIAii4EGPIAiCegQvgoLgwbM/jYgnRRDEF0EQPAiiB0EQfPBoRARR8AYFRcEPEU1vj/dnZmZ3ZndmZ9PbFw8My3y72+32Z6qbYJgPPDgD/A3uA1eB88D1wN1gI5gJ5gP/gcvAbeB4MAYMA5MAC8BZYAP4F/gLeA5MAf+AB8A14DnwM7DQDs4D34G/gAPAZeA7cBzYBc4CwwM/A0c3gY+Bb4B9wCXgUeB74GjgYOB54GFgT+BYYAL4C/gI+A/4FBgD3gMHgYOBh4EdwE3gUeAgcGzwIDA0cCDwP/A0cDFwN/AvcBN4CjgYeBL4CDgamAlMDez/B3gWOD4YBrwN3AsMA/MD44HDwPHA0MAQMLYDx4CdwN7A8cDpwE5gZ+B8cBRwNPA48DTwNXACuBYYAngb2ADYDhwKjAWOA0cDRwOHgZOBf4DvgY+BDcB14A7gfuC/wI3AFmAy8DfwB3AGeA48BXwEnAPOAaeBC8A+YDrwP/ANeA04BswGlgMngcHAS8AC4CLwP3AC+B+4FpgEzgDbAfOAbcAR4BZwFdgBnAIOAbeBfYAVwMvAAuA6cAW4A/wN/AN2AseAp4EPgY9gGtgEPA5cBR4CVgG3gWfAVcAK4AIwF/gMeBYYCswGjgGjgRPAduA08BKwBngW2A4MBWZgZGAjMAw4FBgMPACsB44B3gfuAw8Cc4BnwEfgJuAUMBNYChwJjAC663gJGASsA+YCO4F9wD7gYGA0cBTwLHAmsAV4C/gWeA84CVwBdgCHgXvARcBh4ADwFHAkMDmwBxgNHA8cA/YCFwPPA2sDGwPjgWOB9cDWwGlgLfAqcB3YB/wJXAisB94D7gBvA38B14D9gN7A2sB+YAowFfgP+A84DPwDvAX+AV4C7gCjgeEAAAAASUVORK5CYII=');
        // Spike Obstacle (Red)
        this.load.image('spike', 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADAAAAAwCAYAAABXAvmHAAAAAXNSR0IArs4c6QAAAU5JREFUaEPtl+ENgCAMhL9oF+kk7SRdpJO0k3QSdpJu0gnoiQRoYl4Cg3/zDwnCQ57L5cIoqgghlJWlqg10Qv+5qg51gJ16wF5tQIvYAxvA7jwAbQA3TgAzwKk3gF0IA5jA5QwwA3w7ACvAXZ0AM8AeLwAawPqIACuAK58ATYAXdwAkwC93gI3AFn4A2AFm5QEwAzwwA8wA+1gASABf/gA2AFn5AUwA9+4AaAF28ACYAufiA1gBWfgATACfzAEzAE+hA0ABvDkATAA37gAfAM/yA8wAw/IAmAGezgAZgE/pAFB+gE/wAGgBFvEA0AK8PQBMAHfyAGABvj8AmAAuPgBmAU/rADsA3+gAMgDecAD8AJ/VAxJAC/DqAzAB3LoDzAD/zgKzAI/6AGyAGi8AGgC7+AAkAC6zACwA28wA+wHciQB2AFx5AVQBx/gAh9L/cxbY/3kAAAAASUVORK5CYII=');
        // Block Obstacle
        this.load.image('block', 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADAAAAAwCAYAAABXAvmHAAAAAXNSR0IArs4c6QAAAQdJREFUaEPtme0NwiAQhV/bpVvUSbpJO8k36STdpJ2kk3SS3kM2kM5BCyQk/yYPgfMNCPAwBw4OwYgQIiREa0hDK/S/NKQhbYA79YCT2gCXYg88gG1agDd4AG/wAGhAG/gA1IAm/oA0wAVeABVgDbyBA3gAbfAAaEAb/gA0IAv/gAswA3fwAFgAb/AANGAJ/gA0YA4+gBVgC7yBA3gAbfAAaEAb/gA0IAU+gAuwA/fwAFgAb/AANGAH/gA0YAZegBVgFXyBA3gAbfAAaEAb/gA0IAJ+gAswA3fwAFgAb/AANGAJ/gA0YAY+gBVgC7yBA3gAbfAAaEAb/gA0IAU+gAuwA/fwAFgAb/AANGAH/gA0YAZegBVgFXyBA3gAbfAAaEAb/gA0IAJ+gAswA3fwAFgAb/AANGAJ/gA0YAY+gBVgC7yBA3gAbfAAaEAb/gA0IAU+gAuwA/fwAFgAb/AANGAH/gA0YAZegBVgFXyBA3gAbfAAaEAb/gA0IAJ+gAuwA3/gAIBCWJgR/gB+AGuI0QkAAAAASUVORK5CYII=');
        // Particle Texture
        this.load.image('particle', 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAoAAAAKCAYAAACNMs+9AAAAAXNSR0IArs4c6QAAADZJREFUKFNjZGBg+M+ABhjg6Aow/P9/BgyMv1gYGBj/MOAIg8vAwMBgPjEwMPy/nwvAGgMAe+kIAvD6AT8AAAAASUVORK5CYII=');
    }

    // --- SETUP GAME OBJECTS ---
    create() {
        // --- BACKGROUNDS ---
        this.background = this.add.tileSprite(400, 300, 800, 600, 0x1e1e2e);
        this.midground = this.add.tileSprite(400, 300, 800, 600, 0x283845); // This would be an image in a real game
        
        // --- GROUND ---
        this.ground = this.add.tileSprite(400, 580, 800, 40, 0x141420);
        this.physics.add.existing(this.ground, true);

        // --- PLAYER ---
        this.player = this.physics.add.sprite(200, 450, 'player').setScale(1.2);
        this.player.setGravityY(2000);
        this.physics.add.collider(this.player, this.ground);
        
        // --- OBSTACLES ---
        this.obstacles = this.physics.add.group({ allowGravity: false, immovable: true });
        this.physics.add.collider(this.player, this.obstacles, this.endGame, null, this);
        this.time.addEvent({
            delay: 1500,
            callback: this.spawnObstacle,
            callbackScope: this,
            loop: true
        });

        // --- CONTROLS ---
        this.input.on('pointerdown', this.jump, this);
        this.input.keyboard.on('keydown-SPACE', this.jump, this);
        
        // --- PARTICLE EFFECTS ---
        this.jumpParticles = this.add.particles(0, 0, 'particle', {
            speed: 100,
            scale: { start: 1.5, end: 0 },
            lifespan: 300,
            blendMode: 'ADD'
        });
        this.deathParticles = this.add.particles(0, 0, 'particle', {
            speed: 200,
            scale: { start: 2, end: 0 },
            lifespan: 800,
            blendMode: 'ADD',
            emitting: false // Don't start automatically
        });
        
        // --- UI ---
        this.scoreText = document.getElementById('score');
    }

    // --- GAME LOOP ---
    update() {
        if (this.isGameOver) return;

        // --- SCROLLING ---
        this.background.tilePositionX += this.gameSpeed / 200;
        this.midground.tilePositionX += this.gameSpeed / 100;
        this.ground.tilePositionX += this.gameSpeed / 60;

        // --- PLAYER ROTATION ---
        if (!this.player.body.touching.down) {
            this.player.angle += 8;
        } else {
            this.player.angle = 0;
        }

        // --- SCORE & DIFFICULTY ---
        this.score++;
        this.scoreText.innerText = `Score: ${this.score}`;
        this.gameSpeed += 0.1; // Slowly increase speed
    }

    // --- GAME ACTIONS ---
    jump() {
        if (this.player.body.touching.down && !this.isGameOver) {
            this.player.setVelocityY(-850);
            this.jumpParticles.emitParticleAt(this.player.x, this.player.y + 20, 10);
        }
    }
    
    spawnObstacle() {
        if (this.isGameOver) return;
        
        const obstacleType = Math.random() > 0.4 ? 'spike' : 'block';
        const yPos = obstacleType === 'spike' ? 535 : 510; // Position blocks slightly lower

        const obstacle = this.obstacles.create(850, yPos, obstacleType);
        obstacle.setVelocityX(-this.gameSpeed);
        obstacle.setImmovable(true);
        obstacle.body.allowGravity = false;

        // Clean up obstacles when they leave the screen
        obstacle.checkWorldBounds = true;
        obstacle.outOfBoundsKill = true;
    }

    endGame() {
        if (this.isGameOver) return;

        this.isGameOver = true;
        this.physics.pause();
        this.player.setVisible(false);

        // Death effects
        this.deathParticles.emitParticleAt(this.player.x, this.player.y, 50);

        // Show game over screen
        document.getElementById('game-container').style.display = 'none';
        const gameOverScreen = document.getElementById('game-over-screen');
        gameOverScreen.style.display = 'flex';
        
        const video = document.getElementById('game-over-video');
        video.play();
        
        // Restart logic
        const restartHandler = () => {
            window.location.reload();
        };
        video.addEventListener('click', restartHandler);
        document.getElementById('restart-button').addEventListener('click', restartHandler);
    }
}

// --- PHASER CONFIGURATION ---
const config = {
    type: Phaser.AUTO,
    scale: {
        mode: Phaser.Scale.FIT,
        parent: 'game-container',
        autoCenter: Phaser.Scale.CENTER_BOTH,
        width: 800,
        height: 600
    },
    physics: {
        default: 'arcade',
        arcade: {
            gravity: { y: 1500 },
            debug: false
        }
    },
    scene: GameScene
};

const game = new Phaser.Game(config);
