// The gameBoard module is responsible for updating and retrieving information about the state of the gameBoard
const gameBoard = (() => {
    // Private

    const board = [];
    let marker = 0;

    // Public

    const rows = 3;
    const columns = 3;

    const initializeBoard = () => {
        marker = 0;
        for (let i = 0; i < rows; i++) {
            board[i] = [];
            for (let j = 0; j < columns; j++) {
                board[i].push(marker);
            }
        }
    };

    const getRows = () => rows;

    const getColumns = () => columns;

    const getBoard = () => board;

    const getMarker = () => marker;

    const placeMarker = (row, column, activePlayer) => {
        marker = activePlayer.marker;
        board[row][column] = marker;
    };

    return {
        initializeBoard,
        getBoard,
        getRows,
        getColumns,
        getMarker,
        placeMarker,
    };
})();

// The gameController module contains methods that control the flow of the game
const gameController = (() => {
    // private properties & methods
    const playersData = ['Brady', 1, 'Matt', 2];
    const playerFactory = (name, marker) => ({ name, marker });
    const players = [];
    const rows = gameBoard.getRows();
    const columns = gameBoard.getColumns();
    const currentBoard = gameBoard.getBoard();
    let activePlayer;
    let win;

    // public methods

    const createPlayers = () => {
        players[0] = playerFactory(playersData[0], playersData[1]);
        players[1] = playerFactory(playersData[2], playersData[3]);
    };

    const initializeActivePlayer = () => {
        for (let i = 0; i < players.length; i++) {
            if (players[i].marker === 1) {
                activePlayer = players[i];
            }
        }
    };

    const getActivePlayer = () => activePlayer;

    const switchTurns = () => {
        activePlayer = activePlayer === players[0] ? players[1] : players[0];
    };

    const checkHorizontal = () => {
        for (let i = 0; i < rows; i++) {
            win = true;
            for (let j = 0; j < columns; j++) {
                if (!(currentBoard[i][j] === activePlayer.marker)) {
                    win = false;
                    break;
                }
            }
            if (win === true) {
                console.log('win horizontal');
                break;
            }
        }
    };

    const checkVertical = () => {
        for (let i = 0; i < columns; i++) {
            win = true;
            for (let j = 0; j < rows; j++) {
                if (!(currentBoard[j][i] === activePlayer.marker)) {
                    win = false;
                    break;
                }
            }
            if (win === true) {
                console.log('win vertical');
                break;
            }
        }
    };

    const checkLeftDiagonal = () => {
        for (let i = 0; i < rows; i++) {
            win = true;
            if (!(currentBoard[i][i] === activePlayer.marker)) {
                win = false;
                break;
            }
        }
        if (win === true) {
            console.log('win left diagonal');
        }
    };

    const checkRightDiagonal = () => {
        let j = 1;
        for (let i = 0; i < rows; i++) {
            win = true;
            if (!(currentBoard[i][rows - j] === activePlayer.marker)) {
                win = false;
                break;
            }
            j++;
        }
        if (win === true) {
            console.log('win right diagonal');
        }
    };

    const checkWin = () => {
        checkHorizontal();
        checkVertical();
        checkLeftDiagonal();
        checkRightDiagonal();
    };

    const checkDraw = () => {
        for (let i = 0; i < rows; i++) {
            for (let j = 0; j < columns; j++) {
                if (currentBoard[i][j] === 0) return;
            }
        }
        console.log('draw');
    };

    const playRound = (selectedRow, selectedColumn) => {
        if (currentBoard[selectedRow][selectedColumn] === 0) {
            gameBoard.placeMarker(selectedRow, selectedColumn, activePlayer);
            checkWin();
            checkDraw();
            switchTurns();
        }
    };

    return {
        createPlayers,
        initializeActivePlayer,
        switchTurns,
        getActivePlayer,
        playRound,
    };
})();

// The displayController module is responsible for receiving input from users and displaying processed information
const displayController = (() => {
    // Cache DOM
    const boardDiv = document.querySelector('#board');
    const turnHeader = document.querySelector('#turn');

    const renderDisplay = () => {
        // Clear board
        boardDiv.textContent = '';

        // Get current board state & active player
        const currentBoard = gameBoard.getBoard();
        const activePlayer = gameController.getActivePlayer();

        // Render turn indicator
        turnHeader.textContent = `${activePlayer.name}'s Turn`;

        // Render board
        currentBoard.forEach((row, rowIndex) => {
            row.forEach((marker, columnIndex) => {
                const cellButton = document.createElement('button');
                cellButton.classList.add('cell');
                cellButton.dataset.row = rowIndex;
                cellButton.dataset.column = columnIndex;
                cellButton.textContent = marker;
                boardDiv.appendChild(cellButton);
            });
        });
    };

    // Respond to click events on gameBoard
    function boardClickHandler(e) {
        const selectedRow = e.target.dataset.row;
        const selectedColumn = e.target.dataset.column;
        if (!selectedRow || !selectedColumn) return;
        gameController.playRound(selectedRow, selectedColumn);
        renderDisplay();
    }

    // Listen for clicks on gameBoard
    boardDiv.addEventListener('click', boardClickHandler);

    // Initial Setup
    gameController.createPlayers();
    gameController.initializeActivePlayer();
    gameBoard.initializeBoard();
    renderDisplay();
})();
