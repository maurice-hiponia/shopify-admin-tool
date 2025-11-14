import {
  readFile,
  join,
  extname,
  createServer,
} from "./config/dependencies.js";

const MIME = {
  ".html": "text/html",
  ".css": "text/css",
  ".js": "text/javascript",
  ".json": "application/json",
};

const getFilePath = (reqUrl) => {
  const pathname = new URL(reqUrl, "http://localhost").pathname;
  return join(
    "./../public",
    pathname === "/" ? "index.html" : decodeURIComponent(pathname),
  );
};

const server = createServer(async (req, res) => {
  try {
    const path = getFilePath(req.url);
    const data = await readFile(path);
    const type = MIME[extname(path)] || "application/octet-stream";
    res.writeHead(200, { "Content-Type": type });
    res.end(data);
  } catch {
    res.writeHead(404, { "Content-Type": "text/plain" });
    res.end("404 Not Found");
  }
});

const HOST = process.env.HOSTNAME || "127.0.0.1";
const PORT = process.env.PORT || 3000;

server.listen(PORT, HOST, () => {
  console.log(`Server running at http://${HOST}:${PORT}`);
});
