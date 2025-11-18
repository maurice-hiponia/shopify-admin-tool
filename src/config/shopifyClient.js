import {createAdminApiClient} from '@shopify/admin-api-client';
import { join,dirname } from "node:path";
import { fileURLToPath } from 'node:url';
import dotenv from "dotenv";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const ENV_PATH = join(__dirname, '../../.env');

dotenv.config({ path: ENV_PATH, quiet: true });

export const client = createAdminApiClient({
  storeDomain: process.env.STORE_DOMAIN,
  apiVersion: process.env.API_VERSION,
  accessToken: process.env.ACCESS_TOKEN_KEY,
});
