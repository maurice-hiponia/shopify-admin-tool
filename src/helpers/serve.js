import { readFile } from "node:fs/promises";
import { join, extname } from "node:path";
import { getMimeType } from "./mimeType.js";

export async function serveStatic(rootDir, relativePath, response) {
  try {
    const fullPath = join(rootDir, relativePath);
    const data = await readFile(fullPath);

    response.writeHead(200, {
      'Content-Type': getMimeType(extname(fullPath))
    });

    response.end(data);
  } catch (err) {
    console.error(err);
    response.writeHead(404, { 'Content-Type': 'text/plain' });
    response.end('File not found');
  }
}

export async function serveAPI(response, handler) {
  try {
    const payload = await handler();

    response.writeHead(200, { 'Content-Type': 'application/json' });
    response.end(JSON.stringify(payload));
  } catch (err) {
    console.error(err);
    response.writeHead(500, { 'Content-Type': 'application/json' });
    response.end(JSON.stringify({ error: 'Server error' }));
  }
}
