const gameBoard = (() => {
    let gameboard = [["", "", ""], ["", "", ""], ["", "", ""]];

    return { gameboard };
})();

const Player = (name, tile) => {
    let victories = 0;
    const addVictory = () => {
        victories++;
    }
    const getName = () => name;
    const getTile = () => tile;
    const makeMove = (row, column) => {
        if (gameBoard.gameboard[row][column] === "") {
            gameBoard.gameboard[row][column] = getTile();
            return true;
        }
        else {
            return false;
        }
    }

    return { addVictory, getName, getTile, makeMove };

}



const displayController = (() => {

    const gameContainer = document.querySelector(".gameContainer");

    const begin = () => {
        for (let i = 0; i < gameBoard.gameboard.length; i++) {
            let row = gameContainer.children[i];
            for (let j = 0; j < gameBoard.gameboard[i].length; j++) {
                let column = row.children[j];
                column.textContent = gameBoard.gameboard[i][j];

                column.addEventListener("click", (e) => {
                    Game.Move(row.dataset.row, e.target.dataset.column)
                });
            }
        }

    }

    const reload = () => {
        for (let i = 0; i < gameBoard.gameboard.length; i++) {
            let row = gameContainer.children[i];
            for (let j = 0; j < gameBoard.gameboard[i].length; j++) {
                let column = row.children[j];
                column.textContent = gameBoard.gameboard[i][j];
            }
        }

    }

    return { reload, begin }
})();

/*(player1 = Player("Felipe", "x"), player2 = Player("Juan", "o")*/
const Game = (() => {

    let turn;
    let player1;
    let player2;

    const begin = (playerone = Player("Felipe", "x"), playertwo = Player("Juan", "o")) => {
        displayController.begin();
        player1 = playerone;
        player2 = playertwo;
        doTurn();
    }

    const doTurn = () => {
        if (turn === undefined) {
            turn = player1;
        }
        else if (turn.getName() === player1.getName()) {
            turn = player2;
            console.log(turn.getName());
        }
        else {
            turn = player1;
            console.log(turn.getName());
        }
    }

    const Move = (row, column) => {
        let moveMade = turn.makeMove(row, column);
        displayController.reload();
        if (moveMade) {
            if (checkVictory()) {
                alert(`${turn.getName()} won!`);
            } else {
                if (checkTie()) {
                    alert(`It's a tie!`);
                }
                else {
                    doTurn();
                }

            }


        }

    }

    const checkVictory = () => {
        for (let i = 0; i < gameBoard.gameboard.length; i++) {
            if (gameBoard.gameboard[i][0] === gameBoard.gameboard[i][1] && gameBoard.gameboard[i][1] === gameBoard.gameboard[i][2] && gameBoard.gameboard[i][0] !== "") {
                return true;
            }
            if (gameBoard.gameboard[0][i] === gameBoard.gameboard[1][i] && gameBoard.gameboard[1][i] === gameBoard.gameboard[2][i] && gameBoard.gameboard[0][i] !== "") {
                return true;
            }
        }
        if (gameBoard.gameboard[0][0] === gameBoard.gameboard[1][1] && gameBoard.gameboard[1][1] === gameBoard.gameboard[2][2] && gameBoard.gameboard[0][0] !== "") {
            return true;
        }
        if (gameBoard.gameboard[0][2] === gameBoard.gameboard[1][1] && gameBoard.gameboard[1][1] === gameBoard.gameboard[2][0] && gameBoard.gameboard[0][2] !== "") {
            return true;
        }

        return false;
    }

    const checkTie = () => {
        for (let i = 0; i < gameBoard.gameboard.length; i++) {
            for (let j = 0; j < gameBoard.gameboard[i].length; j++) {
                if (gameBoard.gameboard[i][j] === "") {
                    return false;
                }
            }
        }
        return true;
    }


    return { begin, Move };
})();

const interfaceController = (() => {
    const btnNew = document.querySelector(".btnNew");
    const btnReset = document.querySelector(".btnReset");
    btnReset.addEventListener("click", (e) => {
        location.reload();
    });

    btnNew.addEventListener("click", (e) => {
        e.target.disabled = true;
        btnReset.disabled = false;
        let player1Name = prompt("Introduzca el nombre del primer jugador.");
        let player2Name = prompt("Introduzca el nombre del segundo jugador.");
        let jugador1 = Player(player1Name, "x");
        let jugador2 = Player(player2Name, "o");
        Game.begin(jugador1, jugador2);
    });
})();

