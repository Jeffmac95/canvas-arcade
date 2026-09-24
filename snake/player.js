export default class Player {
    constructor(game) {
        this.game = game;
        this.gridX = 6;
        this.gridY = 8;
        this.body = []; // "rects"
        this.moveTimer = 0;
        this.moveInterval = 0.15;
        this.direction = null;
        this.nextDirection = null;
        this.isDead = false;
    }

    render(ctx) {
        ctx.fillStyle = "#D8CDB8";
        ctx.fillRect(
            this.gridX * this.game.board.tileSize,
            this.gridY * this.game.board.tileSize,
            this.game.board.tileSize,
            this.game.board.tileSize
        );
        
        this.body.forEach(b => {
            ctx.fillRect(
                b.x * this.game.board.tileSize,
                b.y * this.game.board.tileSize,
                this.game.board.tileSize,
                this.game.board.tileSize
            );
        });
    }

    update(deltaTime) {
        if (this.isDead) return;

        this.moveTimer += deltaTime;

        if (this.moveTimer >= this.moveInterval) {
            this.move();
            this.moveTimer = 0;
        }
    }

    move() {

        if (this.nextDirection) {
            this.direction = this.nextDirection;
            this.nextDirection = null;
        }

        let nextX = this.gridX;
        let nextY = this.gridY;

        if (this.direction === "up") nextY--;
        if (this.direction === "down") nextY++;
        if (this.direction === "left") nextX--;
        if (this.direction === "right") nextX++;

        if (nextX < 0 || nextX >= this.game.board.columns ||
            nextY < 0 || nextY >= this.game.board.rows
        ) {
            return;
        }

        // save current head coord before moving
        this.body.unshift({ x: this.gridX, y: this.gridY });

        this.gridX = nextX;
        this.gridY = nextY;

        const hitBody = this.body.some(b => this.gridX === b.x && this.gridY === b.y);

        if (hitBody) {
            this.isDead = true;
            this.game.state = "game-over";
            return;
        }

        if (this.gridX !== this.game.food.gridX || this.gridY !== this.game.food.gridY) {
            this.body.pop();
        } else {
            this.game.food.setNewCoord();
            this.game.score++;
            this.game.sound.play();
        }
    }
}