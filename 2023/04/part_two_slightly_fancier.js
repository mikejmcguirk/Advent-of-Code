// @ts-check

console.time("executionTime");

const zeroASCII = 48;
const nineASCII = 57;
const colonASCII = 58;
const pipeASCII = 124;

const isASCIIdigit = function (char) {
    return char >= zeroASCII && char <= nineASCII;
};

const addDigit = function (origNum, newDigit) {
    let modOrigNum = origNum;

    if (modOrigNum === -1) {
        modOrigNum = 0;
    }

    return modOrigNum * 10 + (newDigit - zeroASCII);
};

let totalCards = 0;

const chances = [];
chances.push(1);

import fs from "fs";
import readline from "readline";
const puzzleData = "puzzle_input.txt";
const fileStream = fs.createReadStream(puzzleData);

const rl = readline.createInterface({
    crlfDelay: Infinity,
    input: fileStream,
});

rl.on("line", (line) => {
    const curLine = Buffer.from(line);

    const winningNumbers = [];

    let i = 0;

    for (;;) {
        if (curLine[i] === colonASCII) {
            i += 1;
            break;
        }

        i += 1;
    }

    let curWinningNum = -1;

    for (;;) {
        const curChar = curLine[i];

        if (curChar === pipeASCII) {
            i += 1;
            break;
        }

        const curIsNumber = isASCIIdigit(curChar);

        if (curIsNumber) {
            curWinningNum = addDigit(curWinningNum, curChar);
        }

        if (!curIsNumber && !(curWinningNum === -1)) {
            if (!winningNumbers.includes(curWinningNum)) {
                winningNumbers.push(curWinningNum);
            }

            curWinningNum = -1;
        }

        i += 1;
    }

    let lineScore = 0;
    let curMyNum = -1;

    for (i; i < curLine.length; i++) {
        const curChar = curLine[i];
        const curIsNumber = isASCIIdigit(curChar);

        if (curIsNumber) {
            curMyNum = addDigit(curMyNum, curChar);
        }

        const needsReset = !curIsNumber && !(curMyNum === -1);

        if (needsReset || i === curLine.length - 1) {
            if (winningNumbers.includes(curMyNum)) {
                lineScore += 1;
            }

            curMyNum = -1;
        }
    }

    if (chances.length > 1) {
        chances[1] += 1;
    } else {
        chances.push(1);
    }

    for (let j = 0; j < lineScore; j++) {
        const chancesToAdd = chances[0];
        const indexToChange = j + 1;

        if (indexToChange < chances.length) {
            chances[indexToChange] += chancesToAdd;
        } else {
            chances.push(chancesToAdd);
        }
    }

    totalCards += chances[0];
    chances.shift();
});

rl.on("close", () => {
    console.log(totalCards);
});

console.timeEnd("executionTime");
