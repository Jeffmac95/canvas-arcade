export default class Tree {
    constructor(game, x) {
        this.game = game;
        this.x = x;
        this.y = { top: 0, bottom: 380 };
        this.width = 64;
        this.height = 220;
        this.imgTop = new Image();
        this.imgBottom = new Image();
        this.imgTopLoaded = false;
        this.imgBottomLoaded = false;

        this.preload();
    }

    preload() {
        this.imgTop.onload = () => this.imgTopLoaded = true;
        this.imgBottom.onload = () => this.imgBottomLoaded = true;
        this.imgTop.src = "./assets/tree-rotated.png";
        this.imgBottom.src = "./assets/tree.png";
    }

    render(ctx) {
        if (this.imgTopLoaded && this.imgBottomLoaded) {
            ctx.drawImage(this.imgTop, this.x, this.y.top);
            ctx.drawImage(this.imgBottom, this.x, this.y.bottom);
        }
    }
}