let currShape = { position: [] };

const getCurrShape = () => currShape;
const setCurrShape = (newShape) => {
  currShape = newShape;
};

export { getCurrShape, setCurrShape };
