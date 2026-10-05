export default class Map {
    constructor(game) {
        this.game = game;
        this.width = 416;
        this.height = 448;
        this.cellSize = 32;
        this.mapCols = this.width / this.cellSize;
        this.mapRows = this.height / this.cellSize;
        this.cells = [];
        this.rows = [
            { type: "safe", color: "#0A1A66" },
            { type: "water", color: "#1E3FD8" },
            { type: "water", color: "#1E3FD8" },
            { type: "water", color: "#1E3FD8" },
            { type: "water", color: "#1E3FD8" },
            { type: "water", color: "#1E3FD8" },
            { type: "median", color: "#8A5CD6" },
            { type: "road", color: "#2B2B3A" },
            { type: "road", color: "#2B2B3A" },
            { type: "road", color: "#2B2B3A" },
            { type: "road", color: "#2B2B3A" },
            { type: "road", color: "#2B2B3A" },
            { type: "median", color: "#8A5CD6" },
            { type: "road", color: "#2B2B3A" }
        ];

        this.loadCells();
    }

    loadCells() {
        for (let y = 0; y < this.mapRows; y++) {
            this.cells[y] = [];

            for (let x = 0; x < this.mapCols; x++) {
                this.cells[y][x] = {y, x};
            }
        }
    }

    getCell(x, y) {
        if (x < 0 || x >= this.mapCols ||
            y < 0 || y >= this.mapRows
        ) {
            return null;
        }
        
        return this.cells[y][x];
    }
}