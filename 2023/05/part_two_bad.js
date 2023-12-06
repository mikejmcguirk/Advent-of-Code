// @ts-check

// May this code serve as a grim monument to what not to do
//
// But in all seriousness, it almost worked and it actually performed okay
// The biggest problem was that the puzzle input requires handling numbers that require
// int64's, and Javascript's number type does not natively support that
//
// But in the end, if you compare to the C# solution, this is just so over-written

// import assert from "assert";
import fs from "fs";

const data = fs.readFileSync("puzzle_input.txt", "utf8");
const lines = data.split(/\r?\s*\n/u).filter((line) => line !== "");
const linesLength = lines.length;

const [seedPrefix, seedStr] = lines[0].split(":");
const toFind = seedStr.trim().split(/\s+/u).map(Number);
const toFindLength = toFind.length;

if (!(toFindLength % 2 === 0)) {
    throw new Error("Uneven number of seeds");
}

const seedRanges = [];

for (let i = 1; i < toFindLength; i += 2) {
    const lowestSeed = toFind[i - 1];
    const highestSeed = lowestSeed + toFind[i] - 1;
    const seedValues = [lowestSeed, highestSeed];

    const seedRange = [seedValues, seedValues];
    seedRanges.push(seedRange);
}

/**
 * @type {number} - Closest place to plant the seed
 */
let lowestLocation = -1;
const seedRangesLength = seedRanges.length;

/**
 * Maps seed ranges.
 *
 * @param {number[][]} seedRange
 * @param {number} lineID
 */
const mapSeedRanges = function (seedRange, lineID) {
    const curLine = lines[lineID];
    const nextLineID = lineID + 1;
    console.log(lineID);

    if (/\bmap\b/u.test(curLine)) {
        seedRange[0][0] = seedRange[1][0];
        seedRange[0][1] = seedRange[1][1];
        // console.log("collect");

        mapSeedRanges(seedRange, nextLineID);
        return;
    }

    const seedRngLo = seedRange[0][0];
    const seedRngHi = seedRange[0][1];
    const seedCollectLo = seedRange[1][0];
    const seedCollectHi = seedRange[1][1];

    if (seedCollectLo > seedCollectHi) {
        throw new Error(`Collect low end is higher at ${lineID}`);
    }

    // console.log(`${seedRngLo}, ${seedRngHi}, ${seedCollectLo}, ${seedCollectHi}`);

    const loDiff = seedRngLo !== seedCollectLo;
    const hiDiff = seedRngHi !== seedCollectHi;

    if (loDiff !== hiDiff) {
        throw new Error(`Only one range is different at ${lineID}`);
    }

    const lastLine = lineID + 1 === linesLength;
    // console.log(`${lineID + 1} and ${linesLength}`);
    // console.log(lastLine);

    if (loDiff && hiDiff && !lastLine) {
        mapSeedRanges(seedRange, nextLineID);

        return;
    }

    // console.log(lineID);
    console.log(lines[lineID]);
    const [destStart, sourceStart, mapCount] = curLine.split(/\s+/u).map(Number);
    // console.log(`${destStart}, ${sourceStart}, ${mapCount}`);
    const sourceEnd = sourceStart + mapCount - 1;
    const mapDiff = destStart - sourceStart;

    const overlapLower =
        seedRngLo < sourceStart && seedRngHi >= sourceStart && seedRngHi < sourceEnd;
    console.log(
        `${overlapLower}: ${seedRngLo} < ${sourceStart} && ${seedRngHi}
        >= ${sourceStart} && ${seedRngHi} < ${sourceEnd}`
    );

    const overlapHigher =
        seedRngHi > sourceEnd && seedRngLo <= sourceEnd && seedRngLo > sourceStart;
    console.log(
        `${overlapHigher}: ${seedRngHi} > ${sourceEnd} && ${seedRngLo}
        <= ${sourceEnd} && ${seedRngLo} > ${sourceStart}`
    );

    const overlapComplete = seedRngHi > sourceEnd && seedRngLo < sourceStart;
    console.log(
        `${overlapComplete}: ${seedRngHi} >= ${sourceEnd} && ${seedRngLo} <= ${sourceStart}`
    );

    const overlapInside = seedRngLo >= sourceStart && seedRngHi <= sourceEnd;
    console.log(
        `${overlapInside}: ${seedRngLo} >= ${sourceStart} && ${seedRngHi} <= ${sourceEnd}`
    );
    console.log();

    let trueCount = 0;
    trueCount = overlapLower ? (trueCount += 1) : trueCount;
    trueCount = overlapHigher ? (trueCount += 1) : trueCount;
    trueCount = overlapComplete ? (trueCount += 1) : trueCount;
    trueCount = overlapInside ? (trueCount += 1) : trueCount;

    if (trueCount > 1) {
        throw new Error(`Too many overlaps at line_id ${lineID}`);
    }

    if (trueCount === 1) {
        // console.log("TRRUUUUEEEE");
    }

    /**
     * @type {number[][][]} - An array of 2D arrays of numbers
     */
    const newSeedRanges = [];

    if (overlapInside) {
        // console.log("overlapComplete");
        seedRange[1][0] += mapDiff;
        seedRange[1][1] += mapDiff;
    } else if (overlapComplete) {
        // console.log("overlap complete");

        const lowerLowVal = seedRngLo;
        const higherLowVal = sourceStart - 1;

        const newSeedRngLo = [
            [lowerLowVal, higherLowVal],
            [lowerLowVal, higherLowVal],
        ];

        newSeedRanges.push(newSeedRngLo);

        const middleLowVal = sourceStart;
        const middleHiVal = sourceEnd;

        const middleLowCollect = middleLowVal + mapDiff;
        const middleHiCollect = middleHiVal + mapDiff;

        const newSeedRngMid = [
            [middleLowVal, middleHiVal],
            [middleLowCollect, middleHiCollect],
        ];

        newSeedRanges.push(newSeedRngMid);

        const upperLowVal = sourceEnd + 1;
        const upperHiVal = seedRngHi;

        const newSeedRngHi = [
            [upperLowVal, upperHiVal],
            [upperLowVal, upperHiVal],
        ];

        newSeedRanges.push(newSeedRngHi);
    } else if (overlapLower) {
        console.log("overlapLower");
        const newLoUpperVal = sourceStart - 1;

        const newSeedRngLo = [
            [seedRngLo, newLoUpperVal],
            [seedRngLo, newLoUpperVal],
        ];
        console.log(`${seedRngLo}, ${newLoUpperVal}`);

        newSeedRanges.push(newSeedRngLo);

        const sourceStartDiff = sourceStart + mapDiff;
        const seedRngHiDiff = seedRngHi + mapDiff;

        const newSeedRngHi = [
            [sourceStart, seedRngHi],
            [sourceStartDiff, seedRngHiDiff],
        ];

        console.log(`${sourceStart}, ${seedRngHi}, ${sourceStartDiff}, ${seedRngHiDiff}`);
        newSeedRanges.push(newSeedRngHi);
    } else if (overlapHigher) {
        // console.log("overlapHigher");
        const newHiLowerVal = sourceEnd + 1;

        const newSeedRngHi = [
            [newHiLowerVal, seedRngHi],
            [newHiLowerVal, seedRngHi],
        ];

        console.log(`${newHiLowerVal}, ${seedRngHi}`);
        newSeedRanges.push(newSeedRngHi);

        const sourceEndDiff = sourceEnd + mapDiff;
        const seedRngLoDiff = seedRngLo + mapDiff;

        const newSeedRngLo = [
            [seedRngLo, sourceEnd],
            [seedRngLoDiff, sourceEndDiff],
        ];

        newSeedRanges.push(newSeedRngLo);
        console.log(`${seedRngLo}, ${sourceEnd}, ${seedRngLoDiff}, ${sourceEndDiff}`);
    }

    const newSeedRangesLength = newSeedRanges.length;
    const useNewSeedRanges = newSeedRangesLength > 0;

    // console.log(lastLine);
    if (lastLine) {
        // console.log(lowestLocation);
        // console.log("it's the last line!!!");
        if (useNewSeedRanges) {
            let thisMinimum = -1;

            for (let i = 0; i < newSeedRangesLength; i++) {
                const thisLoValToCollect = newSeedRanges[i][1][0];

                if (thisMinimum === -1 || thisLoValToCollect < thisMinimum) {
                    thisMinimum = thisLoValToCollect;
                }
            }

            if (lowestLocation === -1 || thisMinimum < lowestLocation) {
                lowestLocation = thisMinimum;
            }

            // console.log("should return double");
            return;
        }

        if (lowestLocation === -1 || seedRange[1][0] < lowestLocation) {
            lowestLocation = seedRange[1][0];
            // console.log(seedRange[1][0]);

            // console.log("should return single");
            return;
        }

        return;
    }

    // console.log("no return");
    if (useNewSeedRanges) {
        for (let i = 0; i < newSeedRangesLength; i++) {
            mapSeedRanges(newSeedRanges[i], nextLineID);
        }

        return;
    }

    mapSeedRanges(seedRange, nextLineID);
};

for (let i = 0; i < seedRangesLength; i++) {
    // console.log(i);
    mapSeedRanges(seedRanges[i], 1);
    // console.log(lowestLocation);
}

console.log(lowestLocation);
