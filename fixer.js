const fs = require("fs");
const path = "flat.json";
const data = JSON.parse(fs.readFileSync(path, "utf8"));
const fields = ["section", "terrace", "penthouse", "fountain", "smart"];
const updated = data.map((f) => {
  fields.forEach((field) => (f[field] = Math.floor(Math.random() * 2).toString()));
  return f;
});
fs.writeFileSync(path, JSON.stringify(updated, null, 2));
console.log("ВСЕ, БЛЯТЬ, ПРАЦЮЄ! ПЕРЕВІРЯЙ JSON");
