import { getRandomShape } from "./utils/randomGenerator";

const rows = 20;
const cols = 10;
let gameInterval;
let currShape = { position: "", color: "" };

const createGrid = () => {
  const gridContainer = document.getElementById("grid-container");

  for (let row = 0; row < rows; row++) {
    for (let col = 0; col < cols; col++) {
      const cell = document.createElement("div");
      cell.classList.add("cell");
      cell.setAttribute("data-row", row);
      cell.setAttribute("data-col", col);
      gridContainer.appendChild(cell);
    }
  }
};

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
  const newPosition = currShape.position.map(([row, col]) => [row + 1, col]);

  if (hasLanded(newPosition)) {
    drawShape(currShape);
    currShape = getRandomShape();
    if (gameOver()) {
      return;
    }
  } else {
    clearShape();
    currShape.position = newPosition;
    drawShape(currShape);
  }
};

const clearShape = () => {
  currShape.position.forEach(([row, col]) => {
    const cell = document.querySelector(
      `[data-row="${row}"][data-col="${col}"]`
    );
    if (cell) {
      cell.classList.remove(currShape.name);
      cell.classList.remove("occupied");
    }
  });
};

const drawShape = (shape) => {
  shape.position.forEach(([row, col]) => {
    const cell = document.querySelector(
      `[data-row="${row}"][data-col="${col}"]`
    );
    if (cell) {
      cell.classList.add(shape.name);
      cell.classList.add("occupied");
    }
  });

  currShape = shape;
};

const rotateShape = () => {
  const currShapePosition = currShape.position;
  clearShape();

  const [pivotRow, pivotCol] = currShapePosition[1];
  const rotatedShape = currShapePosition.map(([row, col]) => {
    const relativeRow = row - pivotRow;
    const relativeCol = col - pivotCol;

    const rotatedRelativeRow = -relativeCol;
    const rotatedRelativeCol = relativeRow;

    const newRow = pivotRow + rotatedRelativeRow;
    const newCol = pivotCol + rotatedRelativeCol;

    return [newRow, newCol];
  });

  if (!hasCollided(rotatedShape)) {
    currShape.position = rotatedShape;
  } else {
    const rotationErrorMsg = document.getElementById("rotation-error-message");
    rotationErrorMsg.textContent = "Not enough space to rotate";

    setTimeout(() => {
      rotationErrorMsg.textContent = "";
    }, 2000);
  }
  drawShape(currShape);
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

const moveLeft = () => {
  let newPosition = currShape.position.map(([row, col]) => [row, col - 1]);

  clearShape();
  if (hasCollided(newPosition)) newPosition = currShape.position;
  currShape.position = newPosition;
  drawShape(currShape);
};

const moveDown = () => {
  let newPosition = currShape.position.map(([row, col]) => [row + 1, col]);

  clearShape();
  if (hasCollided(newPosition)) newPosition = currShape.position;
  currShape.position = newPosition;
  drawShape(currShape);
};

const moveRight = () => {
  let newPosition = currShape.position.map(([row, col]) => [row, col + 1]);

  clearShape();
  if (hasCollided(newPosition)) newPosition = currShape.position;
  currShape.position = newPosition;
  drawShape(currShape);
};

const handleKeyPress = (event) => {
  switch (event.key) {
    case "ArrowUp":
      rotateShape();
      break;
    case "ArrowLeft":
      moveLeft();
      break;
    case "ArrowRight":
      moveRight();
      break;
    case "ArrowDown":
      moveDown();
      break;
    default:
      break;
  }
};

const gameOver = () => {
  const position = currShape.position;
  for (const [row, col] of position) {
    const cell = document.querySelector(
      `[data-row="${row}"][data-col="${col}"]`
    );
    if (row === 0 && cell?.classList.contains("occupied")) {
      clearInterval(gameInterval);
      return true;
    }
  }
  return false;
};

const gamePlay = () => {
  moveShapeDown();
};

export const initGame = () => {
  createGrid();
  drawShape(getRandomShape());
  document.addEventListener("keydown", handleKeyPress);
  gameInterval = setInterval(gamePlay, 500);
};
