import { getRandomShape } from "./utils/randomGenerator";

const rows = 20;
const cols = 10;
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

const clearShape = () => {
  currShape.position.forEach(([row, col]) => {
    const cell = document.querySelector(
      `[data-row="${row}"][data-col="${col}"]`
    );
    if (cell) {
      cell.classList.remove("occupied");
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
      cell.classList.add("occupied");
      cell.classList.add(shape.name);
    }
  });
  currShape = shape;
};

const moveShapeDown = () => {
  clearShape();
  const newPosition = currShape.position.map(([row, col]) => [row + 1, col]);
  currShape.position = newPosition;
  drawShape(currShape);
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
