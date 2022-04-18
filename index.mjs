import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

export default fs
  .readFileSync(
    path.join(fileURLToPath(import.meta.url), "blurhash-image.min.js")
  )
  .toString();
