// The gameBoard module is responsible for updating and retrieving information about the state of the gameBoard
const gameBoard = (() => {
    const rows = 3;
    const columns = 3;
    const board = [];

    const cell = (() => {
        /*     
        Marker values:
            0 - Represents an empty cell
            1 - PlayerX has inserted a marker
            2 - PlayerO has inserted a marker
        */
        const marker = 0;

        /* 
            Cell methods will include getMarker that returns the current value of it's marker variable, and placeMarker that updates the value of the marker variable to the players marker value when called.
        */
        const placeMarker = () => {};
        const getMarker = () => marker;
        return { placeMarker, getMarker };
    })();

    // Immediately loop through the board array calling the cell modules getMarker method to store its default marker value in each index of the gameboard.

    for (let i = 0; i < rows; i++) {
        board[i] = [];
        for (let j = 0; j < columns; j++) {
            board[i].push(cell.getMarker());
        }
    }

    // The getMarker property returns the current marker value within the cell module
    const getMarker = cell.getMarker();
    // The getBoard method returns the current state of the board
    const getBoard = () => board;

    // Reveal public methods
    return { getBoard, getMarker };
})();

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

// test scripts

gameController.initializeActivePlayer();
console.log(gameController.getActivePlayer());
gameController.switchTurns();
console.log(gameController.getActivePlayer());
