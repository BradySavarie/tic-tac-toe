const displayController = (() => {
    // This data will not be hard coded once the UI is built
    const playersData = ['Brady', 1, 'Matt', 2];

    return { playersData };
})();

const gameController = (() => {
    // private properties & methods

    const players = [];
    let activePlayer;
    const playerFactory = (name, marker) => ({ name, marker });

    // public methods

    const createPlayers = () => {
        players[0] = playerFactory(
            displayController.playersData[0],
            displayController.playersData[1]
        );
        players[1] = playerFactory(
            displayController.playersData[2],
            displayController.playersData[3]
        );
    };

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

    return {
        createPlayers,
        initializeActivePlayer,
        switchTurns,
        getActivePlayer,
    };
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

gameController.createPlayers();
gameController.initializeActivePlayer();
console.log(gameBoard.getMarker());
gameBoard.placeMarker(1, 1);
console.log(gameBoard.getMarker());
console.log(gameBoard.getBoard());
