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

/*     testLose(posX, posY) {
        //fall of y-axis
        if (posY < 0 || posY > this.field[0].length) {
            return true;
        }
        //fall off x-axis
        if (posX < 0 || posX > this.field.length) {
            return true;
        }
        //fall into hole
        if (this.field[posY][posX] === 'O') {
            return true;
        }
    }

    testWin(posX, posY) {
        const position = this.field[posY][posX];
        if (position === '^'){
            return true;
        }
    } */
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
    
    testWin(/* posX, posY */) {
        //const position = ;
        if (this.field[this.posY][this.posX] === '^'){
            return true; // Return true instead of 1
        }
    }
    

/*     testWinLose() {
        if (this.testLose(this.posY, this.posX) === 0) {
            return console.log('You lost');
        }
        if (this.testWin(this.posY, this.posX) === 0) {
            return console.log('Wow, great. You found the hat');
        }
        return console.log('Use wasd to move around');
    } */

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
        /* this.testWinLose(posY, posX)   */      
    }
    //working here
    updateField() {
        this.field[this.posY][this.posX] = '*';
    }
    // and here, posX and posY needs to move into the xcope of the entire class. as GPT tomorrow
    play() {
        this.print()
        console.log('posY: ' + this.posY)
        let move = prompt('move ');
        this.handleInput(move);
        this.hasLost = this.testLose(this.posX, this.posY)
        if (this.hasLost === true) {
            return console.log('Sorry, you seem to have fallen off the platform')
        }
        this.hasWon = this.testWin(/* this.posX, this.posY */)
        //console.log('will this print?')
        if (this.hasWon === true) {
            return console.log("Congrat's, you found your hat")
        }
        console.log('poY: ' + this.posY)
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
  
/*   myField.print()
  myField.testLose()
  //myField.testWin() */
  //myField.play('s');
myField.play()