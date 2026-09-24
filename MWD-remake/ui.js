export default class UI {
    constructor(game) {
        this.game = game;
        this.canvasWidth = 600;
    }

    centerText(ctx, text, y) {
        const x = (this.canvasWidth - ctx.measureText(text).width) / 2;
        ctx.fillText(text, x, y);
    }

    render(ctx) {
        if (this.game.state === "intro") {
            ctx.font = "64px Arial";
            ctx.fillStyle = "#DCEBFF";
            this.centerText(ctx, "Milky Way Defender", 250);

            ctx.font = "24px Arial";
            ctx.fillStyle = "#AEBBCB";
            this.centerText(ctx, "Press the P key to play!", 320);
        }

        if (this.game.state === "playing") {
            ctx.font = "16px Arial";
            ctx.fillStyle = "#8FB8D8";
            ctx.fillText(`Score: ${this.game.score}`, 10, 20);
            ctx.fillStyle = "#D66A6A";
            ctx.fillText(`HP: ${this.game.player.hp}`, 540, 20);
        }

        if (this.game.state === "game-over") {
            ctx.fillStyle = "#E07A7A";
            ctx.font = "48px Georgia";
            this.centerText(ctx, "GAME OVER", 260);

            ctx.fillStyle = "#AEBBCB";
            ctx.font = "28px Georgia";
            this.centerText(ctx, "Final Score:", 330);

            ctx.fillStyle = "#E07A7A";
            this.centerText(ctx, `${this.game.score}`, 380);

            ctx.fillStyle = "#AEBBCB";
            this.centerText(ctx, "Press the I key to go home", 450);
        }
    }
}