const rows = 20;
const cols = 10;

export const createGrid = (containerId) => {
  const grid = Array.from({ length: rows }, () => Array(cols).fill(0));
  const gridContainer = document.getElementById(containerId);

  grid.forEach((row) => {
    row.forEach((cell) => {
      const cellElement = document.createElement("div");
      cellElement.classList.add("cell");
      gridContainer.appendChild(cellElement);
    });
  });
};
