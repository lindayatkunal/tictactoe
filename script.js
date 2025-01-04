
        const board = document.getElementById('board');
        const message = document.getElementById('message');

        let currentPlayer = 'X';
        let gameBoard = Array(3).fill(null).map(() => Array(3).fill(''));

        function checkWinner() {
            for (let i = 0; i < 3; i++) {
                if (gameBoard[i][0] && gameBoard[i][0] === gameBoard[i][1] && gameBoard[i][1] === gameBoard[i][2]) {
                    return gameBoard[i][0];
                }

                if (gameBoard[0][i] && gameBoard[0][i] === gameBoard[1][i] && gameBoard[1][i] === gameBoard[2][i]) {
                    return gameBoard[0][i];
                }
            }

            if (gameBoard[0][0] && gameBoard[0][0] === gameBoard[1][1] && gameBoard[1][1] === gameBoard[2][2]) {
                return gameBoard[0][0];
            }

            if (gameBoard[0][2] && gameBoard[0][2] === gameBoard[1][1] && gameBoard[1][1] === gameBoard[2][0]) {
                return gameBoard[0][2];
            }

            return null;
        }

        function isDraw() {
            return gameBoard.flat().every(cell => cell);
        }

        function createBoard() {
            board.innerHTML = '';
            gameBoard.forEach((row, rowIndex) => {
                row.forEach((cell, colIndex) => {
                    const cellElement = document.createElement('div');
                    cellElement.classList.add('cell');
                    cellElement.dataset.row = rowIndex;
                    cellElement.dataset.col = colIndex;
                    cellElement.textContent = cell;

                    cellElement.addEventListener('click', () => {
                        if (!gameBoard[rowIndex][colIndex]) {
                            gameBoard[rowIndex][colIndex] = currentPlayer;
                            cellElement.textContent = currentPlayer;
                            cellElement.classList.add('disabled');

                            const winner = checkWinner();
                            if (winner) {
                                message.textContent = `Player ${winner} wins!`;
                                document.querySelectorAll('.cell').forEach(cell => cell.classList.add('disabled'));
                                return;
                            }

                            if (isDraw()) {
                                message.textContent = "It's a draw!";
                                return;
                            }

                            currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
                            message.textContent = `Player ${currentPlayer}'s turn.`;
                        }
                    });

                    board.appendChild(cellElement);
                });
            });
        }

        createBoard();
        message.textContent = `Player ${currentPlayer}'s turn.`;
    