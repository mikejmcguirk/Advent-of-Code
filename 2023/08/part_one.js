// @ts-check

import fs from "fs";

const data = fs.readFileSync("puzzle_input.txt", "utf8");
const lines = data.split(/\r?\s*\n/u).filter((line) => line !== "");
const linesLength = lines.length;

const asciiL = 76;
// const asciiR = 82;
const goLeft = 0;
const goRight = 1;

const directions = Array.from(Buffer.from(lines[0])).map((byte) =>
    byte === asciiL ? goLeft : goRight
);

const directionsLength = directions.length;

const network = new Map();

for (let i = 1; i < linesLength; i += 1) {
    let [curLocation, toGoTo] = lines[i].split("=");

    curLocation = curLocation.trim();

    let [leftDest, rightDest] = toGoTo.split(",");

    leftDest = leftDest.trim().replace(/\(/gu, "");
    rightDest = rightDest.trim().replace(/\)/gu, "");

    network.set(curLocation, { leftDest, rightDest });
}

let dIndex = 0;
let moves = 0;
let foundZZZ = false;
let curLocation = "AAA";

while (!foundZZZ) {
    const destinations = network.get(curLocation);

    if (directions[dIndex] === goLeft) {
        curLocation = destinations.leftDest;
    } else {
        curLocation = destinations.rightDest;
    }

    if (curLocation === "ZZZ") {
        foundZZZ = true;
    }

    if (dIndex < directionsLength - 1) {
        dIndex += 1;
    } else {
        dIndex = 0;
    }

    moves += 1;
}

console.log(moves);
