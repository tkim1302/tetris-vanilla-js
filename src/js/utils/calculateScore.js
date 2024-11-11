let score = 0;
let notificationText = "";

const calculateScore = (completedRowsCnt) => {
  switch (completedRowsCnt) {
    case 1:
      score += 100;
      notificationText = "Single!";
      break;
    case 2:
      score += 300;
      notificationText = "Double!";
      break;
    case 3:
      score += 500;
      notificationText = "Triple!";
      break;
    case 4:
      score += 800;
      notificationText = "Tetris!!";
      break;
  }

  return score;
};

export { calculateScore, notificationText };
