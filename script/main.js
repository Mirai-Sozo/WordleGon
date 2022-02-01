"use strict";

// Yes, I am lazy. 
const getEl = x => document.getElementById(x);

// Filter the wordle list based on the given parameters. 
function solve() {
  // Letters that must appear *somewhere*.
  const REQUIRED = getEl("input-counted").value
    // Format the value to be lowercase and an array. 
    .toLowerCase().split("");
  
  // letters that do not appear. 
  const ILLEGAL = getEl("input-omitted").value
    .toLowerCase().split("")
    // Omit characters that appear in REQUIRED, in case someone mistypes them.
    .filter(x => REQUIRED.indexOf(x) === -1);

  // Letters that appear in a specific spot. 
  const PLACED = getEl("input-known").value
    .toLowerCase().split("")
    // Add extra Hashtags to the end in case the value is incomplete. 
    .concat("#####".split("")).slice(0,5);

  // We may or may not use an expanded list based on user preference. 
  let filtered = getEl("input-all").checked ? GUESSES : ANSWERS;

  // It is expected that specific spots is the most restrictive condition. 
  for (let i = 0; i < 5; i++) {
    if (PLACED[i] === "#") continue;
    filtered = filtered.filter(x => x[i] === PLACED[i]);
  }
  for (const chr of ILLEGAL) {
    filtered = filtered.filter(x => x.indexOf(chr) === -1);
  }
  for (const chr of REQUIRED) {
    filtered = filtered.filter(x => x.indexOf(chr) !== -1);
  }
  // Output the result of filtering.
  getEl("output-count").innerText = filtered.length;
  getEl("output-raw").innerText = filtered.join("\n");
}
