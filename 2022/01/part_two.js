// @ts-check

import fs from "fs";
import readline from "readline";

const calorieStores = "calorie_stores.txt";
const fileStream = fs.createReadStream(calorieStores);

let elfCount = 1;
let thisElfCal = 0;

const rl = readline.createInterface({
    crlfDelay: Infinity,
    input: fileStream,
});

const topThreeElves = new Map();
const elvesNeeded = 3;

rl.on("line", (line) => {
    const thisNum = parseInt(line);

    if (!isNaN(thisNum)) {
        thisElfCal += thisNum;

        return;
    }

    if (elfCount <= elvesNeeded) {
        topThreeElves.set(elfCount, thisElfCal);
    } else {
        const dummyNum = -1;
        let minCals = dummyNum;
        let minKey = dummyNum;

        for (const [key, value] of topThreeElves) {
            if (minCals === dummyNum) {
                minCals = value;
                minKey = key;
            } else if (value < minCals) {
                minCals = value;
                minKey = key;
            }
        }

        if (minCals !== dummyNum && minCals < thisElfCal) {
            topThreeElves.delete(minKey);
            topThreeElves.set(elfCount, thisElfCal);
        }
    }

    const elfIncrement = 1;
    elfCount += elfIncrement;
    const calReset = 0;
    thisElfCal = calReset;
});

rl.on("close", () => {
    if (elfCount > elvesNeeded) {
        const dummyNum = -1;
        let minCals = dummyNum;
        let minKey = dummyNum;

        for (const [key, value] of topThreeElves) {
            if (minCals === dummyNum) {
                minCals = value;
                minKey = key;
            } else if (value < minCals) {
                minCals = value;
                minKey = key;
            }
        }

        if (minCals !== dummyNum && minCals < thisElfCal) {
            topThreeElves.delete(minKey);
            topThreeElves.set(elfCount, thisElfCal);
        }

        const elfIncrement = 1;
        elfCount += elfIncrement;
        const calReset = 0;
        thisElfCal = calReset;
    }

    let totalCals = 0;

    for (const value of topThreeElves.values()) {
        totalCals += value;
    }

    console.log(totalCals);
    console.log(topThreeElves.size);
});

rl.on("error", (err) => {
    console.log(`Error: ${err}`);
});
