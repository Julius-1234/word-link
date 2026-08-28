import { formatFromDays } from "./date";
import { archiveStart } from "./constants.js";
import { modes } from "./modes.js";

const msInDay = 24 * 60 * 60 * 1000;

export const archiveParam = "archive";
export const practiceParam = "practice";

export function getDateFromUrl() {
  const urlParams = new URLSearchParams(window.location.search);
  const archiveValue = urlParams.get(archiveParam);
  if (!archiveValue) return null;
  const date = formatFromDays(archiveValue);
  if (date < archiveStart) throw new Error("Date is before archive start");
  const now = Math.round(Date.now() / msInDay) * msInDay;
  if (date > now) throw new Error("Date is in the future");
  return date;
}

export function getCodeFromUrl() {
  const urlParams = new URLSearchParams(window.location.search);
  const codeParam = urlParams.get(practiceParam);
  if (!codeParam) return null;
  const code = parseInt(codeParam);
  return code;
}

function isPractice() {
  const codeFromUrl = getCodeFromUrl();
  return !!codeFromUrl;
}

function isFromArchive() {
  const dateFromUrl = getDateFromUrl();
  return !!dateFromUrl;
}

export function getGameMode() {
  const archive = isFromArchive();
  const practice = isPractice();
  if (archive && practice)
    throw new Error("game mode cannot be both archive and practice");
  if (archive) return modes.archive;
  if (practice) return modes.practice;
  return modes.daily;
}

export function toQueryString(mode, key) {
  if (mode === modes.daily) return "";
  return `?${mode === modes.archive ? archiveParam : practiceParam}=${key}`;
}
