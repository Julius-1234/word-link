import { archiveStart } from "./constants.js";

const msInDay = 24 * 60 * 60 * 1000;

export function formatToDays(date) {
  date = new Date(date).getTime();
  return Math.floor(date / msInDay);
}

export function formatFromDays(ms) {
  return new Date(ms * msInDay);
}

export function isToday(date) {
  const today = formatToDays(new Date());
  date = formatToDays(date);
  return date === today;
}

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

export function isFromArchive() {
  const dateFromUrl = getDateFromUrl();
  return !!dateFromUrl;
}

export function formatDate(date) {
  date = new Date(date);
  return date
    ? `${date.getDate().toString().padStart(2, "0")}-${(date.getMonth() + 1).toString().padStart(2, "0")}-${Math.abs(date.getFullYear())}${date.getFullYear() >= 0 ? "" : " BCE"}`
    : "";
}

export function timeAgo(date) {
  const now = new Date();
  const diff = Math.floor((now - date) / msInDay); // days ago
  if (diff === 0) return "today";
  if (diff === 1) return "yesterday";
  if (diff < 7) return `${diff} days ago`;
  if (diff < 14) return "one week ago";
  if (diff < 30) return `${Math.floor(diff / 7)} weeks ago`;
  if (diff < 60) return "one month ago";
  if (diff < 365) return `${Math.floor(diff / 30)} months ago`;
  if (diff < 730) return "one year ago";
  return `${Math.floor(diff / 365)} years ago`;
}
