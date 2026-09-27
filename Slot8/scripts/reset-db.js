// scripts/reset-db.js - Resets db.json from db.seed.json
const fs = require("fs");
const path = require("path");

const root = path.resolve(__dirname, "..");
const seed = path.join(root, "db.seed.json");
const db = path.join(root, "db.json");

try {
  fs.copyFileSync(seed, db);
  console.log("SUCCESS: db.json has been restored from db.seed.json.");
} catch (err) {
  console.error("ERROR: Failed to reset db.json:", err.message);
}
