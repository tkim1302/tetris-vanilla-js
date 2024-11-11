const saveScore = (score) => {
  const topScores = JSON.parse(localStorage.getItem("topScores")) || [];

  topScores.push(score);
  localStorage.setItem(
    "topScores",
    JSON.stringify(topScores.sort((a, b) => b - a).slice(0, 5))
  );
};

const getTopScores = () => {
  const topScores = JSON.parse(localStorage.getItem("topScores")) || [];
  return topScores;
};

export { saveScore, getTopScores };
