export default class Board {
    constructor(game) {
        this.game = game;
        this.width = 416;
        this.height = 576;
        this.tileSize = 32;

        this.columns = this.width / this.tileSize;
        this.rows = this.height / this.tileSize;
    }

    render(ctx) {
        ctx.strokeStyle = "#39332B";
        ctx.lineWidth = 1;

        for (let y = 0; y < this.height; y+= this.tileSize) {
            for (let x = 0; x < this.width; x+= this.tileSize) {
                ctx.strokeRect(x, y, this.tileSize, this.tileSize);
            }
        }
    }
}