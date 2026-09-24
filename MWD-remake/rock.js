export default class Rock {
    constructor(game) {
        this.game = game;
        this.x = this.chooseRandomX();
        this.y = 0;
        this.rocks = [
            {name: "largeRock", x: 832, y: 0, width: 64, height: 64, maxHp: 2},
            //{name: "largeRockDamaged", x: 800, y: 64, width: 64, height: 64},
            {name: "mediumRock", x: 864, y: 64, width: 40, height: 40, maxHp: 1},
            {name: "smallRock", x: 864, y: 104, width: 32, height: 32, maxHp: 1}
        ];
        this.rock = this.rocks[this.chooseRandomRock()];
        this.speed = 3000 / this.rock.width;
        this.width = this.rock.width;
        this.height = this.rock.height;
        this.hp = this.rock.maxHp;
        this.hurtFrameSource = {x: 800, y: 64, width: 64, height: 64, hp: 1};
        this.hasCollided = false;
    }

    render(ctx, spritesheet) {
        let source = this.rock;

        if (this.rock.name === "largeRock" && this.hasCollided) {
            source = this.hurtFrameSource;
        }

        ctx.drawImage(
            spritesheet,
            source.x,
            source.y,
            source.width,
            source.height,
            this.x,
            this.y,
            source.width,
            source.height
        );
    }

    update(deltaTime) {
        this.y += this.speed * (deltaTime / 1000);
    }

    chooseRandomRock() {
        return Math.floor(Math.random() * this.rocks.length);
    }

    chooseRandomX() {
        return Math.floor(Math.random() * (500 - 64 + 1)) + 64;
    }
}