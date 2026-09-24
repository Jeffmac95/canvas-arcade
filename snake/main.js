import Board from "./board.js";
import Player from "./player.js";
import Food from "./food.js";
import UI from "./ui.js";

const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

class Game {
    constructor(canvas) {
        this.canvas = canvas;
        this.width = canvas.width;
        this.height = canvas.height;

        this.board = new Board(this);
        this.player = new Player(this);
        this.food = new Food(this);
        this.ui = new UI(this);
        this.sound = new Audio("./assets/beep.wav");

        this.score = 0;

        this.state = "intro";

        this.handleInput();
    }

    render(ctx) {
        // bg
        ctx.fillStyle = "#12100D";
        ctx.fillRect(0, 0, this.width, this.height);

        if (this.state === "playing") {
            this.board.render(ctx);
            this.food.render(ctx);
            this.player.render(ctx);
        }
        this.ui.render(ctx);
    }

    update(deltaTime) {
        if (this.state !== "playing") return;

        this.player.update(deltaTime);
    }

        handleInput() {
        addEventListener("keydown", (e) => {
            const key = e.key.toLowerCase();

            if (this.state === "intro" && key === 'w') this.state = "playing";

            if (key === 'w') {
                if (this.player.direction !== "down") {
                    this.player.nextDirection = "up";
                }
            }
            if (key === 'a') {
                if (this.player.direction !== "right") {
                    this.player.nextDirection = "left";
                }
            }
            if (key === 's') {
                if (this.player.direction !== "up") {
                    this.player.nextDirection = "down";
                }
            }
            if (key === 'd') {
                if (this.player.direction !== "left") {
                    this.player.nextDirection = "right";
                }
            }

            if (key === 'p' && this.state === "game-over") {
                this.state = "intro";
                this.player.body = [];
                this.player.gridX = 6;
                this.player.gridY = 8;
                this.player.isDead = false;
                this.score = 0;
            }
        });
    }
}

const game = new Game(canvas);

let lastTime = null;

function animate(timestamp) {
    // if browser gives number > 0 as first frame
    if (lastTime === null) lastTime = timestamp;

    const deltaTime = (timestamp - lastTime) / 1000;
    lastTime = timestamp;

    game.update(deltaTime);
    game.render(ctx);
    
    requestAnimationFrame(animate);
}
requestAnimationFrame(animate);