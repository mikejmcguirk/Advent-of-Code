// @ts-check

import fs from "fs";

const data = fs.readFileSync("puzzle_input.txt", "utf8");
const lines = data.split(/\r?\s*\n/u).filter((line) => line !== "");
const linesLength = lines.length;

let totalNewNumbers = 0;

for (let i = 0; i < linesLength; i++) {
    const thisLine = lines[i];

    const theseNumbers = thisLine
        .trim()
        .split(/\s+/u)
        .filter((line) => line !== "")
        .map((numberString) => Number(numberString));

    const diffs = [];
    diffs.push(theseNumbers);

    for (;;) {
        const diffAcc = [];
        const theseDiffs = diffs[0];

        for (let j = 0; j < theseDiffs.length - 1; j++) {
            const thisNumber = theseDiffs[j];
            const nextNumber = theseDiffs[j + 1];

            const diff = nextNumber - thisNumber;

            diffAcc.push(diff);
        }

        diffs.unshift(diffAcc);

        const allZeroes = diffAcc.every((diff) => diff === 0);
        const diffAccLength = diffAcc.length;

        if (allZeroes || diffAccLength === 1) {
            break;
        }
    }

    let lastDiff = 0;

    for (let j = 0; j < diffs.length; j++) {
        const theseDiffs = diffs[j];
        const thisDiffLength = theseDiffs.length;

        const thisLastDiff = theseDiffs[thisDiffLength - 1];
        lastDiff += thisLastDiff;
    }

    totalNewNumbers += lastDiff;
}

console.log(totalNewNumbers);
