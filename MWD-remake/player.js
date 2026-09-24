export default class Player {
    constructor(game) {
        this.game = game;
        this.x = 236;
        this.y = 696;
        this.width = 64;
        this.height = 64;
        this.source = {x: 800, y: 128, width: 64, height: 64};
        this.hurtFrameSource = {x: 800, y: 192, width: 64, height: 64};
        this.leftFrames = [
            {x: 800, y: 256, width: 64, height: 64},
            {x: 800, y: 320, width: 64, height: 64},
        ];
        this.rightFrames = [
            {x: 800, y: 384, width: 64, height: 64},
            {x: 800, y: 448, width: 64, height: 64},
        ];
        this.speed = 200;
        this.movingLeft = false;
        this.movingRight = false;
        this.frame = 0;
        this.frameTimer = 0;
        this.frameInterval = 0.1;
        this.hp = 10;
        this.maxHp = 10;
        this.hasCollided = false;
        this.hurtTimer = 0;
        this.hurtFrameDuration = 0.8;
    }

    render(ctx, spritesheet) {
        let source = this.source;

        if (this.movingLeft) source = this.leftFrames[this.frame];
        if (this.movingRight) source = this.rightFrames[this.frame];

        if (this.hasCollided) source = this.hurtFrameSource;

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
        if (this.movingLeft) {
            this.x -= this.speed * deltaTime;

            this.frameTimer += deltaTime;

            if (this.frameTimer >= this.frameInterval) {
                this.frame = (this.frame + 1) % 2;
                this.frameTimer = 0;
            }
        }
        if (this.movingRight) {
            this.x += this.speed * deltaTime;

            this.frameTimer += deltaTime;

            if (this.frameTimer >= this.frameInterval) {
                this.frame = (this.frame + 1) % 2;
                this.frameTimer = 0;
            }
        }

        if (this.hasCollided) {
            this.hurtTimer -= deltaTime;

            if (this.hurtTimer <= 0) {
                this.hasCollided = false;
            }
        }

    }
}