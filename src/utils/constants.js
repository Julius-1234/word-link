export const maxChars = 30;

export const archiveStart = new Date("2026-07-29"); // temp

export const difficultyInfo = {
  order: ["easy", "medium", "hard"],
  beatenNone: "#ff0",
  difficulties: {
    easy: {
      steps: 3,
      seedMult: 1,
      displayName: "easier",
      beatenColour: "#f81",
    },
    medium: {
      steps: 5,
      seedMult: 2,
      displayName: "normal",
      beatenColour: "#f00",
    },
    hard: {
      steps: 7,
      seedMult: 3,
      displayName: "harder",
      beatenColour: "#a0f",
    },
  },
};
difficultyInfo.default = difficultyInfo.order[0];
for (const difficulty of Object.entries(difficultyInfo.difficulties)) {
  const nextIndex = difficultyInfo.order.indexOf(difficulty[0]);
  if (nextIndex === -1) continue;
  const next = difficultyInfo.order[nextIndex + 1];
  difficulty[1].next = next ? next : null;
}

export const changes = {
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
