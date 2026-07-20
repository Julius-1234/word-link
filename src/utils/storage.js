/*
  {
    days: {
      20653: {
        unlockedDifficulties: ["easy"],
        games: {
          easy: {
            start: "mice",
            end: "likes",
            found: [],
            currentPath: ["mike"],
            guess:"",
          }
        },
        currentDifficulty:"easy",
      }
    },
    dateKey:"20653"
  }

  pracs: {
      20653: {
        unlockedDifficulties: ["easy"],
        games: {
          easy: {
            start: "mice",
            end: "likes",
            found: [],
            currentPath: ["mike"],
            guess:"",
          }
        },
        currentDifficulty:"easy",
      }
    },
    pracCode:"1234567890"

  currentDay
  currentGame
  currentPrac
  currentPracGame
*/

export function getData() {
  let data = localStorage.getItem("data");
  if (!data) data = {};
  else data = JSON.parse(atob(data));
  data = { days: {}, pracs: {}, ...data };
  /*
  if (data.dateKey) data.currentDay = data.days[data.dateKey] || null;
  if (data.currentDay?.currentDifficulty)
    data.currentGame =
      data.currentDay.games[data.currentDay.currentDifficulty] || null;

  if (data.pracCode) data.currentPrac = data.pracs[data.pracCode] || null;
  if (data.currentPrac?.currentDifficulty)
    data.currentPracGame =
      data.currentPrac.games[data.currentPrac.pracCode] || null;*/

  return data;
}

export function saveData(data) {
  const cleaned = {
    days: data.days,
    pracs: data.pracs,
    dateKey: data.dateKey,
    pracCode: data.pracCode,
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
