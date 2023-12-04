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
    return origNum * 10 + (newDigit - zeroASCII);
};

import fs from "fs";
import readline from "readline";
const puzzleData = "puzzle_input.txt";
const fileStream = fs.createReadStream(puzzleData);

const rl = readline.createInterface({
    crlfDelay: Infinity,
    input: fileStream,
});

let totalScore = 0;

rl.on("line", (line) => {
    const curLine = Buffer.from(line);

    const winningNumbers = new Set();

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
            if (curWinningNum === -1) {
                curWinningNum = 0;
            }

            curWinningNum = addDigit(curWinningNum, curChar);
        }

        if (!curIsNumber && !(curWinningNum === -1)) {
            if (!winningNumbers.has(curWinningNum)) {
                winningNumbers.add(curWinningNum);
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
            if (curMyNum === -1) {
                curMyNum = 0;
            }

            curMyNum = addDigit(curMyNum, curChar);
        }

        const needsReset = !curIsNumber && !(curMyNum === -1);

        if (needsReset || i === curLine.length - 1) {
            if (winningNumbers.has(curMyNum)) {
                if (lineScore === 0) {
                    lineScore = 1;
                } else {
                    lineScore *= 2;
                }
            }

            curMyNum = -1;
        }
    }

    totalScore += lineScore;
});

rl.on("close", () => {
    console.log(totalScore);
});

console.timeEnd("executionTime");
