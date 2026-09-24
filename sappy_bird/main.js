import Player from "./player.js";
import Tree from "./tree.js";

const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

class Game {
    constructor(canvas) {
        this.canvas = canvas;
        this.width = canvas.width;
        this.height = canvas.height;

        this.bg = new Image();
        this.bgLoaded = false;
        
        this.player = new Player(this);
        this.trees = [];

        this.preload();
        this.spawnTrees();
    }

    preload() {
        this.bg.onload = () => this.bgLoaded = true;
        this.bg.src = "./assets/bg.png";
    }

    spawnTrees() {
        const gap = 128;

        for (let x = 240; x < this.width; x+=gap) {
            this.trees.push(new Tree(this, x));
        }
        console.log(this.trees);
    }

    update(deltaTime) {
        this.player.update(deltaTime);
    }

    render(ctx) {
        const g = ctx.createLinearGradient(0, 0, 0, this.height);
        g.addColorStop(0, "#8EC5E8");
        g.addColorStop(1, "#CFE6F5");
        ctx.fillStyle = g;
        ctx.fillRect(0, 0, this.width, this.height);

        if (this.bgLoaded) {
            ctx.drawImage(this.bg, 0, 0);
        }

        this.player.render(ctx);
        this.trees.forEach(t => t.render(ctx));
    }
}

const game = new Game(canvas);

let lastTime = 0;

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