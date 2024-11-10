import { createGrid, clearShape, drawShape } from "./grid";
import { getRandomShape } from "./utils/randomGenerator";
import { getCurrShape, setCurrShape } from "./currShape";
import { handleKeyPress } from "./controls";
import { calculateScore } from "./utils/calculateScore";

const rows = 20;
const cols = 10;
let lines = 0;
let gameInterval;

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
    if (gameOver()) {
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
    calculateScore(completedRowsCnt);
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

const gameOver = () => {
  const currShape = getCurrShape();
  const position = currShape.position;
  for (const [row, col] of position) {
    const cell = document.querySelector(
      `[data-row="${row}"][data-col="${col}"]`
    );
    if (row === 0 && cell?.classList.contains("occupied")) {
      clearInterval(gameInterval);
      const notification = document.getElementById("notification");
      notification.textContent = "Game Over";
      return true;
    }
  }
  return false;
};

const gamePlay = () => {
  moveShapeDown();
};

const initGame = () => {
  createGrid();
  drawShape(getRandomShape());
  document.addEventListener("keydown", handleKeyPress);
  gameInterval = setInterval(gamePlay, 500);
};

export { hasCollided, initGame, lines };
