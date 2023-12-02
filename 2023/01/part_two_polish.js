// @ts-check

console.time("executionTime");

import fs from "fs";
import readline from "readline";

const badCalibrations = "bad_calibrations.txt";
const fileStream = fs.createReadStream(badCalibrations);

const rl = readline.createInterface({
    crlfDelay: Infinity,
    input: fileStream,
});

let total = 0;
const digitWords = ["one", "two", "three", "four", "five", "six", "seven", "eight", "nine"];

rl.on("line", (line) => {
    let firstDigit = 0;
    let thisSlice = "";

    for (let i = 0; i < line.length; i++) {
        const thisChar = parseInt(line[i]);
        const tensPlace = 10;

        if (!isNaN(thisChar)) {
            firstDigit = thisChar * tensPlace;
            break;
        }

        thisSlice += line[i];

        for (let j = 0; j < digitWords.length; j++) {
            if (thisSlice.endsWith(digitWords[j])) {
                firstDigit = (j + 1) * tensPlace;
                break;
            }
        }

        if (firstDigit > 0) {
            break;
        }
    }

    thisSlice = "";
    let lastDigit = 0;

    for (let i = line.length - 1; i >= 0; i--) {
        const thisChar = parseInt(line[i]);

        if (!isNaN(thisChar)) {
            lastDigit = thisChar;
            break;
        }

        thisSlice = line[i] + thisSlice;

        for (let j = digitWords.length - 1; j >= 0; j--) {
            if (thisSlice.startsWith(digitWords[j])) {
                lastDigit = j + 1;
                break;
            }
        }

        if (lastDigit > 0) {
            break;
        }
    }

    const thisNumber = firstDigit + lastDigit;
    total += thisNumber;
});

rl.on("close", () => {
    console.log(`Total: ${total}`);
    console.timeEnd("executionTime");
});
