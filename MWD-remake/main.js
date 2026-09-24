import Player from "./player.js";
import Bullet from "./bullet.js";
import Rock from "./rock.js";
import Particle from "./particle.js";
import UI from "./ui.js";

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
        this.ui = new UI(this);

        this.score = 0;
        this.showCooldown = false;
        this.coolDownTimer = 0;

        this.rockSpawnTimer = 0;
        this.rockspawnInterval = 0.8;
        this.maxRocks = 12;

        this.music = new Audio("./assets/DST-TowerDefenseTheme.mp3");
        this.lazerSound = new Audio("./assets/laser1.wav");
        this.explosionSound = new Audio("./assets/explosion.wav");
        this.lazerSound.volume = 0.2;
        this.explosionSound.volume = 0.2;

        this.state = "intro";

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

        if (this.showCooldown) {
            ctx.fillStyle = "#E07A7A";
            ctx.strokeText("Gun on cooldown!", 230, 600);
        }

        if (this.state === "playing") {
            this.player.render(ctx, spritesheet);
            this.bullets.forEach(b => b.render(ctx, spritesheet));
            this.rocks.forEach(r => r.render(ctx, spritesheet));
            this.particles.forEach(p => p.render(ctx));
        }

        this.ui.render(ctx);
    }

    update(deltaTime) {
        if (this.state !== "playing") return;

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
            this.state = "game-over";
            this.music.pause();
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
            const key = e.key.toLowerCase();

            if (key === 'p' && this.state === "intro") {
                this.state = "playing";
                this.music.play();
            }

            if (key === 'a') {
                this.player.movingLeft = true;
            }
            if (key === 'd') {
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
                    this.coolDownTimer = 1.5;
                }
            }

            if (key === 'i' && this.state === "game-over") {
                this.state = "intro";
                this.bullets = [];
                this.rocks = [];
                this.particles = [];
                this.score = 0;
                this.player.hp = this.player.maxHp;
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
}

const game = new Game(canvas);

let lastTime = null;

function animate(timestamp) {
    if (lastTime === null) lastTime = timestamp;

    const deltaTime = (timestamp - lastTime) / 1000;
    lastTime = timestamp;

    game.update(deltaTime)
    game.render(ctx);

    requestAnimationFrame(animate);
}
spritesheet.onload = () => requestAnimationFrame(animate);