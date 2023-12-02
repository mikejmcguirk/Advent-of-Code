// @ts-check

import fs from "fs";
import readline from "readline";

const badCalibrations = "bad_calibrations.txt";
const fileStream = fs.createReadStream(badCalibrations);

const rl = readline.createInterface({
    crlfDelay: Infinity,
    input: fileStream,
});

let total = 0;

rl.on("line", (line) => {
    let firstDigit = 0;

    for (let i = 0; i < line.length; i++) {
        const thisChar = parseInt(line[i]);

        if (!isNaN(thisChar)) {
            const tensPlace = 10;
            firstDigit = thisChar * tensPlace;
            break;
        }
    }

    let lastDigit = 0;
    const lineOffset = 1;
    const lineEnd = 0;

    for (let i = line.length - lineOffset; i >= lineEnd; i--) {
        const thisChar = parseInt(line[i]);

        if (!isNaN(thisChar)) {
            lastDigit = thisChar;
            break;
        }
    }

    const thisNumber = firstDigit + lastDigit;
    total += thisNumber;
});

rl.on("close", () => {
    console.log(`Total: ${total}`);
});
