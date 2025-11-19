import { readFile } from "node:fs/promises";
import { join, extname } from "node:path";
import { createServer } from "node:http";
import dotenv from "dotenv";

import { serveStatic, serveAPI } from "./helpers/serve.js";
import { resolvedRootDir } from "./helpers/rootDir.js";
import { getMimeType } from "./helpers/mimeType.js";
import { getProducts } from './api/getProduct.js';

const rootDir = await resolvedRootDir();
dotenv.config({ path: join(rootDir, '.env'), quiet: true});

const HOST = process.env.HOSTNAME;
const PORT = process.env.PORT;

const server = createServer(async (request, response) => {
  if (request.url === '/api/product') {
    return serveAPI(response, async () => {
      return await getProducts();
    });
  }

  if (request.url === '/') {
    return serveStatic(rootDir, 'public/index.html', response);
  }

  return serveStatic(rootDir, 'public' + request.url, response);
});

server.listen(PORT, HOST, () => {
  console.log(`Server running at http://${HOST}:${PORT}`);
});
