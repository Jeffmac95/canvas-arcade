export default class ImageLoader {
    constructor() {
        this.spritesheet = new Image();
        this.isLoaded = false;

        this.preload();

        this.sprites = {
            frog: {
                x: 64,
                y: 32,
                width: 32,
                height: 32
            }
        }
    }

    preload() {
        this.spritesheet.onload = () => this.isLoaded = true;
        this.spritesheet.src = "../assets/spritesheet.png";
    }
}