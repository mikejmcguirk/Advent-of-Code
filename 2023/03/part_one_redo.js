// @ts-check

console.time("executionTime");

import fs from "fs";

const zeroASCII = 48;
const nineASCII = 57;
const periodASCII = 46;

const isASCIIdigit = function (char) {
    return char >= zeroASCII && char <= nineASCII;
};

const checkWindow = [
    [-1, -1],
    [-1, 0],
    [-1, 1],
    [0, -1],
    [0, 1],
    [1, -1],
    [1, 0],
    [1, 1],
];

let totalPartNumber = 0;

const data = fs.readFileSync("puzzle_input.txt", "utf8");
const lines = data.split(/\r?\n/u);
const linesLength = lines.length - 1;

for (let i = 1; i < linesLength; i++) {
    const curLine = Buffer.from(lines[i]);

    for (let j = 0; j < curLine.length; j++) {
        const curChar = curLine[j];
        const isNumber = isASCIIdigit(curChar);
        const isPeriod = curChar === periodASCII;

        if (isNumber || isPeriod) {
            continue;
        }

        for (let k = 0; k < checkWindow.length; k++) {
            const curCheck = checkWindow[k];
            const checkRow = i + curCheck[0];
            const checkCol = j + curCheck[1];

            const curRowExists = checkRow >= 0 && checkRow < linesLength;
            const curColExists = checkCol >= 0 && checkCol < curLine.length;

            if (!curRowExists || !curColExists) {
                continue;
            }

            const curNeighbor = lines[checkRow].charCodeAt(checkCol);
            const neighborIsNumber = isASCIIdigit(curNeighbor);

            if (!neighborIsNumber) {
                continue;
            }

            let windowSlideStart = checkCol - 1;

            for (;;) {
                const canMoveLeft = windowSlideStart >= 0;

                if (!canMoveLeft) {
                    break;
                }

                const leftNeighbor = lines[checkRow].charCodeAt(windowSlideStart);
                const leftNeighborIsNumber = isASCIIdigit(leftNeighbor);

                if (!leftNeighborIsNumber) {
                    break;
                }

                windowSlideStart -= 1;
            }

            let windowSlideEnd = checkCol + 1;

            for (;;) {
                const canMoveRight = windowSlideEnd >= 0;

                if (!canMoveRight) {
                    break;
                }

                const rightNeighbor = lines[checkRow].charCodeAt(windowSlideEnd);
                const rightNeighborIsNumber = isASCIIdigit(rightNeighbor);

                if (!rightNeighborIsNumber) {
                    break;
                }

                windowSlideEnd += 1;
            }

            const startCol = windowSlideStart + 1;
            const endCol = windowSlideEnd - 1;
            let thisPart = 0;

            for (let l = startCol; l <= endCol; l++) {
                thisPart = thisPart * 10 + (lines[checkRow].charCodeAt(l) - zeroASCII);

                const newPeriod = String.fromCharCode(periodASCII);
                lines[checkRow] =
                    lines[checkRow].slice(0, l) + newPeriod + lines[checkRow].slice(l + 1);
            }

            totalPartNumber += thisPart;
        }
    }
}

console.log(totalPartNumber);

console.timeEnd("executionTime");
