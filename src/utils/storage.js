export function getData() {
  let data = localStorage.getItem("data");
  if (!data) data = {};
  else data = JSON.parse(atob(data));
  data = { sets: {}, loaded: {}, ...data };
  return data;
}

export function saveData(data) {
  const cleaned = {
    sets: data.sets,
    loaded: data.loaded,
  };
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

export function loadLastUpdate() {
  let data = localStorage.getItem("lastUpdate");
  return Number(data) || 0;
}

export function saveLastUpdate(update) {
  localStorage.setItem("lastUpdate", String(update));
}
