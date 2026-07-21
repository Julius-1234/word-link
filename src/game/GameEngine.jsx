import {
  useState,
  useEffect,
  useCallback,
  createContext,
  useContext,
  useRef,
  useReducer,
} from "react";

import { useLocation } from "react-router-dom";

import { maxChars, difficultyInfo, changes } from "../utils/constants.js";

import { setSeed, rand, shuffle } from "../utils/random.js";

import { getData, saveData } from "../utils/storage.js";

import { formatToDays } from "../utils/date.js";

import { getDateFromUrl, getCodeFromUrl, getGameMode } from "../utils/url.js";

import { useMessage } from "../providers/MessageProvider.jsx";

const GameContext = createContext(null);
export default function GameEngine({ children }) {
  const onMessage = useMessage();

  const location = useLocation();

  // resources
  const [resources, setResources] = useState(null);
  useEffect(() => {
    async function loadResources() {
      const [generation, validation] = await Promise.all([
        fetch("/generation.json").then((res) => res.json()),
        fetch("/validation.json").then((res) => res.json()),
      ]);

      setResources({ generation, validation });
    }
    loadResources();
  }, []);

  // date
  const [date, setDate] = useState(null);

  // allData reducer
  const [allData, allDataDispatch] = useReducer((state, action) => {
    const newState = structuredClone(state);
    switch (action.type) {
      case "setDay": {
        const gameMode = getGameMode();
        newState.lastGameMode = gameMode;

        newState.days ??= {};
        newState.pracs ??= {};

        let mode;
        let gameSeed;
        if (gameMode !== "practice") {
          mode = newState.days;
          gameSeed = formatToDays(date);
        } else {
          mode = newState.pracs;
          gameSeed = getCodeFromUrl();
        }

        mode[gameSeed] ??= {
          unlockedDifficulties: [difficultyInfo.default],
          games: {},
          currentDifficulty: action.difficulty || difficultyInfo.default,
        };

        if (
          !mode[gameSeed].unlockedDifficulties.includes(
            mode[gameSeed].currentDifficulty,
          )
        )
          throw new Error(
            "difficulty:",
            mode[gameSeed].currentDifficulty,
            "is not unlocked",
          );

        if (gameMode !== "practice") {
          newState.dateKey = gameSeed;
        } else {
          newState.pracCode = gameSeed;
        }

        newState.currentDay = mode[gameSeed];
        const difficulty = newState.currentDay.currentDifficulty;

        const seed =
          gameSeed * difficultyInfo.difficulties[difficulty].seedMult;

        if (!newState.currentDay.games[difficulty]) {
          const path = makeGame(
            seed,
            difficultyInfo.difficulties[difficulty].steps,
          );

          const start = path[0];
          const end = path.at(-1);
          newState.currentDay.games[difficulty] = {
            start: start,
            end: end,
            found: [],
            currentPath: [],
            guess: "",
          };
        }

        newState.currentGame = newState.currentDay.games[difficulty];
        break;
      }
      case "setDifficulty":
        if (newState.currentDay?.unlockedDifficulties.includes(action.value))
          newState.currentDay.currentDifficulty = action.value;
        break;
      case "unlockDifficulty":
        newState.currentDay.unlockedDifficulties.push(action.value);
        break;
      case "addGuess":
        newState.currentGame.currentPath.push(action.value);
        break;
      case "removeGuess": {
        const check = newState.currentGame.currentPath.pop();
        if (action.check && check && action.check !== check)
          throw new Error(
            "action.check didn't match check.",
            action.check,
            "!==",
            check,
          );
        break;
      }
      case "clearPath":
        newState.currentGame.currentPath = [];
        break;
      case "foundPath":
        newState.currentGame.found.push(action.value);
        break;
      case "setGuess":
        newState.currentGame.guess = action.value;
        break;
      default: //Error
        throw new Error("invalid action.type:", action.type);
        break;
    }
    return newState;
  }, getData());

  useEffect(() => {
    saveData(allData);
  }, [allData]);

  // makeGame
  function makeGame(seed, steps) {
    const dfs = (path, steps) => {
      steps -= 1;
      let neighbors = resources.generation[path.at(-1)].filter(
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

  //guessmaking logic
  function keyHandler(key) {
    if (!resources || !allData.currentGame) return;
    key = key.toLowerCase();
    if (key === "enter") {
      try {
        makeGuess(allData.currentGame.guess);
      } catch (e) {
        onMessage({
          message: e.message,
          timeStamp: Date.now(),
          type: "error",
        });
      }
    } else if (key === "backspace") backspace();
    else if (/^[a-z]$/.test(key)) {
      if ((allData.currentGame.guess || "").length < maxChars)
        allDataDispatch({
          type: "setGuess",
          value: `${allData.currentGame.guess || ""}${key}`,
        });
    }
  }

  useEffect(() => {
    const inputHandler = (e) => {
      if (e.ctrlKey || e.altKey || e.metaKey) return;
      keyHandler(e.key);
    };
    window.addEventListener("keydown", inputHandler);
    return () => {
      window.removeEventListener("keydown", inputHandler);
    };
  }, [resources, allData.currentGame]);

  function makeGuess(input) {
    if (!input) throw new Error("enter some text first");
    const currentPath = allData.currentGame.currentPath;
    if (!resources.validation.includes(input))
      throw new Error("not in word list"); // not a word
    if (currentPath.includes(input)) throw new Error("already used"); // already used
    if (allData.currentGame.start === input)
      throw new Error("that is the start word"); // cannot use start word
    const last = [...currentPath].at(-1) || allData.currentGame.start;
    const changeTypes = [];
    for (const change of Object.keys(changes)) {
      if (changes[change](last, input)) changeTypes.push(change);
    }
    if (changeTypes.length === 0)
      throw new Error("no valid change from previous word"); // no valid change

    if (input === allData.currentGame.end) {
      if (
        allData.currentGame.found.filter((path) => {
          return path.join(" ") === currentPath.join(" ");
        }).length > 0
      )
        throw new Error("path already found"); // already found
      // if here then found correct path
      allDataDispatch({ type: "foundPath", value: [...currentPath] });
      allDataDispatch({ type: "clearPath" });
      allDataDispatch({ type: "setGuess", value: "" });
      const difficulty = allData.currentDay.currentDifficulty;
      const next = difficultyInfo.difficulties[difficulty].next;
      onMessage({
        message: "well done!",
        timeStamp: Date.now(),
        type: "message",
      });
      if (next && !allData.currentDay.unlockedDifficulties.includes(next)) {
        allDataDispatch({ type: "unlockDifficulty", value: next });
        onMessage({
          message: `new difficulty unlocked: ${next}`,
          timeStamp: Date.now(),
          type: "message",
        });
      }
    } else {
      allDataDispatch({ type: "addGuess", value: input });
      allDataDispatch({ type: "setGuess", value: "" });
    }
    saveData(allData);
    // may need to return win? and changeTypes
  }

  function backspace() {
    if (allData.currentGame.guess === "") {
      if (allData.currentGame.currentPath.length === 0) return;
      const last = allData.currentGame.currentPath.at(-1);
      allDataDispatch({ type: "removeGuess", check: last });
      allDataDispatch({ type: "setGuess", value: last || "" });
    } else
      allDataDispatch({
        type: "setGuess",
        value: allData.currentGame.guess.slice(0, -1),
      });
  }

  function clearPath() {
    allDataDispatch({ type: "clearPath" });
    allDataDispatch({ type: "setGuess", value: "" });
  }

  const game = {
    path: allData.currentGame?.currentPath,
    start: allData.currentGame?.start,
    end: allData.currentGame?.end,
    guess: allData.currentGame?.guess,
    difficulty: allData.currentDay?.currentDifficulty,
    unlockedDifficulties: allData.currentDay?.unlockedDifficulties,
    difficultyInfo,
    setDifficulty: (value) => {
      allDataDispatch({ type: "setDifficulty", value });
    },
    date,
    keyHandler,
    clearPath,
  };

  useEffect(() => {
    setDate(new Date(getDateFromUrl() || Date.now()));
  }, [resources, location.search]);

  useEffect(() => {
    if (resources) {
      allDataDispatch({ type: "setDay" });
    }
  }, [date, allData.currentDay?.currentDifficulty]);

  return (
    <GameContext.Provider value={game}>
      {resources && allData.currentGame ? children : <>loading...</>}
    </GameContext.Provider>
  );
}

export function useGame() {
  return useContext(GameContext);
}
