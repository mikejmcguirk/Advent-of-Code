// @ts-check

import assert from "assert";
import fs from "fs";

const data = fs.readFileSync("test_data.txt", "utf8");
const lines = data.split(/\r?\s*\n/u).filter((line) => line !== "");
const linesLength = lines.length;

const [seedPrefix, seedStr] = lines[0].split(":");
const toFind = seedStr.trim().split(/\s+/u).map(Number);
const collectedMaps = [...toFind];

for (let i = 1; i < linesLength; i++) {
    const thisLine = lines[i];
    const toFindLength = toFind.length;
    const collectedMapsLength = collectedMaps.length;

    assert.strictEqual(toFindLength, collectedMapsLength, "toFind should match collectedMaps");

    if (/^\s*$/u.test(thisLine)) {
        continue;
    }

    if (/\bmap\b/u.test(thisLine)) {
        for (let j = 0; j < toFind.length; j++) {
            toFind[j] = collectedMaps[j];
        }
    }

    const [destStart, sourceStart, mapCount] = thisLine.split(/\s+/u).map(Number);
    const sourceEnd = sourceStart + mapCount - 1;
    const mapDiff = destStart - sourceStart;

    for (let j = 0; j < toFindLength; j++) {
        if (toFind[j] >= sourceStart && toFind[j] <= sourceEnd) {
            collectedMaps[j] += mapDiff;
        }
    }
}

assert.strictEqual(toFind.length, collectedMaps.length, "toFind should match collectedMaps");

for (let i = 0; i < toFind.length; i++) {
    toFind[i] = collectedMaps[i];
}

const closestLocation = Math.min(...toFind);
console.log(closestLocation);
