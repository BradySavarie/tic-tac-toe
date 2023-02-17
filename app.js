// The gameController module is responsible for directing the flow of the game
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

    // Public methods

    const initializeBoard = () => {
        marker = 0;
        for (let i = 0; i < rows; i++) {
            board[i] = [];
            for (let j = 0; j < columns; j++) {
                board[i].push(marker);
            }
        }
    };

    const getBoard = () => board;

    const getMarker = () => marker;

    const placeMarker = (row, column) => {
        marker = gameController.getActivePlayer().marker;
        board[row][column] = marker;
    };

    return { initializeBoard, getBoard, getMarker, placeMarker };
})();

// The displayController module is responsible for receiving input from users and displaying processed information
const displayController = (() => {
    // Cache DOM
    const boardDiv = document.querySelector('.board');
    const turnHeader = document.querySelector('.turn');

    const renderBoard = () => {
        const currentBoard = gameBoard.getBoard();
        currentBoard.forEach((row) => {
            row.forEach(() => {
                const cellButton = document.createElement('button');
                cellButton.classList.add('cell');
                boardDiv.appendChild(cellButton);
            });
        });
    };

    // Initial Setup
    gameBoard.initializeBoard();
    renderBoard();
    // This data will not be hard coded once the UI is built
    const playersData = ['Brady', 1, 'Matt', 2];
})();

// test scripts
