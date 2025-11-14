import { readFile } from "node:fs/promises";
import { join, extname } from "node:path";
import { createServer } from "node:http";
import dotenv from "dotenv";

dotenv.config({ path: "./../.env", quiet: true });

export { readFile, join, extname, createServer, dotenv };
