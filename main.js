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

    static generateField(height, width, difficulty) {
        const fieldFill = [];
        const newField = [];
        let fieldHeight = 10;
        let fieldWidth = 10;
        let fieldDifficulty = 1;
        
        //height 10-100, width 10-100, difficulty 0-5


        
        if (height) {
            fieldHeight = parseInt(height);
        }
        if (width) {
            fieldWidth = parseInt(width);
        }
        if (difficulty) {
            fieldDifficulty = parseInt(difficulty);
        }

        //check height an width
        if (fieldHeight < 10 || fieldHeight > 100 || fieldWidth < 10 || fieldWidth > 100) {
        return console.log('field height wrong, please restart');
        }
        //check difficulty
        if (fieldDifficulty < 1 || fieldDifficulty > 5) {
            return console.log('field difficulty wrong, please restart')
        }
        //check if input is a number
        if (isNaN(fieldHeight) || isNaN(fieldWidth) || isNaN(fieldDifficulty)) {
            return console.log('Set the game up with numbers in the ranges given, please restart');
        }

        //claculate number of chars to fill field
        //calculate number of holes needed in field
        const numHoles = Math.round(fieldHeight * fieldWidth * (fieldDifficulty * 0.1));
        const numFieldCharacters = fieldHeight * fieldWidth - numHoles - 2;
        console.log(`numFieldChar: ${numFieldCharacters}, numHoles: ${numHoles}`)

        //generate all the field characters needed and push to fieldFill array
        for (let i = 0; i < numFieldCharacters; i++) {
            fieldFill.push(fieldCharacter);
        }
        console.log(`fieldFill: ${fieldFill}, \n fieldFill.length: ${fieldFill.length}`)
        
        //generate the holes and push to fieldFill array
        for (let i = 0; i < numHoles; i++) {
            fieldFill.push(hole);
        }
        //put the hat in the fieldFill array
        fieldFill.push(hat);
        //console.log(`fieldFill: ${fieldFill}, \n fieldFill.length: ${fieldFill.length}`)

        //generate the first horizontal line of field
        newField.push([]);
        for (let i = 1; i < fieldWidth; i++) {
            let randomIndex = Math.floor(Math.random() * fieldFill.length);
            //console.log('random index: ' + randomIndex);
            newField[0].push(fieldFill.splice(randomIndex, 1)[0]);
        }

        //generate the rest of the field
/*         for (let i = 1; i < fieldHeight; i++) {
            newField.push([]);
            for (let j = 0; j < fieldWidth; j++) {
            let randomIndex = Math.floor(Math.random() * fieldFill.length);
            newField[i].push(fieldFill.splice(randomIndex, 1)[0]);
            }
        } */
        for (let i = 1; i < fieldHeight; i++) {
            //newField.push([]);
            newField[i] = [];
            for (let j = 0; j < fieldWidth; j++) {
              let randomIndex = Math.floor(Math.random() * fieldFill.length);
              newField[i].push(fieldFill.splice(randomIndex, 1)[0]);
            }
          }


        //put the player in the top left corner of the field
        newField[0].unshift(pathCharacter);
        console.log(`newField: \n ${newField.join(' ')}`);
        return newField;


        //console.log(`height: ${fieldHeight}, width: ${fieldWidth}, difficulty: ${fieldDifficulty}`)
    }

/*     static initiateGame() {
        let setUp = prompt('Set up the game by giving a height and a width from 10 to 100 and a difficulty from 1-5. Separarate with comma, like this: 20, 20, 3: ');
        this.field = Field.generateField(setUp)
        if (this.field === false) {
            return this.initiateGame();
        }
    } */

    print() {
        this.field.forEach(subArray => {
            console.log(subArray.join(' '))
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

/* const myField = new Field([
    ['*', '░', 'O'],
    ['░', 'O', '░'],
    ['░', '^', '░'],
  ]); */


let setUp = prompt('Set up the game by giving a height and a width from 10 to 100 and a difficulty from 1-5. Separarate with comma, like this: 20, 20, 3: ');
const myField = new Field(Field.generateField(setUp))
myField.play();

let playAgain = prompt('want to play again with the same settings? type y for yes and n for no. If you want to change the settings type c');

if (playAgain === 'y') {
    myField.play();
}
if (playAgain === 'c') {
    
}
