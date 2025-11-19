import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";
import { access } from "node:fs/promises";
import { constants } from "node:fs";

let cachedRoot = null;

export async function resolvedRootDir() {
  if (cachedRoot) {
    return cachedRoot;
  }

  const marker = "package.json";
  let currentDir = dirname(fileURLToPath(import.meta.url));

  while (true) {
    try {
      await access(join(currentDir, marker), constants.F_OK);

      cachedRoot = currentDir;
      return cachedRoot;

    } catch (error) {
      const parentDir = dirname(currentDir);

      if (parentDir === currentDir) {
        console.error(`Fatal: ${marker} not found`);
        process.exit(1);
      }

      currentDir = parentDir;
    }
  }
}
