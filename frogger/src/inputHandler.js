export default class InputHandler {
    constructor() {
        this.keys = new Set();
        this.justPressed = new Set();

        window.addEventListener("keydown", (e) => {
            const key = e.key.toLowerCase();

            if (!this.keys.has(key)) {
                this.justPressed.add(key);
            }
            
            this.keys.add(key);
        });

        window.addEventListener("keyup", (e) => {
            this.keys.delete(e.key.toLowerCase());
        });
    }

    isPressed(key) {
        return this.keys.has(key);
    }

    wasPressed(key) {
        return this.justPressed.has(key);
    }

    update() {
        this.justPressed.clear();
    }
}