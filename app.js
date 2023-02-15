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
    // these variables will be retrieved on input an stored in player1 and player2 objects
    const player1Name = 'Brady';
    const player1Marker = 1;
    const player2Name = 'Matt';
    const player2Marker = 2;

    return { player1Name, player1Marker, player2Name, player2Marker };
})();

const gameController = (() => {
    // The playerFactory function generates player objects
    const playerFactory = (name, marker) => ({ name, marker });

    // player objects data is retrieved from the displayController module and stored in the players array
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

    return { playerFactory, players };
})();

// test scripts

console.log(gameController.players);
