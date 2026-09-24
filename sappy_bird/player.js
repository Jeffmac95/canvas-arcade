export default class Player {
    constructor(game) {
        this.game = game;
        this.x = 50;
        this.y = 300;
        this.width = 32;
        this.height = 12;
        this.speed = 100;
        this.img = new Image();
        this.imgLoaded = false;

        this.preload();
    }

    preload() {
        this.img.onload = () => this.imgLoaded = true;
        this.img.src = "./assets/player.png";
    }
    
    update(deltaTime) {
        this.x += this.speed * deltaTime;
    }

    render(ctx) {
        if (this.imgLoaded) ctx.drawImage(this.img, this.x, this.y);
    }
}