const fs = require("fs");
const engine = require("./engine.js");
const cases = JSON.parse(fs.readFileSync("expected.json", "utf8"));
let failed = 0;
for (const c of cases) {
  const got = engine[c.fn](...c.args);
  if (got !== c.expected) {
    failed++;
    console.log("FAIL", c.fn, JSON.stringify(c.args));
    console.log("  expected:", c.expected);
    console.log("  got:     ", got);
  }
}
console.log(`${cases.length} cases / ${cases.length - failed} checks, ${failed} failed`);
process.exit(failed ? 1 : 0);
