export function isPublished(data, now = Date.now()) {
  const timestamp = new Date(data.publishedAt).getTime();
  return data.draft === false && Number.isFinite(timestamp) && timestamp <= now;
}
