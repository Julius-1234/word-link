export function getDateFromUrl() {
  const urlParams = new URLSearchParams(window.location.search);
  return urlParams.get("archive") * 1000 || null;
}

export function isFromArchive() {
  const urlParams = new URLSearchParams(window.location.search);
  return !!urlParams.get("archive");
}

export function formatDate(date) {
  return date
    ? `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}`
    : "";
}
