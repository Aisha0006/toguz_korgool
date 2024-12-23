let currentPlayer = 1;
let board = [
    [4, 4, 4, 4, 4, 4, 4, 4, 4], // Питки игрока 1
    [4, 4, 4, 4, 4, 4, 4, 4, 4], // Питки игрока 2
    0, // Магазин игрока 1
    0  // Магазин игрока 2
];

const pitsP1 = document.querySelectorAll("#pits-p1 .pit");
const pitsP2 = document.querySelectorAll("#pits-p2 .pit");
const storeP1 = document.getElementById("p1-store-content");
const storeP2 = document.getElementById("p2-store-content");
const resetButton = document.getElementById("reset-button");

function updateBoard() {
    for (let i = 0; i < 9; i++) {
        pitsP1[i].textContent = board[0][i];
        pitsP2[i].textContent = board[1][i];
    }
    storeP1.textContent = board[2];
    storeP2.textContent = board[3];
}

function handlePitClick(pit, player) {
    const index = parseInt(pit.dataset.index);
    if (player === 1 && index >= 0 && index < 10 && board[0][index] > 0) {
        playTurn(0, index);
    } else if (player === 2 && index >= 0 && index < 10 && board[1][index] > 0) {
        playTurn(1, index);
    }
}

// function playTurn(player, pitIndex) {
//     let stones = board[player][pitIndex];
//     board[player][pitIndex] = 0;
//     let currentIndex = pitIndex;
//     let currentPlayer = player;

//     while (stones > 0) {
//         currentIndex++;
//         if (currentPlayer === 0 && currentIndex >= 9) {
//             board[2]++;
//             stones--;
//             currentIndex = -1;
//             currentPlayer = 1;
//         } else if (currentPlayer === 1 && currentIndex >= 9) {
//             board[3]++;
//             stones--;
//             currentIndex = -1;
//             currentPlayer = 0;
//         } else {
//             if (currentPlayer === 0) {
//                 board[0][currentIndex]++;
//             } else {
//                 board[1][currentIndex]++;
//             }
//             stones--;
//         }
//     }

//     currentPlayer = (currentPlayer === 0) ? 1 : 0; // Переключение игрока
//     updateBoard();
// }

function playTurn(player, pitIndex) {
    let stones = board[player][pitIndex] - 1; // получаем количество камней в выбранной лунке
    board[player][pitIndex] = 1; // очищаем выбранную лунку
    let currentIndex = pitIndex; // текущий индекс лунки для раздачи камней
    let currentPlayer = player; // начинаем с текущего игрока

    while (stones > 0) { // пока есть камни для раздачи
        currentIndex++; // переходим к следующей лунке по часовой стрелке

        // Если дошли до конца лунок текущего игрока
        if (currentPlayer === 0 && currentIndex >= 9) {
            currentIndex = 0; // возвращаемся к лунке игрока 2 (по часовой стрелке)
            currentPlayer = 1; // теперь ходит игрок 2
            if (currentPlayer == 0){
                let s = alert('you dont run')
            }
        } else if (currentPlayer === 1 && currentIndex >= 9) {
            currentIndex = 0; // возвращаемся к лунке игрока 1 (по часовой стрелке)
            currentPlayer = 0; // теперь ходит игрок 1
            if (currentPlayer == 1){
                let s = alert('you dont run')
            }
        }

        // Если камень попадает в лунку другого игрока
        if (currentPlayer !== player) {
            if (board[currentPlayer][currentIndex] % 2 === 0) {
                // Если количество камней в лунке четное, все камни из этой лунки переходят в магазин текущего игрока
                let collectedStones = board[currentPlayer][currentIndex];
                board[currentPlayer][currentIndex] = 0;
                if (player === 0) {
                    board[2] += collectedStones; // добавляем в магазин игрока 1
                } else {
                    board[3] += collectedStones; // добавляем в магазин игрока 2
                }
                stones -= collectedStones; // уменьшаем количество оставшихся камней
                continue; // продолжаем раздачу с оставшимися камнями
            }
        }

        // Раздаем камень в текущую лунку
        board[currentPlayer][currentIndex]++;
        stones--; // уменьшаем количество оставшихся камней
    }

    updateBoard(); // обновляем доску после хода
}
function initGame() {
    currentPlayer = 1;
    board = [
        [9, 9, 9, 9, 9, 9, 9, 9, 9], // Питки игрока 1
        [9, 9, 9, 9, 9, 9, 9, 9, 9], // Питки игрока 2
        0, // Магазин игрока 1
        0  // Магазин игрока 2
    ];
    updateBoard();
}

resetButton.addEventListener("click", initGame);

pitsP1.forEach(pit => pit.addEventListener("click", () => handlePitClick(pit, 1)));
pitsP2.forEach(pit => pit.addEventListener("click", () => handlePitClick(pit, 2)));

initGame();