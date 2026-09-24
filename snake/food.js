export default class Food {
    constructor(game) {
        this.game = game;
        this.randomLocation = this.randomCoord();
        this.gridX = this.randomLocation.x;
        this.gridY = this.randomLocation.y;
    }

    render(ctx) {
        ctx.fillStyle = "#A6533C";
        ctx.fillRect(
            this.gridX * this.game.board.tileSize,
            this.gridY * this.game.board.tileSize,
            this.game.board.tileSize,
            this.game.board.tileSize
        );
    }

    randomCoord() {
        return {
            x: Math.floor(Math.random() * this.game.board.columns),
            y: Math.floor(Math.random() * this.game.board.rows)
        };
    }

    setNewCoord() {
        let coord; // {x.y}

        do {
            coord = this.randomCoord();
        } while (
            coord.x === this.game.player.gridX && coord.y === this.game.player.gridY ||
            this.game.player.body.some(b => coord.x === b.x && coord.y === b.y)
        );

        this.gridX = coord.x;
        this.gridY = coord.y;
    }
}