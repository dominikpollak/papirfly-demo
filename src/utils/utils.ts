export const isValidUrl = (url: string | undefined): boolean => {
  if (!url || url.trim() === "") return false;

  // This regex is safer and avoids catastrophic backtracking.
  // It's a bit more lenient but captures 99.9% of valid URLs without freezing.
  const pattern = new RegExp(
    "^(https?:\\/\\/)?" + // protocol
      "((([a-z\\d]([a-z\\d-]{0,61}[a-z\\d])?)\\.)+[a-z]{2,63}|" + // domain name
      "localhost|" + // localhost
      "((\\d{1,3}\\.){3}\\d{1,3}))" + // OR ip (v4) address
      "(\\:\\d+)?" + // port
      "(\\/[-a-z\\d%_.~+]*)*" + // path
      "(\\?[;&a-z\\d%_.~+=-]*)?" + // query string
      "(\\#[-a-z\\d_]*)?$", // fragment locator
    "i"
  );

  return pattern.test(url.trim());
};
