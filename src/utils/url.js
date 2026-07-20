import { formatFromDays } from "./date";
import { archiveStart } from "./constants.js";
const msInDay = 24 * 60 * 60 * 1000;

export function getDateFromUrl() {
  const urlParams = new URLSearchParams(window.location.search);
  const archiveParam = urlParams.get("archive");
  if (!archiveParam) return null;
  const date = formatFromDays(archiveParam);
  if (date <= archiveStart) throw new Error("Date is before archive start");
  const now = Math.round(Date.now() / msInDay) * msInDay;
  if (date > now) throw new Error("Date is in the future");
  return date;
}

export function getCodeFromUrl() {
  const urlParams = new URLSearchParams(window.location.search);
  const codeParam = urlParams.get("practice");
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
  if (archive) return "archive";
  if (practice) return "practice";
  return "daily";
}
