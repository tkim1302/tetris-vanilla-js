import { shapes } from "../tetromino.js";

const getRandomShape = () => {
  const randomShape = shapes[Math.floor(Math.random() * shapes.length)];
  return { ...randomShape };
};

export { getRandomShape };
