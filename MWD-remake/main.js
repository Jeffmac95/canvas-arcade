import Player from "./player.js";
import Bullet from "./bullet.js";
import Rock from "./rock.js";
import Particle from "./particle.js";

const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

const spritesheet = new Image();
spritesheet.src = "./assets/spritesheet.png";

class Game {
    constructor(canvas) {
        this.canvas = canvas;
        this.width = canvas.width;
        this.height = canvas.height;

        this.player = new Player(this);
        this.bullets = [];
        this.rocks = [];
        this.particles = [];

        this.lastTime = 0;

        this.score = 0;
        this.showCooldown = false;
        this.coolDownTimer = 0;
        this.gameOver = false;

        this.rockSpawnTimer = 0;
        this.rockspawnInterval = 800;
        this.maxRocks = 12;

        this.music = new Audio("./assets/DST-TowerDefenseTheme.mp3");
        this.lazerSound = new Audio("./assets/laser1.wav");
        this.explosionSound = new Audio("./assets/explosion.wav");
        this.lazerSound.volume = 0.2;
        this.explosionSound.volume = 0.2;

        this.handleInput();
    }

    render() {
        // background
        ctx.drawImage(
            spritesheet,
            0,
            0,
            this.width,
            this.height,
            0,
            0,
            this.width,
            this.height
        );

        if (this.gameOver) {
            ctx.font = "48px Georgia";
            ctx.strokeStyle = "yellow";
            ctx.textAlign = "center";
            ctx.strokeText("GAME OVER", this.width / 2, this.height / 2 - 40);

            ctx.font = "28px serif";
            ctx.strokeStyle = "white";
            ctx.strokeText(`Final Score: ${this.score}`, this.width / 2, this.height / 2 + 20);
            ctx.textAlign = "left";

            return;
        }

        ctx.font = "16px Arial";
        ctx.strokeStyle = "white";
        ctx.strokeText(`Score: ${this.score}`, 10, 20);
        ctx.strokeText(`HP: ${this.player.hp}`, 540, 20);
        if (this.showCooldown) {
            ctx.strokeStyle = "red";
            ctx.strokeText("Gun on cooldown!", 230, 600);
        }

        this.player.render(ctx, spritesheet);
        this.bullets.forEach(b => b.render(ctx, spritesheet));
        this.rocks.forEach(r => r.render(ctx, spritesheet));
        this.particles.forEach(p => p.render(ctx));
    }

    update(deltaTime) {
        if (this.gameOver) return;

        if (this.player.x <= 0) this.player.x = 0;
        if (this.player.x > canvas.width - this.player.width) this.player.x = canvas.width - this.player.width;

        this.player.update(deltaTime);
        this.bullets.forEach(b => b.update(deltaTime));
        this.rocks.forEach(r => r.update(deltaTime));
        this.particles.forEach(p => p.update(deltaTime));

        // ********** COLLISION **********

        // bullet - rock
        for (let i = this.bullets.length - 1; i >= 0; i--) {
            for (let j = this.rocks.length - 1; j >= 0; j--) {
                if (this.rectCollision(this.bullets[i], this.rocks[j])) {
                    const rock = this.rocks[j];
                    rock.hp--;
                    rock.hasCollided = true;

                    for (let k = 0; k < 8; k++) {
                        this.particles.push(new Particle(this, this.bullets[i].x, this.bullets[i].y));
                    }

                    this.bullets.splice(i, 1);

                    if (rock.hp <= 0) {
                        this.explosionSound.play();
                        this.rocks.splice(j, 1);
                    }
                    this.score++;

                    break;
                }
            }
        }

        // player - rock
        for (let j = this.rocks.length - 1; j >= 0; j--) {
            if (this.rectCollision(this.player, this.rocks[j])) {
                this.rocks.splice(j, 1);
                this.player.hp--;
                this.player.hasCollided = true;
                this.player.hurtTimer = this.player.hurtFrameDuration;
            }
        }

        if (this.player.hp <= 0) {
            this.gameOver = true;
        }


        this.particles = this.particles.filter(p => p.life > 0);
        this.bullets = this.bullets.filter(b => b.y > 0);
        this.rocks = this.rocks.filter(r => r.y < canvas.height);

        this.spawnRocks(deltaTime);

        if (this.coolDownTimer > 0) {
            this.coolDownTimer -= deltaTime;
            if (this.coolDownTimer <= 0) {
                this.showCooldown = false;
            }
        }
    }

    handleInput() {
        addEventListener("keydown", (e) => {
            if (this.gameOver) return;

            this.music.play();

            if (e.key === "a" || e.key === "A") {
                this.player.movingLeft = true;
            }
            if (e.key === "d" || e.key === "D") {
                this.player.movingRight = true;
            }
            if (e.code === "Space") {
                e.preventDefault();
                this.lazerSound.play();
                if (this.bullets.length < 10) {
                    // have to offset x,y
                    this.bullets.push(new Bullet(this, this.player.x + 20, this.player.y - 16));
                    this.showCooldown = false;
                } else {
                    this.showCooldown = true;
                    this.coolDownTimer = 1500;
                }
            }
            if (e.key === "z") {
                console.log(this.bullets);
                console.log(this.rocks);
            }
        });

        addEventListener("keyup", (e) => {
            if (e.key === "a" || e.key === "A") {
                this.player.movingLeft = false;
            }
            if (e.key === "d" || e.key === "D") {
                this.player.movingRight = false;
            }
        });
    }

    spawnRocks(deltaTime) {
        this.rockSpawnTimer -= deltaTime;

        if (this.rockSpawnTimer <= 0 && this.rocks.length < this.maxRocks) {
            this.rocks.push(new Rock(this));
            this.rockSpawnTimer = this.rockspawnInterval;
        }
    }

    rectCollision(a, b) {
        return (
            a.x < b.x + b.width &&
            a.x + a.width > b.x &&
            a.y < b.y + b.height &&
            a.y + a.height > b.y
        );
    }

    animate(timestamp) {
        const deltaTime = timestamp - this.lastTime;
        this.lastTime = timestamp;

        this.update(deltaTime);
        this.render();

        requestAnimationFrame((timestamp) => this.animate(timestamp));
    }
}

const game = new Game(canvas);
spritesheet.onload = () => game.animate(0);