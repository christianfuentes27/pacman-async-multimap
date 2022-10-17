var timer = timer || {};
timer = {
    Timer: class {
        constructor(play) {
            this.play = play;
            this.interval = null;
        }

        moveGhosts = () => {
            this.play.intervalGhosts();
            this.finish();
        }

        init() {
            this.interval = setInterval(this.moveGhosts, 500);
        }

        finish() {
            if (this.play.checkLose()) clearInterval(this.interval);
        }
    }
}