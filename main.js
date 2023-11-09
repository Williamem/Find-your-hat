const prompt = require('prompt-sync')({sigint: true});

const hat = '^';
const hole = 'O';
const fieldCharacter = '░';
const pathCharacter = '*';


class Field {
    constructor(array) {
        this.field = array;
        this.posY = 0; //vertical
        this.posX = 0; //horizontal
        this.hasLost = false;
        this.hasWon = false;
    }

    print() {
        this.field.forEach(subArray => {
            console.log(subArray.toString())
        });
    }

    testLose(posX, posY) {
        // fall off y-axis
        if (posY < 0 || posY > this.field[0].length) {
            return true; // Return true instead of 1
        }
        // fall off x-axis
        if (posX < 0 || posX > this.field.length) {
            return true; // Return true instead of 1
        }
        // fall into a hole
        if (this.field[posY][posX] === 'O') {
            return true; // Return true instead of 1
        }
    }
    
    testWin(posX, posY) {
        //const position = ;
        if (this.field[posY][posX] === '^'){
            return true; // Return true instead of 1
        }
    }

    handleInput(userInput) {
        //handle user input
        switch (userInput) {
            case 'w':
                this.posY--;
                break;
            case 'a':
                this.posX--;
                break;
            case 's':
                this.posY++;
                break;
            case 'd':
                this.posX+=1;
                break;
            default:
                return console.log('You have to use wasd to move')
        }     
    }

    updateField() {
        this.field[this.posY][this.posX] = '*';
    }

    play() {
        this.print()
        console.log('posY: ' + this.posY)
        let move = prompt('move ');
        this.handleInput(move);
        //test if player has lost
        this.hasLost = this.testLose(this.posX, this.posY)
        if (this.hasLost === true) {
            return console.log('Sorry, you seem to have fallen off the platform')
        }
        //test if player has won
        this.hasWon = this.testWin(this.posX, this.posY)
        if (this.hasWon === true) {
            return console.log("Congrat's, you found your hat")
        }
        //update and print new field
        this.updateField();
        this.play()
    }
}

const myField = new Field([
    ['*', '░', 'O'],
    ['░', 'O', '░'],
    ['░', '^', '░'],
  ]);

myField.play()