// This gameBoard module is responsible for storing information about and interacting with the game board.

const gameBoard = (() => {
    // this 2D board array represents the current state of the game board
    const rows = 3;
    const columns = 3;
    const board = [];

    // Loop through the array, calling the cell function described below to store an object in each cell of the gameboard.

    const updateBoard = () => {
        for (let i = 0; i < rows; i++) {
            board[i] = [];
            for (let j = 0; j < columns; j++) {
                board[i].push(/* insert cell function here */);
            }
        }
    };

    /* 
    
    Marker values:
        0 - Represents an empty cell
        1 - PlayerX has inserted a marker
        2 - PlayerO has inserted a marker

    cell methods will include getMarker that returns the value of it's letter variable, and addLetter that updates the value of it's letter variable to the players letter value when called (will be called when corresponding cell is clicked).

    */

    // Public method that returns the current state of the board
    const getBoard = () => board;
})();
