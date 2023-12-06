// @ts-check

import fs from "fs";

const data = fs.readFileSync("puzzle_input.txt", "utf8");
const lines = data.split(/\r?\s*\n/u).filter((line) => line !== "");
const linesLength = lines.length;

const [timePrefix, timeDataString] = lines[0].split(":");
const [distPrefix, distDataString] = lines[1].split(":");

const timeToRace = parseInt(timeDataString.trim().split(/\s+/u).join(""));
const recordDistance = parseInt(distDataString.trim().split(/\s+/u).join(""));

const a = -1.0;
const b = timeToRace;
const c = recordDistance * -1.0;

const discriminant = Math.sqrt(b ** 2 - 4 * a * c);
const root1 = Math.ceil((-b + discriminant) / (2 * a));
const root2 = Math.floor((-b - discriminant) / (2 * a));
const possibilities = root2 - root1 + 1;

console.log(possibilities);
