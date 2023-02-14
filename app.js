// The gameBoard module is responsible for storing information about and interacting with the game board.

const gameBoard = (() => {
    // this 2D board array represents the current state of the game board
    const rows = 3;
    const columns = 3;
    const board = [];

    // Loop through the array, storing the object that the cell function returns in each index of the gameboard. This loop runs immediately to initialize the gameboard with cell objects that have no placed markers.

    for (let i = 0; i < rows; i++) {
        board[i] = [];
        for (let j = 0; j < columns; j++) {
            board[i].push(/* insert cell function here */);
        }
    }

    /* 
    
    Marker values:
        0 - Represents an empty cell
        1 - PlayerX has inserted a marker
        2 - PlayerO has inserted a marker

    cell methods will include getMarker that returns the value of it's marker variable, and placeMarker that updates the value of it's the cells marker variable to the players marker value when called (will be called when corresponding cell is clicked).

    */

    // The getBoard method returns the current state of the board
    const getBoard = () => board;

    // Return public methods
    return { getBoard };
})();

// The playerFactory function generates player objects
const playerFactory = (name, marker) => ({ name, marker });
