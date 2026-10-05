import Map from "./map.js";
import ImageLoader from "./imageLoader.js";
import Player from "./player.js";
import InputHandler from "./inputHandler.js";

const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

class Game {
    constructor(canvas) {
        this.canvas = canvas;
        this.width = canvas.width;
        this.height = canvas.height;

        this.map = new Map(this);
        this.imgLoader = new ImageLoader();
        this.player = new Player(this, this.map.getCell(5, 12));
        this.inputHandler = new InputHandler();
    }

    update(deltaTime) {
        if (this.inputHandler.wasPressed('w')) {
            this.player.moveUp();
        }

        if (this.inputHandler.wasPressed('a')) {
            this.player.moveLeft();
        }

        if (this.inputHandler.wasPressed('s')) {
            this.player.moveDown();
        }

        if (this.inputHandler.wasPressed('d')) {
            this.player.moveRight();
        }
    }

    render(ctx) {
        this.map.cells.forEach((row, rowIndex) => {
            const rowData = this.map.rows[rowIndex];

            ctx.fillStyle = rowData.color;

            row.forEach(cell => {
                ctx.fillRect(
                    cell.x * this.map.cellSize,
                    cell.y * this.map.cellSize,
                    this.map.cellSize,
                    this.map.cellSize
                );
            })
        })

        if (this.imgLoader.isLoaded) {
            const sprite = this.imgLoader.sprites[this.player.sprite];

            ctx.drawImage(
                this.imgLoader.spritesheet,
                sprite.x,
                sprite.y,
                sprite.width,
                sprite.height,
                this.player.cell.x * this.map.cellSize,
                this.player.cell.y * this.map.cellSize,
                this.player.width,
                this.player.height
            );
        }
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
    game.inputHandler.update();
    
    requestAnimationFrame(animate);
}
requestAnimationFrame(animate);