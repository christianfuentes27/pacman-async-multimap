var game = game || {};
game = {
    Game: class {
        constructor() {
            this.board = document.getElementById('board');
            this.lose = document.getElementById('lose');
            this.btn = document.querySelector('.btn');
            this.contentBoard = null;

            //Main map
            this.pacmanX = 2;
            this.pacmanY = 8;

            //Up map
            // this.pacmanX = 4;
            // this.pacmanY = 4;

            //Down map
            // this.pacmanX = 2;
            // this.pacmanY = 8;

            this.ghost1X = 0;
            this.ghost1Y = 0;

            //Main map
            this.ghost2X = 8;
            this.ghost2Y = 17;

            //Up map
            // this.ghost2X = 8;
            // this.ghost2Y = 8;

            //Down map
            // this.ghost2X = 6;
            // this.ghost2Y = 16;

            this.mainMap = [
                [0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 'T'],
                [0, 1, 1, 0, 1, 0, 1, 1, 1, 1, 1, 1, 0, 1, 0, 1, 1, 0],
                [0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0],
                [0, 1, 0, 1, 1, 0, 1, 1, 1, 1, 1, 1, 0, 1, 1, 0, 1, 0],
                [0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0],
                [0, 1, 0, 1, 1, 0, 1, 1, 1, 1, 1, 1, 0, 1, 1, 0, 1, 0],
                [0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0],
                [0, 1, 1, 0, 1, 0, 1, 1, 1, 1, 1, 1, 0, 1, 0, 1, 1, 0],
                ['T', 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0]
            ];

            this.upMap = [
                [0, 0, 0, 0, 1, 0, 0, 0, 0],
                [0, 1, 1, 0, 1, 0, 1, 1, 0],
                [0, 1, 0, 0, 0, 0, 0, 1, 0],
                [0, 1, 0, 1, 1, 1, 0, 1, 0],
                [0, 0, 0, 0, 0, 0, 0, 0, 0],
                [0, 1, 0, 1, 1, 1, 0, 1, 0],
                [0, 1, 0, 0, 0, 0, 0, 1, 0],
                [0, 1, 1, 0, 1, 0, 1, 1, 0],
                ['T', 0, 0, 0, 1, 0, 0, 0, 0]
            ];

            this.downMap = [
                [0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 'T'],
                [0, 1, 1, 0, 1, 1, 1, 0, 1, 0, 1, 1, 1, 0, 1, 1, 0],
                [0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0],
                [1, 0, 1, 0, 1, 0, 1, 1, 1, 1, 1, 0, 1, 0, 1, 0, 1],
                [0, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 0],
                [0, 1, 1, 1, 1, 1, 1, 0, 1, 0, 1, 1, 1, 1, 1, 1, 0],
                [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
            ];

            this.maps = [[...this.downMap], [...this.mainMap], [...this.upMap]];
            this.currentMap = 1;
            this.contentBoard = this.maps[this.currentMap];

            this.maxValueX = this.contentBoard.length - 1;
            this.maxValueY = this.contentBoard[0].length - 1;
        }

        updateLimits() {
            this.maxValueX = this.contentBoard.length - 1;
            this.maxValueY = this.contentBoard[0].length - 1;
        }

        updatePacmanPositions() {
            if (this.currentMap == 2) {
                this.pacmanX = 4;
                this.pacmanY = 4;
            } else {
                this.pacmanX = 2;
                this.pacmanY = 8;
            }
        }

        updateGhostsPositions() {
            this.ghost1X = 0;
            this.ghost1Y = 0;
            this.ghost2X = this.maxValueX;
            this.ghost2Y = this.maxValueY;
        }

        renderPacman() {
            this.contentBoard[this.pacmanX][this.pacmanY] = 'X';
            this.board.children[this.pacmanX].children[this.pacmanY].innerHTML = 'X';
        }

        renderGhosts() {
            this.contentBoard[this.ghost1X][this.ghost1Y] = 'A';
            this.contentBoard[this.ghost2X][this.ghost2Y] = 'A';
            this.board.children[this.ghost1X].children[this.ghost1Y].innerHTML = 'A';
            this.board.children[this.ghost2X].children[this.ghost2Y].innerHTML = 'A';
        }

        renderRoad(x, y) {
            this.contentBoard[x][y] = 0;
            this.board.children[x].children[y].innerHTML = 0;
        }

        render() {
            this.renderPacman();
            this.renderGhosts();
        }

        setMap() {
            let fragment = document.createDocumentFragment();
            for (let i = 0; i < this.contentBoard.length; i++) {
                let row = document.createElement('div');
                row.classList.add('row');
                for (let j = 0; j < this.contentBoard[0].length; j++) {
                    let content = document.createElement('div');
                    content.innerHTML = this.contentBoard[i][j];
                    row.appendChild(content);
                }
                fragment.appendChild(row);
            }
            this.board.appendChild(fragment);
        }

        identifyDoors() {
            this.board.children[0].children[this.maxValueY].setAttribute('id', 'up');
            this.board.children[this.maxValueX].children[0].setAttribute('id', 'down');
        }

        resetMap() {
            switch(this.currentMap) {
                case 0:
                    this.maps[this.currentMap] = [...this.downMap];
                    break;
                case 1:
                    this.maps[this.currentMap] = [...this.mainMap];
                    break;
                case 2:
                    this.maps[this.currentMap] = [...this.upMap];
                    break;
            }
        }

        changeMap() {
            this.resetMap();
            this.contentBoard = this.maps[this.currentMap];
            this.updateLimits();
            this.updatePacmanPositions();
            this.updateGhostsPositions();
            this.board.textContent = '';
            this.setMap();
            this.identifyDoors();
            this.render();
        }

        movingPacman = (e) => {
            switch (e.key) {
                case 'ArrowUp':
                    if (this.pacmanX != 0 && this.contentBoard[this.pacmanX - 1][this.pacmanY] == 0) {
                        this.renderRoad(this.pacmanX, this.pacmanY);
                        this.pacmanX--;
                    } else if (this.pacmanX != 0 && this.contentBoard[this.pacmanX - 1][this.pacmanY] == 'T') {
                        if (this.board.children[this.pacmanX - 1].children[this.pacmanY].getAttribute('id') === 'up') {
                            this.currentMap++;
                            this.changeMap();
                        }
                        else {
                            this.currentMap--;
                            this.changeMap();
                        }
                    }
                    break;
                case 'ArrowRight':
                    if (this.pacmanY != this.maxValueY && this.contentBoard[this.pacmanX][this.pacmanY + 1] == 0) {
                        this.renderRoad(this.pacmanX, this.pacmanY);
                        this.pacmanY++;
                    } else if (this.pacmanX != 0 && this.contentBoard[this.pacmanX][this.pacmanY + 1] == 'T') {
                        if (this.board.children[this.pacmanX].children[this.pacmanY + 1].getAttribute('id') === 'up') {
                            this.currentMap++;
                            this.changeMap();
                        }
                        else {
                            this.currentMap--;
                            this.changeMap();
                        }
                    }
                    break;
                case 'ArrowDown':
                    if (this.pacmanX != this.maxValueX && this.contentBoard[this.pacmanX + 1][this.pacmanY] == 0) {
                        this.renderRoad(this.pacmanX, this.pacmanY);
                        this.pacmanX++;
                    } else if (this.pacmanX != 0 && this.contentBoard[this.pacmanX + 1][this.pacmanY] == 'T') {
                        if (this.board.children[this.pacmanX + 1].children[this.pacmanY].getAttribute('id') === 'up') {
                            this.currentMap++;
                            this.changeMap();
                        }
                        else {
                            this.currentMap--;
                            this.changeMap();
                        }
                    }
                    break;
                case 'ArrowLeft':
                    if (this.pacmanY != 0 && this.contentBoard[this.pacmanX][this.pacmanY - 1] == 0) {
                        this.renderRoad(this.pacmanX, this.pacmanY);
                        this.pacmanY--;
                    } else if (this.pacmanX != 0 && this.contentBoard[this.pacmanX][this.pacmanY - 1] == 'T') {
                        if (this.board.children[this.pacmanX].children[this.pacmanY - 1].getAttribute('id') === 'up') {
                            this.currentMap++;
                            this.changeMap();
                        }
                        else {
                            this.currentMap--;
                            this.changeMap();
                        }
                    }
                    break;
            }
            this.renderGhosts();
            this.renderPacman();
        }

        intervalGhosts() {
            this.renderRoad(this.ghost1X, this.ghost1Y);
            [this.ghost1X, this.ghost1Y] = this.moveGhosts(this.ghost1X, this.ghost1Y);

            this.renderRoad(this.ghost2X, this.ghost2Y);
            [this.ghost2X, this.ghost2Y] = this.moveGhosts(this.ghost2X, this.ghost2Y);

            this.render();
        }

        movePacman() {
            document.addEventListener('keyup', this.movingPacman);
        }

        moveGhosts(x, y) {
            let option = this.findPacman(x, y, this.checkOptions(x, y));

            this.contentBoard[x][y] = 0;
            switch (option) {
                case 'up':
                    x--;
                    break;
                case 'right':
                    y++;
                    break;
                case 'down':
                    x++;
                    break;
                case 'left':
                    y--;
                    break;
            }

            this.contentBoard[x][y] = 'A';
            return [x, y];
        }

        checkOptions(x, y) {
            let options = [];

            if (x != 0 && this.contentBoard[x - 1][y] != 1 && this.contentBoard[x - 1][y] != 'A') options.push('up');
            if (y != this.maxValueY && this.contentBoard[x][y + 1] != 1 && this.contentBoard[x][y + 1] != 'A') options.push('right');
            if (x != this.maxValueX && this.contentBoard[x + 1][y] != 1 && this.contentBoard[x + 1][y] != 'A') options.push('down');
            if (y != 0 && this.contentBoard[x][y - 1] != 1 && this.contentBoard[x][y - 1] != 'A') options.push('left');

            return options;
        }

        findPacman(x, y, options) {
            let selected = null;
            if (x > this.pacmanX && options.includes('up')) selected = 'up';
            else if (y > this.pacmanY && options.includes('left')) selected = 'left';
            else if (x < this.pacmanX && options.includes('down')) selected = 'down';
            else if (y < this.pacmanY && options.includes('right')) selected = 'right';
            else {
                let index = Math.floor(Math.random() * options.length);
                selected = options[index];
            }

            return selected;
        }

        checkLose() {
            let stop = false;
            if (this.contentBoard[this.pacmanX][this.pacmanY] != 'X') {
                this.lose.style.display = 'block';
                document.removeEventListener('keyup', this.movingPacman);
                stop = true;
            }

            return stop;
        }

        restart() {
            this.btn.addEventListener('click', () => window.location.reload());
        }

        init() {
            this.setMap();
            this.identifyDoors();
            this.render();
            this.movePacman();
            this.restart();
        }
    }
}