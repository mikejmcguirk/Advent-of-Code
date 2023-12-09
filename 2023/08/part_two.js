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
const journeys = [];

for (let i = 1; i < linesLength; i += 1) {
    let [curLocation, toGoTo] = lines[i].split("=");

    curLocation = curLocation.trim();

    if (curLocation.charAt(2) === "A") {
        journeys.push(curLocation);
    }

    let [leftDest, rightDest] = toGoTo.split(",");

    leftDest = leftDest.trim().replace(/\(/gu, "");
    rightDest = rightDest.trim().replace(/\)/gu, "");

    network.set(curLocation, { leftDest, rightDest });
}

const journeysLength = journeys.length;
const journeyLoops = new Array(journeysLength).fill(0);
let dIndex = 0;
let moves = 0;

for (;;) {
    for (let i = 0; i < journeysLength; i += 1) {
        if (journeyLoops[i] !== 0) {
            continue;
        }

        const destinations = network.get(journeys[i]);

        if (directions[dIndex] === goLeft) {
            journeys[i] = destinations.leftDest;
        } else {
            journeys[i] = destinations.rightDest;
        }

        if (journeys[i].endsWith("Z")) {
            journeyLoops[i] = moves + 1;
        }
    }

    if (journeyLoops.every((loop) => loop !== 0)) {
        break;
    }

    if (dIndex < directionsLength - 1) {
        dIndex += 1;
    } else {
        dIndex = 0;
    }

    moves += 1;
}

let accLCM = journeyLoops[0];

for (let i = 1; i < journeysLength; i += 1) {
    let tempA = accLCM;
    let tempB = journeyLoops[i];

    while (tempB !== 0) {
        const thisTemp = tempB;
        tempB = tempA % tempB;
        tempA = thisTemp;
    }

    accLCM = (accLCM * journeyLoops[i]) / tempA;
}

console.log(accLCM);
