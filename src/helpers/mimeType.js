const MIME_TYPES = {
  ".html": "text/html",
  ".css": "text/css",
  ".js": "text/javascript",
  ".json": "application/json",
};

export function getMimeType(ext) {
  return MIME_TYPES[ext];
}
