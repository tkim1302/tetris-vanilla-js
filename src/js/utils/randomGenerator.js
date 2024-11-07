import { shapes } from "../tetromino.js";

export const getRandomShape = () => {
  const randomShape = shapes[Math.floor(Math.random() * shapes.length)];
  return { ...randomShape };
};
