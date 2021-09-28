import { dirname, join } from 'path';
import { fileURLToPath } from 'url';

const directory = dirname(fileURLToPath(import.meta.url));
export const CACHE_PATH = join(directory, '../../src/cache/sig.json')