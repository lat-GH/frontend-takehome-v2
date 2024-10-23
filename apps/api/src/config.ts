import fs from 'node:fs';
import path from 'node:path';
import dotenv from 'dotenv';
import { z } from 'zod';

const dotfiles = ['.env', '.env.development', '.env.development.local'];

let envPath: string | undefined;

dotfiles.reverse().forEach((dotfile) => {
  if (envPath) {
    return;
  }

  if (fs.existsSync(path.join(process.cwd(), dotfile))) {
    envPath = dotfile;
  }
});

dotenv.config({
  path: envPath,
}).parsed;

const schema = z.object({
  PORT: z.coerce.number().positive(),
});

const config = schema.parse(process.env);

export default config;
