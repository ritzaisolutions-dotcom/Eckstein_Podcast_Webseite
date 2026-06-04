import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const root = path.join(path.dirname(fileURLToPath(import.meta.url)), "..");
const md = fs.readFileSync(path.join(root, "iteration3.md"), "utf8");
const start = md.indexOf("```json\n");
const end = md.indexOf("\n```", start + 8);
if (start < 0 || end < 0) {
  console.error("Could not find JSON fence in iteration3.md");
  process.exit(1);
}
const json = md.slice(start + 8, end);
JSON.parse(json);
const out = path.join(root, "n8n", "fundament-article-release.workflow.json");
fs.writeFileSync(out, json);
console.log("Wrote", out, json.length, "bytes");
