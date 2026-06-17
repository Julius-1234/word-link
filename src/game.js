import { setSeed, rand, shuffle } from "./randomSeed.js";

const resources = { generation: null, validation: null };

export const genPromise = fetch("/generation.json")
  .then((res) => res.json())
  .then((json) => (resources.generation = json));

export const valPromise = fetch("/validation.json")
  .then((res) => res.json())
  .then((json) => (resources.validation = json));

export const difficultyInfo = {
  default: "easy",
  easy: { steps: 4, seedMult: 1, next: "medium" },
  medium: { steps: 5, seedMult: 2, next: "hard" },
  hard: { steps: 6, seedMult: 3 },
};

export const maxGuesses = 7;
const changes = {
  plus: (start, end) => {
    if (start.length + 1 !== end.length) return false;
    let i = 0,
      j = 0,
      skipped = false;
    while (i < start.length && j < end.length) {
      if (start[i] === end[j]) {
        i++;
        j++;
      } else {
        if (skipped) return false;
        skipped = true;
        j++;
      }
    }
    return true;
  },
  minus: (start, end) => {
    return changes.plus(end, start);
  },
  change: (start, end) => {
    if (start.length !== end.length) return false;
    let diff = 0;
    for (let i = 0; i < start.length; i++) {
      if (start[i] !== end[i]) diff++;
      if (diff > 1) return false;
    }
    return diff === 1;
  },
  rearrange: (start, end) => {
    return (
      start.split("").sort().join("") === end.split("").sort().join("") &&
      start !== end
    );
  },
};

let allGameData = null;
export let currentDay = null;
export let currentGame = null;
export let currentDifficulty = difficultyInfo.default;

export function getGame(date) {
  loadData();
  const dateSeed = new Date(
    date.getFullYear(),
    date.getMonth(),
    date.getDate(),
  ).getTime();
  const dateKey = `${dateSeed}`;
  if (!allGameData[dateKey]) {
    allGameData[dateKey] = { unlockedDifficulties: [difficultyInfo.default] };
  }
  currentDay = allGameData[dateKey];
  const seed = dateSeed * difficultyInfo[currentDifficulty].seedMult;
  if (!currentDay[currentDifficulty]) {
    const path = makeGame(seed, difficultyInfo[currentDifficulty].steps);
    console.log(path);
    const start = path[0];
    const end = path[path.length - 1];
    currentDay[currentDifficulty] = {
      start: start,
      end: end,
      found: [],
      currentPath: [],
      currentInput: [],
    };
  }
  currentGame = currentDay[currentDifficulty];
  saveData();
}

function saveData() {
  localStorage.setItem("data", JSON.stringify(allGameData));
}

function loadData() {
  allGameData = JSON.parse(localStorage.getItem("data")) || {};
}

function makeGame(seed, steps) {
  const dfs = (path, steps) => {
    steps -= 1;
    let neighbors = resources.generation[path[path.length - 1]].filter(
      (w) => !path.includes(w),
    );
    neighbors = shuffle(neighbors);
    if (neighbors.length === 0) return [];
    if (steps <= 0) return [...path, neighbors[0]];
    for (const n of neighbors) {
      const testPath = dfs([...path, n], steps);
      if (testPath.length > 0) return testPath;
    }
    return [];
  };
  setSeed(seed);
  const startPool = Object.keys(resources.generation);
  const start = startPool[Math.floor(rand() * startPool.length)];
  const path = [start];
  return dfs(path, steps);
}

export function makeGuess(guess) {
  const currentPath = currentGame.currentPath;
  guess = guess.toLowerCase().trim();
  if (currentPath.length >= maxGuesses) throw new Error("max guesses"); // 1
  if (!resources.validation.includes(guess))
    throw new Error("not in word list"); // 2
  if (currentPath.includes(guess)) throw new Error("already used"); // 3
  const last = [currentGame.start, ...currentPath][currentPath.length];
  const changeTypes = [];
  for (const change of Object.entries(changes)) {
    if (change[1](last, guess)) changeTypes.push(change[0]);
  }
  if (changeTypes.length === 0)
    throw new Error("no valid change from previous word"); // 4
  if (guess === currentGame.end) {
    if (
      currentGame.found.filter((path) => {
        console.log(path);
        return path.join(" ") === currentPath.join(" ");
      }).length > 0
    )
      throw new Error("path already found"); // 5

    currentGame.found.push([...currentPath]);
    currentGame.currentPath = [];
    console.log(difficultyInfo[currentDay.unlockedDifficulties.length - 1]);
    const next = difficultyInfo[currentDifficulty].next;
    if (next && !currentDay.unlockedDifficulties.includes(next))
      currentDay.unlockedDifficulties.push(next);
  } else {
    currentPath.push(guess);
  }
  saveData();
  return { win: guess === currentGame.end, changes: changeTypes };
}

export function backGuess() {
  if (!currentGame.currentPath) return "";
  return currentGame.currentPath.pop();
}

export function clear() {
  currentGame.currentPath = [];
}
