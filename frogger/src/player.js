import Entity from "./entity.js";

export default class Player extends Entity {
    constructor(game, cell) {
        super(game, cell, "frog");
        this.width = 32;
        this.height = 32;
    }

    moveUp() {
        const cell = this.game.map.getCell(
            this.cell.x,
            this.cell.y - 1
        );

        if (!cell) return;

        this.cell = cell;
    }

    moveLeft() {
        const cell = this.game.map.getCell(
            this.cell.x - 1,
            this.cell.y
        );

        if (!cell) return;
    }

    moveDown() {
        const cell = this.game.map.getCell(
            this.cell.x,
            this.cell.y + 1
        );

        if (!cell) return;

        this.cell = cell;
    }

    moveRight() {
        const cell = this.game.map.getCell(
            this.cell.x + 1,
            this.cell.y
        );

        if (!cell) return;

        this.cell = cell;
    }
}