import { getCurrShape, setCurrShape } from "./currShape";

const rows = 20;
const cols = 10;

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
  const currShape = getCurrShape();

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

  setCurrShape(shape);
};

export { createGrid, clearShape, drawShape };
