const GAME_WIDTH = 300;
const GAME_HEIGHT = 600;

class game {
    constructor() {
        this.canvas = null;
        this.context = null;
        this.init();
    }
    init() {
        this.canvas = document.createElement('canvas');
        this.context = this.canvas.getContext('2d');
        this.canvas.width = GAME_WIDTH;
        this.canvas.height = GAME_HEIGHT;
        document.body.appendChild(this.canvas);
        ///board
        this.board = new board(this);
        ///test
        this.d = new dot(this, 0, 0);
        this.d2 = new dot(this, 5, 7);
        /// start game loop

        ////getKeyBoard
        this.listenkeyBoard();
        this.brick = new brick(this);
        this.starGame();
        this.loop();
    }
    creatNewBrick() {
        this.brick = new brick(this);
    }
    starGame() {
        setInterval(() => {
            this.brick.fall();
        }, 500);
    }
    clearScreen() {
        this.context.fillStyle = '#ffffff';
        this.context.fillRect(0, 0, GAME_WIDTH, GAME_HEIGHT);
    }
    loop() {
        console.log('loop');
        this.update();
        this.draw();
        setTimeout(() => this.loop(), 30);

    }
    update() {

    }
    draw() {

        this.clearScreen();
        this.board.draw();
        this.brick.draw();


    }

    listenkeyBoard() {
        document.addEventListener('keydown', (event) => {
            switch (event.code) {
                case 'ArrowLeft':
                    this.brick.moveLeft();
                    break;
                case 'ArrowRight':
                    this.brick.moveRight();
                    break;
                case 'ArrowUp':
                    this.brick.rotate();
                    break;
                case 'ArrowDown':
                    this.brick.moveDown();
                    break;
            }

        });
    }
}
var g = new game();