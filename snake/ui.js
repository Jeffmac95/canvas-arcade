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
            ctx.fillStyle = "#D8CDB8";
            ctx.font = "64px serif";
            this.centerText(ctx, "SNAKE", 220);

            ctx.font = "24px serif";
            this.centerText(ctx, "Press the W key to play", 340);
        }

        if (this.game.state === "playing") {
            ctx.fillStyle = "#B8AA91";
            ctx.font = "24px serif"
            ctx.fillText("Score: ", 450, 50);

            ctx.font = "32px serif";
            ctx.fillText(`${this.game.score}`, 450, 85);
        }

        if (this.game.state === "game-over") {
            ctx.fillStyle = "#D8CDB8";
            ctx.font = "64px serif";
            this.centerText(ctx, "GAME OVER", 240);

            ctx.fillStyle = "#D8AA91";
            ctx.font = "24px serif"
            this.centerText(ctx, "Final Score: ", 340);

            ctx.fillStyle = "#A6533C";
            this.centerText(ctx, `${this.game.score}`, 400);

            ctx.fillStyle = "#D8CDB8";
            this.centerText(ctx, "Press the P key to go home", 500);
        }
    }
}