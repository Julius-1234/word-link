export const maxChars = 30;

export const archiveStart = new Date("2025-07-8"); // temp

export const difficultyInfo = {
  order: ["easy", "medium", "hard"],
  difficulties: {
    easy: {
      steps: 3,
      seedMult: 1,
      displayName: "easy",
      beatenStyles: { backgroundColor: "#f81", color: "#333" },
    },
    medium: {
      steps: 6,
      seedMult: 2,
      displayName: "normal",
      beatenStyles: { backgroundColor: "#ff0", color: "#333" },
    },
    hard: {
      steps: 8,
      seedMult: 3,
      displayName: "hard",
      beatenStyles: { backgroundColor: "#0f0", color: "#333" },
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
