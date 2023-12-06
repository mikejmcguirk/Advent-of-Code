// @ts-check

import fs from "fs";

const data = fs.readFileSync("test_data.txt", "utf8");
const lines = data.split(/\r?\s*\n/u).filter((line) => line !== "");
const linesLength = lines.length;

const [timePrefix, timeDataString] = lines[0].split(":");
const [distPrefix, distDataString] = lines[1].split(":");

const times = timeDataString.trim().split(/\s+/u).map(Number);
const distances = distDataString.trim().split(/\s+/u).map(Number);

const winningPresses = [];

for (let i = 0; i < times.length; i += 1) {
    const raceTime = times[i];
    const recordToBeat = distances[i];

    winningPresses.push(0);

    for (let j = 0; j <= raceTime; j += 1) {
        const moveTime = raceTime - j;
        const thisDistance = moveTime * j;
        console.log(j, moveTime, thisDistance);

        if (thisDistance > recordToBeat) {
            winningPresses[i] += 1;
        }
    }
}

const multipliedPresses = winningPresses.reduce((acc, cur) => acc * cur);
console.log(multipliedPresses);
