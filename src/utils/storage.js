export function getData() {
  let data = localStorage.getItem("data");
  if (!data) return { days: {} };
  data = JSON.parse(atob(data));
  data.currentDay = data.days[data.dateKey] || null;
  data.currentGame =
    data.currentDay?.games[data.currentDay?.currentDifficulty] || null;
  return data;
}

export function saveData(data) {
  const { currentDay, currentGame, ...cleaned } = data;
  localStorage.setItem("data", btoa(JSON.stringify(cleaned)));
}

export function getSettings() {
  let data = localStorage.getItem("settings");
  if (!data) return null;
  data = JSON.parse(atob(data));
  return data;
}

export function saveSettings(data) {
  localStorage.setItem("settings", btoa(JSON.stringify(data)));
}
