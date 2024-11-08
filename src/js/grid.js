import { getRandomShape } from "./utils/randomGenerator";

const rows = 20;
const cols = Array.from({ length: 10 }, () => ({ bottom: 20 }));
let currShape = { position: "", color: "" };

const createGrid = () => {
  const gridContainer = document.getElementById("grid-container");

  for (let row = 0; row < rows; row++) {
    for (let col = 0; col < cols.length; col++) {
      const cell = document.createElement("div");
      cell.classList.add("cell");
      cell.setAttribute("data-row", row);
      cell.setAttribute("data-col", col);
      gridContainer.appendChild(cell);
    }
  }
};

const hasHitBottom = (position) => {
  return position.some(([row, col]) => row >= cols[col].bottom - 1);
};

const moveShapeDown = () => {
  const newPosition = currShape.position.map(([row, col]) => [row + 1, col]);
  if (hasHitBottom(currShape.position)) {
    currShape.position.forEach(([row, col]) => {
      cols[col].bottom = Math.min(cols[col].bottom, row);
    });
    currShape = getRandomShape();
  } else {
    clearShape();
    currShape.position = newPosition;
  }
  drawShape(currShape);
};

const clearShape = () => {
  currShape.position.forEach(([row, col]) => {
    const cell = document.querySelector(
      `[data-row="${row}"][data-col="${col}"]`
    );
    if (cell) {
      cell.classList.remove(currShape.name);
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

  currShape.position = rotatedShape;
  drawShape(currShape);
};

const moveLeft = () => {
  const newPosition = currShape.position.map(([row, col]) => [row, col - 1]);
  clearShape();
  currShape.position = newPosition;
  drawShape(currShape);
};

const moveDown = () => {
  const newPosition = currShape.position.map(([row, col]) => [row + 1, col]);
  clearShape();
  currShape.position = newPosition;
  drawShape(currShape);
};

const moveRight = () => {
  const newPosition = currShape.position.map(([row, col]) => [row, col + 1]);
  clearShape();
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

export const initGame = () => {
  createGrid();
  drawShape(getRandomShape());
  document.addEventListener("keydown", handleKeyPress);
  setInterval(moveShapeDown, 500);
};
