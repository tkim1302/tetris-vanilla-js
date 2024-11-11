import { createGrid, clearShape, drawShape } from "./grid";
import { getRandomShape } from "./utils/randomGenerator";
import { getCurrShape, setCurrShape } from "./currShape";
import { handleKeyPress } from "./controls";
import { calculateScore, notificationText } from "./utils/calculateScore";
import { getTopScores, saveScore } from "./topScores";

const rows = 20;
const cols = 10;
let score = 0;
let lines = 0;
let gameInterval;
let isGameover = false;

const hasLanded = (position) => {
  clearShape();

  return position.some(([row, col]) => {
    const cell = document.querySelector(
      `[data-row="${row}"][data-col="${col}"]`
    );
    return row >= rows || cell?.classList.contains("occupied");
  });
};

const moveShapeDown = () => {
  const currShape = getCurrShape();
  const newPosition = currShape.position.map(([row, col]) => [row + 1, col]);
  if (hasLanded(newPosition)) {
    drawShape(currShape);
    checkCompletedRows();
    setCurrShape(getRandomShape());
    if (!hasMoreSpace()) {
      isGameover = true;
      return;
    }
  } else {
    clearShape();
    setCurrShape({ ...currShape, position: newPosition });
    drawShape(getCurrShape());
  }
};

const hasCollided = (position) => {
  for (const [row, col] of position) {
    const cell = document.querySelector(
      `[data-row="${row}"][data-col="${col}"]`
    );
    if (
      col < 0 ||
      col >= cols ||
      row >= rows ||
      row < 0 ||
      cell?.classList.contains("occupied")
    ) {
      return true;
    }
  }
  return false;
};

const checkCompletedRows = () => {
  let completedRowsCnt = 0;
  for (let row = 0; row < rows; row++) {
    const cells = document.querySelectorAll(`[data-row="${row}"]`);
    if (
      Array.from(cells).every((cell) => cell.classList.contains("occupied"))
    ) {
      clearRow(row);
      completedRowsCnt++;
      lines++;
    }
  }
  if (completedRowsCnt > 0) {
    score = calculateScore(completedRowsCnt);
    showGameStatus();
  }
};

const showGameStatus = () => {
  if (!isGameover) {
    const notification = document.getElementById("notification");
    notification.textContent = notificationText;
    const linesText = document.getElementById("lines");
    linesText.textContent = lines;
    setTimeout(() => {
      notification.textContent = "";
    }, 2000);

    const scoreText = document.getElementById("score");
    scoreText.textContent = `${score}`;
  }
};

const clearRow = (row) => {
  const cells = document.querySelectorAll(`[data-row="${row}"]`);
  cells.forEach((cell) => {
    cell.classList.forEach((ele) => {
      if (ele !== "cell") cell.classList.remove(ele);
    });
  });

  for (let aboveRow = row - 1; aboveRow >= 0; aboveRow--) {
    const cellsInAboveRow = document.querySelectorAll(
      `[data-row="${aboveRow}"]`
    );
    cellsInAboveRow.forEach((cell) => {
      const col = cell.getAttribute("data-col");
      const belowCell = document.querySelector(
        `[data-row="${aboveRow + 1}"][data-col="${col}"]`
      );

      belowCell.classList.forEach((ele) => {
        if (ele !== "cell") belowCell.classList.remove(ele);
      });

      cell.classList.forEach((ele) => {
        if (ele !== "cell") belowCell.classList.add(ele);
      });

      cell.classList.forEach((ele) => {
        if (ele !== "cell") cell.classList.remove(ele);
      });
    });
  }
};

const hasMoreSpace = () => {
  const currShape = getCurrShape();
  const position = currShape.position;
  for (const [row, col] of position) {
    const cell = document.querySelector(
      `[data-row="${row}"][data-col="${col}"]`
    );
    if (row === 0 && cell?.classList.contains("occupied")) {
      return false;
    }
  }
  return true;
};

const gameOver = () => {
  clearInterval(gameInterval);
  saveScore(score);

  document.getElementById("score-container").style.display = "none";

  const topScoresContainer = document.getElementById("top-scores-container");
  topScoresContainer.style.display = "block";

  const notification = document.getElementById("notification");
  notification.textContent = "Game Over";

  const topScores = getTopScores();
  const topScoresList = document.getElementById("top-scores-list");
  topScores.forEach((score, index) => {
    const li = document.createElement("li");
    li.textContent = `${index + 1}. Score: ${score} Lines: ${lines}`;
    topScoresList.appendChild(li);
  });
};

const gamePlay = () => {
  moveShapeDown();
  if (isGameover) gameOver();
};

const initGame = () => {
  createGrid();
  drawShape(getRandomShape());
  document.addEventListener("keydown", handleKeyPress);
  gameInterval = setInterval(gamePlay, 500);
};

export { hasCollided, initGame };
