export default class Particle {
    constructor(game, x, y) {
        this.game = game;
        this.x = x;
        this.y = y;
        this.width = 4;
        this.height = 4;

        const angle = Math.random() * Math.PI * 2;
        const speed = 50 + Math.random() * 150;

        this.vx = Math.cos(angle) * speed;
        this.vy = Math.sin(angle) * speed;
        this.life = 0.4 + Math.random() * 0.4;
        this.maxLife = this.life;

        this.color = `hsl(${Math.random() * 360}, 100%, 60%)`;
    }

    render(ctx) {
        ctx.fillStyle = this.color;
        ctx.fillRect(this.x, this.y, this.width, this.height);
    }

    update(deltaTime) {
        this.x += this.vx * deltaTime;
        this.y += this.vy * deltaTime;
        this.life -= deltaTime;
    }
}