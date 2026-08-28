const pracStart = "prac";
const archiveAndDailyStart = "daily";

export const modes = {
  daily: 1,
  archive: 2,
  practice: 3,
};

export function modesDisplayName(mode) {
  switch (mode) {
    case modes.daily:
      return "Daily";
    case modes.archive:
      return "Archive";
    case modes.practice:
      return "Practice";
    default:
      throw new Error("mode is invalid");
  }
}

export function toGameKey(mode, key) {
  if (mode === modes.practice) return `${pracStart}_${key}`;
  return `${archiveAndDailyStart}_${key}`;
}

// no isArchive or isDaily because archive is also daily gameKey
export function isPracFromGameKey(key) {
  if (new RegExp(`^${pracStart}_[0-9]+$`).test(key)) return true;
  if (new RegExp(`^${archiveAndDailyStart}_[0-9]+$`).test(key)) return false;
  throw new Error("key does not have valid match");
}
