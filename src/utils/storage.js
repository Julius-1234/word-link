export function getData() {
  const data = JSON.parse(localStorage.getItem("data")) || { days: {} };
  data.currentDay = data.days[data.dateKey] || null;
  data.currentGame =
    data.currentDay?.games[data.currentDay?.currentDifficulty] || null;
  return data;
}
export function saveData(data) {
  const { currentDay, currentGame, ...cleaned } = data;
  localStorage.setItem("data", JSON.stringify(cleaned));
}
