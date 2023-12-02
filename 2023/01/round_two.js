// @ts-check

console.time("executionTime");

import fs from "fs";
import readline from "readline";

// 21-30
const badCalibrations = "bad_calibrations.txt";
const fileStream = fs.createReadStream(badCalibrations);

const rl = readline.createInterface({
    crlfDelay: Infinity,
    input: fileStream,
});

let total = 0;
const strDigits = ["one", "two", "three", "four", "five", "six", "seven", "eight", "nine"];

rl.on("line", (line) => {
    let firstDigit = 0;
    let strCheck = "";
    const offset = 1;

    for (let i = 0; i < line.length; i++) {
        const thisChar = parseInt(line[i]);
        const tensPlace = 10;

        if (!isNaN(thisChar)) {
            firstDigit = thisChar * tensPlace;
            break;
        }

        strCheck += line[i];
        // console.log(strCheck);
        let couldBeValidDigit = false;
        let strDigitFound = false;

        while (strCheck.length > 0) {
            for (let j = 0; j < strDigits.length; j++) {
                const thisDigit = strDigits[j];

                if (strCheck === thisDigit) {
                    firstDigit = (j + offset) * 10;
                    strDigitFound = true;
                    break;
                }

                if (thisDigit.startsWith(strCheck)) {
                    couldBeValidDigit = true;
                }
            }

            if (strDigitFound || couldBeValidDigit) {
                break;
            }

            strCheck = strCheck.slice(1);
        }

        if (strDigitFound) {
            break;
        }
    }

    let lastDigit = 0;
    const lineEnd = 0;
    strCheck = "";

    for (let i = line.length - offset; i >= lineEnd; i--) {
        const thisChar = parseInt(line[i]);

        if (!isNaN(thisChar)) {
            lastDigit = thisChar;
            break;
        }

        strCheck = line[i] + strCheck;
        let couldBeValidDigit = false;
        let strDigitFound = false;

        while (strCheck.length > 0) {
            // console.log(strCheck);

            for (let j = 0; j < strDigits.length; j++) {
                const thisDigit = strDigits[j];

                if (strCheck === thisDigit) {
                    // console.log("found");
                    lastDigit = j + offset;
                    strDigitFound = true;
                    break;
                }

                if (thisDigit.endsWith(strCheck)) {
                    couldBeValidDigit = true;
                }
            }

            if (strDigitFound || couldBeValidDigit) {
                break;
            }

            strCheck = strCheck.slice(0, -1);
        }

        if (strDigitFound) {
            break;
        }
    }

    const thisNumber = firstDigit + lastDigit;
    // console.log(thisNumber);
    total += thisNumber;
});

rl.on("close", () => {
    console.log(`Total: ${total}`);
    console.timeEnd("executionTime");
});
