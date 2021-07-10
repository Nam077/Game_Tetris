class brick {
    constructor(game) {
        this.game = game;
        this.dots = [];
        this.data = [];
        this.col = 0;
        this.row = 0;
        this.createData();
        this.createDots();
    }
    createData() {
        let baseData = [
            [
                [x, x, x, x]
            ],
            [
                [x, x],
                [x, x]
            ],
            [
                [x, x, x],
                [_, x, _],
            ],
            [
                [x, x, _],
                [_, x, x]
            ],
            [
                [_, x, x],
                [x, x, _]
            ],
            [
                [x, _],
                [x, _],
                [x, x]
            ],
            [
                [_, x],
                [_, x],
                [x, x]
            ]
        ];
        let r = Math.floor(Math.random() * 6);
        this.data = baseData[r];


    }
    canMoveRight() {
        let thisBrickCanMoveRight = true;
        this.dots.forEach((dot) => {
            if (!dot.canMoveRight()) {
                thisBrickCanMoveRight = false;
            }
        });
        return thisBrickCanMoveRight;

    }
    moveRight() {
        if (this.canMoveRight()) {
            this.col++;
            this.dots.forEach((dot) => {
                dot.moveRight();
            });
        }
    }
    canMoveLeft() {
        let thisBrickCanMoveLeft = true;
        this.dots.forEach((dot) => {
            if (!dot.canMoveLeft()) {
                thisBrickCanMoveLeft = false;
            }
        });
        return thisBrickCanMoveLeft;

    }
    moveLeft() {
        if (this.canMoveLeft()) {
            this.col--;
            this.dots.forEach((dot) => {
                dot.moveLeft();
            });
        }
    }

    rotate() {

        let newData = [];
        for (let col = 0; col < this.data[0].length; col++) {
            let newRow = [];
            for (let row = this.data.length - 1; row >= 0; row--) {
                newRow.push(this.data[row][col]);
            }
            newData.push(newRow);

        }
        let isNewDataValid = true;
        for (let newRow = 0; newRow < newData.length; newRow++) {
            for (let newCol = 0; newCol < newData[0].length; newCol++) {
                if (newData[newRow][newCol] == x &&
                    !this.game.board.isEmtyCell(newRow, newCol)
                ) {
                    isNewDataValid = false;
                }
            }
        }
        if (isNewDataValid) {
            this.data = newData;
            this.createDots();
        }
    }
    moveDown() {
        while (this.canFall()) {
            this.fall();
        }
    }
    canFall() {
        let thisBrickCanFall = true;
        this.dots.forEach((dot) => {
            if (!dot.canFall()) {
                thisBrickCanFall = false;
            }
        })
        return thisBrickCanFall;

    }
    fall() {
        if (this.canFall()) {
            this.row++;
            this.dots.forEach((dot) => {
                dot.fall();
            });
        } else {
            this.game.creatNewBrick();
            this.appendToBoard();
            for (let i = 0; i < 24; i++) {
                this.game.board.checkFulRow();
            }
        }

    }
    appendToBoard() {
        this.dots.forEach((dot) => {
            this.game.board.data[dot.row][dot.col] = x;
        });
    }
    createDots() {
        this.dots = [];

        for (let row = 0; row < this.data.length; row++) {
            for (let col = 0; col < this.data[0].length; col++) {
                if (this.data[row][col] == x) {
                    let newDot = new dot(this.game, row + this.row, col + this.col);
                    this.dots.push(newDot);
                }

            }
        }

    }
    draw() {
        this.dots.forEach((dot) => dot.draw());
    }
}