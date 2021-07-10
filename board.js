const _ = null;
const x = 'x';
const NUM_ROWS = 20;
const NUM_COLS = 10;
class board {
    constructor(game) {
        this.game = game;
        this.data = [
            [_, _, _, _, _, _, _, _, _, _],
            [_, _, _, _, _, _, _, _, _, _],
            [_, _, _, _, _, _, _, _, _, _],
            [_, _, _, _, _, _, _, _, _, _],
            [_, _, _, _, _, _, _, _, _, _],
            [_, _, _, _, _, _, _, _, _, _],
            [_, _, _, _, _, _, _, _, _, _],
            [_, _, _, _, _, _, _, _, _, _],
            [_, _, _, _, _, _, _, _, _, _],
            [_, _, _, _, _, _, _, _, _, _],
            [_, _, _, _, _, _, _, _, _, _],
            [_, _, _, _, _, _, _, _, _, _],
            [_, _, _, _, _, _, _, _, _, _],
            [_, _, _, _, _, _, _, _, _, _],
            [_, _, _, _, _, _, _, _, _, _],
            [_, _, _, _, _, _, _, _, _, _],
            [_, _, _, _, _, _, _, _, _, _],
            [_, _, _, _, _, _, _, _, _, _],
            [_, _, _, _, _, _, _, _, _, _],
            [_, _, _, _, _, _, _, _, _, _],
            [_, _, _, _, _, _, _, _, _, _],
            [_, _, _, _, _, _, _, _, _, _],
            [_, _, _, _, _, _, _, _, _, _],
            [_, _, _, _, _, _, _, _, _, _],

        ];
    }
    isEmtyCell(row, col) {
        return this.data[row][col] == _;
    }
    isRowFull(row) {
        let full = true;
        for (let col = 0; col < NUM_COLS; col++) {
            if (this.isEmtyCell(row, col)) {
                full = false;
            }
        }
        return full;
    }
    checkFulRow() {
        for (let row = NUM_ROWS - 1; row >= 0; row--) {
            if (this.isRowFull(row)) {
                this.removeRow(row);
            }
        }

    }
    createDots() {
        this.dots = [];
        for (let row = 0; row < NUM_ROWS; row++) {
            for (let col = 0; col < NUM_COLS; col++) {
                if (this.data[row][col] == x) {
                    let newDot = new dot(this.game, row, col);
                    this.dots.push(newDot);
                }

            }
        }
    }
    removeRow(row) {
        this.data.splice(row, 1);
        this.data.unshift([_, _, _, _, _, _, _, _, _, _]);
        this.createDots();
    }
    draw() {
        this.createDots();
        this.dots.forEach((dot) => dot.draw());
    }
}