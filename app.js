// The gameBoard module is responsible for updating and retrieving information about the state of the gameBoard
const gameBoard = (() => {
    // Private

    const board = [];
    let marker = '';

    // Public

    const rows = 3;
    const columns = 3;

    const initializeBoard = () => {
        marker = '';
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
    const playersData = ['', 'X', '', 'O'];
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
            if (players[i].marker === 'X') {
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
            if (win) {
                return true;
            }
        }
        return false;
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
            if (win) {
                return true;
            }
        }
        return false;
    };

    const checkLeftDiagonal = () => {
        for (let i = 0; i < rows; i++) {
            win = true;
            if (!(currentBoard[i][i] === activePlayer.marker)) {
                win = false;
                break;
            }
        }
        if (win) {
            return true;
        }
        return false;
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
        if (win) {
            return true;
        }
        return false;
    };

    const checkWin = () => {
        if (
            checkRightDiagonal() ||
            checkLeftDiagonal() ||
            checkVertical() ||
            checkHorizontal()
        ) {
            return true;
        }
        return false;
    };

    const checkDraw = () => {
        for (let i = 0; i < rows; i++) {
            for (let j = 0; j < columns; j++) {
                if (currentBoard[i][j] === '') return false;
            }
        }
        return true;
    };

    const playRound = (selectedRow, selectedColumn) => {
        if (currentBoard[selectedRow][selectedColumn] === '') {
            gameBoard.placeMarker(selectedRow, selectedColumn, activePlayer);
            if (!checkWin() && !checkDraw()) {
                switchTurns();
            }
        }
    };

    return {
        playersData,
        createPlayers,
        initializeActivePlayer,
        switchTurns,
        getActivePlayer,
        playRound,
        checkWin,
        checkDraw,
    };
})();

// The displayController module is responsible for receiving input from users and displaying processed information
const displayController = (() => {
    // Cache DOM
    const boardDiv = document.querySelector('#board');
    const player1Turn = document.querySelector('#player1Turn');
    const player2Turn = document.querySelector('#player2Turn');
    const preGameForm = document.querySelector('#pre-game_form');
    const preGameScreen = document.querySelector('#pre-game_screen');
    const inGameScreen = document.querySelector('#in-game_screen');
    const backBtn = document.querySelector('#backBtn');
    const endGameModal = document.querySelector('#endGameModal');
    const endGameContainer = document.querySelector('#endGameContainer');
    const endGameHeader = document.querySelector('#endGameHeader');
    const playAgainBtn = document.querySelector('#playAgainBtn');

    const renderDisplay = () => {
        // Clear board
        boardDiv.textContent = '';

        // Get current board state & active player
        const currentBoard = gameBoard.getBoard();
        const activePlayer = gameController.getActivePlayer();

        // Render turn indicator
        player1Turn.textContent = `${gameController.playersData[0]}`;
        player2Turn.textContent = `${gameController.playersData[2]}`;

        if (activePlayer.marker === 'X') {
            player1Turn.classList.add(
                'scale-125',
                'shadow-md',
                'border-2',
                'border-orange-400'
            );
            player2Turn.classList.remove(
                'scale-125',
                'shadow-md',
                'border-2',
                'border-cyan-400'
            );
        } else if (activePlayer.marker === 'O') {
            player2Turn.classList.add(
                'scale-125',
                'shadow-md',
                'border-2',
                'border-cyan-400'
            );
            player1Turn.classList.remove(
                'scale-125',
                'shadow-md',
                'border-2',
                'border-orange-400'
            );
        }

        // Render board
        currentBoard.forEach((row, rowIndex) => {
            row.forEach((marker, columnIndex) => {
                const cellButton = document.createElement('button');
                cellButton.classList.add(
                    'bg-neutral-200',
                    'rounded-xl',
                    'hover:bg-neutral-300',
                    'text-5xl',
                    'font-bold'
                );
                cellButton.dataset.row = rowIndex;
                cellButton.dataset.column = columnIndex;
                cellButton.textContent = marker;
                boardDiv.appendChild(cellButton);
            });
        });
    };

    // Toggle between pre-game and in-game screens
    function changeScreens() {
        if (preGameScreen.classList.contains('flex')) {
            preGameScreen.classList.remove('flex');
            preGameScreen.classList.add('hidden');
            inGameScreen.classList.remove('hidden');
            inGameScreen.classList.add('flex');
        } else if (preGameScreen.classList.contains('hidden')) {
            preGameScreen.classList.remove('hidden');
            preGameScreen.classList.add('flex');
            inGameScreen.classList.remove('flex');
            inGameScreen.classList.add('hidden');
        }
    }

    function displayWin() {
        const winner = gameController.getActivePlayer();
        endGameModal.classList.remove('hidden');
        endGameHeader.textContent = `${winner.name} Wins!`;
        if (winner.marker === 'X') {
            endGameContainer.classList.remove('border-cyan-200');
            endGameContainer.classList.add('border-orange-300');
        } else if (winner.marker === 'O') {
            endGameContainer.classList.remove('border-orange-300');
            endGameContainer.classList.add('border-cyan-200');
        }
    }

    function displayDraw() {
        endGameModal.classList.remove('hidden');
        endGameHeader.textContent = "It's a Draw!";
    }

    // Get player names from pre-game form
    function storePlayersData(form) {
        const formData = new FormData(form);
        const data = formData.entries();
        const names = Object.fromEntries(data);
        gameController.playersData[0] = names.player1;
        gameController.playersData[2] = names.player2;
    }

    // Respond to click events on gameBoard
    function boardClickHandler(e) {
        const selectedRow = e.target.dataset.row;
        const selectedColumn = e.target.dataset.column;
        if (!selectedRow || !selectedColumn) return;
        gameController.playRound(selectedRow, selectedColumn);
        renderDisplay();
        if (gameController.checkWin()) {
            displayWin();
        } else if (gameController.checkDraw()) {
            displayDraw();
        }
    }

    // Initialize Game
    function preGameFormSubmitHandler(e) {
        e.preventDefault();
        storePlayersData(e.target);
        gameController.createPlayers();
        gameController.initializeActivePlayer();
        gameBoard.initializeBoard();
        changeScreens();
        renderDisplay();
    }

    function playAgainBtnClickHandler(e) {
        e.preventDefault();
        gameController.createPlayers();
        gameController.initializeActivePlayer();
        gameBoard.initializeBoard();
        endGameModal.classList.add('hidden');
        renderDisplay();
    }

    // Event Listeners
    playAgainBtn.addEventListener('click', playAgainBtnClickHandler);
    boardDiv.addEventListener('click', boardClickHandler);
    preGameForm.addEventListener('submit', preGameFormSubmitHandler);
    backBtn.addEventListener('click', changeScreens);
})();
