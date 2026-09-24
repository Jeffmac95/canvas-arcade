export default class Bullet {
    constructor(game, x, y) {
        this.game = game;
        this.x = x;
        this.y = y;
        this.width = 32;
        this.height = 32;
        this.source = {x: 800, y: 0, width: 32, height: 32};
        this.speed = 200;
    }

    render(ctx, spritesheet) {
        ctx.drawImage(
            spritesheet,
            this.source.x,
            this.source.y,
            this.source.width,
            this.source.height,
            this.x,
            this.y,
            this.source.width,
            this.source.height
        );
    }

    update(deltaTime) {
        this.y -= this.speed * deltaTime;
    }
}