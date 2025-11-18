import { readFile } from "node:fs/promises";
import { join, extname } from "node:path";
import { createServer } from "node:http";
import dotenv from "dotenv";

import { getRootDir } from "./helpers/rootDir.js";
import { getMimeType } from "./helpers/mimeType.js";
import { getProducts } from './api/getProduct.js';

const rootDir = await getRootDir;
dotenv.config({ path: join(rootDir, '.env'), quiet: true});

const HOST = process.env.HOSTNAME;
const PORT = process.env.PORT;

const server = createServer(async (request, response) => {
  if (request.url === '/') {
    try {
      const file = await readFile(join(rootDir, 'public', 'index.html'), 'utf-8');
      response.writeHead(200, { 'Content-Type': 'text/html' });
      return response.end(file);
    } catch (err) {
      response.writeHead(500, { 'Content-Type': 'text/plain' });
      return response.end('Error loading index.html');
    }
  }

  if (request.url === '/api/product') {
    const products = await getProducts();
    response.writeHead(200, { 'Content-Type': 'application/json' });
    return response.end(JSON.stringify(products));
  }

  const filePath = join(rootDir, 'public', request.url);
  try {
    const data = await readFile(filePath);
    const mimeType = getMimeType(extname(filePath));
    response.writeHead(200, { 'Content-Type': mimeType });
    return response.end(data);
  } catch {
    response.writeHead(404, { 'Content-Type': 'text/plain' });
    return response.end('File not found');
  }
});

server.listen(PORT, HOST, () => {
  console.log(`Server running at http://${HOST}:${PORT}`);
});
