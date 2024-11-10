import { getCurrShape, setCurrShape } from "./currShape";
import { clearShape, drawShape } from "./grid";
import { hasCollided } from "./game";

const rotateShape = () => {
  const currShapePosition = getCurrShape().position;
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
    setCurrShape({ ...getCurrShape(), position: rotatedShape });
  } else {
    const rotationErrorMsg = document.getElementById("rotation-error-message");
    rotationErrorMsg.textContent = "Not enough space to rotate";

    setTimeout(() => {
      rotationErrorMsg.textContent = "";
    }, 2000);
  }
  drawShape(getCurrShape());
};

const moveLeft = () => {
  const currShape = getCurrShape();
  let newPosition = currShape.position.map(([row, col]) => [row, col - 1]);

  clearShape();
  if (hasCollided(newPosition)) newPosition = currShape.position;
  setCurrShape({ ...currShape, position: newPosition });
  drawShape(getCurrShape());
};

const moveDown = () => {
  const currShape = getCurrShape();

  let newPosition = currShape.position.map(([row, col]) => [row + 1, col]);

  clearShape();
  if (hasCollided(newPosition)) newPosition = currShape.position;
  setCurrShape({ ...currShape, position: newPosition });
  drawShape(getCurrShape());
};

const moveRight = () => {
  const currShape = getCurrShape();
  let newPosition = currShape.position.map(([row, col]) => [row, col + 1]);

  clearShape();
  if (hasCollided(newPosition)) newPosition = currShape.position;
  setCurrShape({ ...currShape, position: newPosition });
  drawShape(getCurrShape());
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

export { handleKeyPress };
