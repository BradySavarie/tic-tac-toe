// The gameBoard module is responsible for storing information about and interacting with the game board.

const gameBoard = (() => {
    // this 2D board array represents the current state of the game board
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

    // Immediately loop through the board array calling the getMarker method to store the default marker value of the cell object in each index of the gameboard.

    for (let i = 0; i < rows; i++) {
        board[i] = [];
        for (let j = 0; j < columns; j++) {
            board[i].push(cell.getMarker());
        }
    }

    // The getBoard method returns the current state of the board
    const getBoard = () => board;
    const getMarker = cell.getMarker();
    // Return public methods
    return { getBoard, getMarker };
})();

// The playerFactory function generates player objects
const playerFactory = (name, marker) => ({ name, marker });

// test scripts

console.log(gameBoard.getBoard());
console.log(gameBoard.getMarker);
