import { getRandomShape } from "./utils/randomGenerator";

const rows = 20;
const cols = 10;
let currShape = [];

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

const clearShape = () => {
  currShape.forEach(([row, col]) => {
    const cell = document.querySelector(
      `[data-row="${row}"][data-col="${col}"]`
    );
    if (cell) cell.classList.remove("occupied");
  });
};

const drawShape = (shape) => {
  shape.forEach(([row, col]) => {
    const cell = document.querySelector(
      `[data-row="${row}"][data-col="${col}"]`
    );
    if (cell) cell.classList.add("occupied");
  });
  currShape = shape;
};

const moveShapeDown = () => {
  clearShape();
  const newPosition = currShape.map(([row, col]) => [row + 1, col]);
  drawShape(newPosition);
};

const rotateShape = () => {
  clearShape();

  const [pivotRow, pivotCol] = currShape[1];
  const rotatedShape = currShape.map(([row, col]) => {
    const relativeRow = row - pivotRow;
    const relativeCol = col - pivotCol;

    const rotatedRelativeRow = -relativeCol;
    const rotatedRelativeCol = relativeRow;

    const newRow = pivotRow + rotatedRelativeRow;
    const newCol = pivotCol + rotatedRelativeCol;

    return [newRow, newCol];
  });

  drawShape(rotatedShape);
  currShape = rotatedShape;
};

const handleKeyPress = (event) => {
  if (event.key === "ArrowUp") {
    rotateShape();
  }
};

export const initGame = () => {
  createGrid();
  drawShape(getRandomShape());
  document.addEventListener("keydown", handleKeyPress);
  setInterval(moveShapeDown, 1000);
};
