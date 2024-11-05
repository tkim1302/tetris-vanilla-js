import "../css/style.css";
import { getRandomShape } from "./utils/randomGenerator.js";
import { initGame } from "./grid.js";

initGame(getRandomShape());
