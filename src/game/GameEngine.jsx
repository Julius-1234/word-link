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

import { formatFromDays, formatToDays } from "../utils/date.js";

import { getDateFromUrl, getCodeFromUrl, getGameMode } from "../utils/url.js";

import { useMessage } from "../providers/MessageProvider.jsx";

import { modes, toGameKey } from "../utils/modes.js";

const GameContext = createContext(null);
export default function GameEngine({ children }) {
  const onMessage = useMessage();

  const location = useLocation();

  // resources
  const [resources, setResources] = useState(null);
  useEffect(() => {
    async function loadResources() {
      const [generation, validation, dailys] = await Promise.all([
        fetch("/generation.json").then((res) => res.json()),
        fetch("/validation.json").then((res) => res.json()),
        fetch("/dailys.json").then((res) => res.json()),
      ]);

      setResources({ generation, validation, dailys });
    }
    loadResources();
  }, []);

  // date - not important
  const [date, setDate] = useState(null);

  // allData reducer
  const [allData, allDataDispatch] = useReducer(
    (state, action) => {
      const newState = structuredClone(state);
      switch (action.type) {
        case "setDay": {
          const gameMode = getGameMode();

          // init keys - only 1 used
          const archiveKey = getDateFromUrl();
          const dailyKey = new Date();
          const pracKey = getCodeFromUrl();

          // init newState.data
          const sets = (newState.data.sets ??= {});
          newState.data.loaded ??= {};

          // date only used if gameMode !== practice
          const date = gameMode === modes.archive ? archiveKey : dailyKey;

          // gameSeed: seed for generation
          // gameString: key for localStorage
          const gameSeed =
            gameMode !== modes.practice ? formatToDays(date) : pracKey;
          const gameString = toGameKey(gameMode, gameSeed);

          // init currentDay (as reference)
          const currentDay = (sets[gameString] ??= {
            unlockedDifficulties: [difficultyInfo.default],
            games: {},
            currentDifficulty: action.difficulty || difficultyInfo.default,
          });
          newState.currentDay = currentDay;

          // difficulty
          const difficulty = currentDay.currentDifficulty;
          if (!currentDay.unlockedDifficulties.includes(difficulty))
            throw new Error(`difficulty: ${difficulty} is not unlocked`);

          // init currentGame
          if (!currentDay.games[difficulty]) {
            let game;

            // seedMult & seed for MakeGame
            const seedMult = difficultyInfo.difficulties[difficulty].seedMult;
            const seed = gameSeed * seedMult;

            // set dailys check
            if (gameMode !== modes.practice) {
              const dateString = `${date.getFullYear()}-${String(
                date.getMonth() + 1,
              ).padStart(2, "0")}-${String(date.getDate()).padStart(2, "0")}`;

              const setGameDate = resources.dailys?.[dateString];
              const setGame = setGameDate?.[difficulty];
              if (setGame) {
                // set game if set daily found
                game = setGame;
              }
            }

            // if no set daily or saved game found
            game ??= makeGame(
              seed,
              difficultyInfo.difficulties[difficulty].steps,
            );

            const [start, end] = game;

            currentDay.games[difficulty] = {
              start: start,
              end: end,
              found: [],
              currentPath: [],
              guess: "",
            };
          }

          // set newState.data.loaded
          newState.data.loaded.gameMode = gameMode;
          newState.data.loaded.key = gameSeed;

          // set current game
          newState.currentGame = currentDay.games[difficulty];
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
    },
    { data: getData() },
  );

  useEffect(() => {
    saveData(allData.data);
  }, [allData]);

  useEffect(() => {
    if (resources) {
      allDataDispatch({ type: "setDay" });
    }
  }, [allData.currentDay?.currentDifficulty, resources, location.search]);

  function makeGame(seed, steps) {
    setSeed(seed);
    const startPool = Object.keys(resources.generation);
    const startIndex = Math.floor(rand() * startPool.length);
    const startWord = startPool[startIndex];
    const startLink = resources.generation[startWord];

    const endPool = startLink[steps - 1];
    const endIndex = Math.floor(rand() * endPool.length);

    console.log(startWord, startLink, endPool, endIndex);

    const endWord = endPool[endIndex];

    return [startWord, endWord];
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

  function clearWord() {
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
    key: allData?.data?.loaded?.key,
    keyHandler,
    clearPath,
    clearWord,
    gameMode: allData.data?.loaded?.gameMode,
  };

  return (
    <GameContext.Provider value={game}>
      {resources && allData.currentGame ? children : <>loading...</>}
    </GameContext.Provider>
  );
}

export function useGame() {
  return useContext(GameContext);
}
