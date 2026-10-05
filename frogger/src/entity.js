export default class Entity {
    constructor(game, cell, sprite) {
        this.game = game;
        this.cell = cell; // {x,y}
        this.sprite = sprite; // obj from imgLoader
    }
}