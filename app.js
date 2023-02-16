const displayController = (() => {
    // these test variables will be retrieved on input and stored in playersData array

    const player1Name = 'Brady';
    const player1Marker = 1;
    const player2Name = 'Matt';
    const player2Marker = 2;

    return { player1Name, player1Marker, player2Name, player2Marker };
})();

const gameController = (() => {
    // The playerFactory function generates player objects
    const playerFactory = (name, marker) => ({ name, marker });

    // playersData array is retrieved from the displayController module and stored in the players array

    const players = [
        playerFactory(
            displayController.player1Name,
            displayController.player1Marker
        ),
        playerFactory(
            displayController.player2Name,
            displayController.player2Marker
        ),
    ];

    let activePlayer;

    // I need a method that returns the activePlayer, a method that switches turns, and a method that sets the turn to the player whos marker is 1 by default

    const initializeActivePlayer = () => {
        for (let i = 0; i < players.length; i++) {
            if (players[i].marker === 1) {
                activePlayer = players[i];
            }
        }
    };

    const switchTurns = () => {
        activePlayer = activePlayer === players[0] ? players[1] : players[0];
    };

    const getActivePlayer = () => activePlayer;

    return { initializeActivePlayer, switchTurns, getActivePlayer };
})();

// The gameBoard module is responsible for updating and retrieving information about the state of the gameBoard
const gameBoard = (() => {
    // private properties

    const rows = 3;
    const columns = 3;
    const board = [];
    let marker = 0;

    // Immediately loop through the board array to store the default marker value in each index of the gameboard.

    for (let i = 0; i < rows; i++) {
        board[i] = [];
        for (let j = 0; j < columns; j++) {
            board[i].push(marker);
        }
    }

    // Public methods

    const getBoard = () => board;

    const getMarker = () => marker;

    const placeMarker = (row, column) => {
        marker = gameController.getActivePlayer().marker;
        board[row][column] = marker;
    };

    return { getBoard, getMarker, placeMarker };
})();

// test scripts

gameController.initializeActivePlayer();
console.log(gameBoard.getMarker());
gameBoard.placeMarker(1, 1);
console.log(gameBoard.getMarker());
console.log(gameBoard.getBoard());
