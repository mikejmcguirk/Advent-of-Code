// @ts-check

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

const partStarts = [];
const validCoordinates = new Set();

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

            let windowSlide = checkCol - 1;

            for (;;) {
                const canMoveLeft = windowSlide >= 0;

                if (!canMoveLeft) {
                    break;
                }

                const leftNeighbor = lines[checkRow].charCodeAt(windowSlide);
                const leftNeighborIsNumber = isASCIIdigit(leftNeighbor);

                if (!leftNeighborIsNumber) {
                    break;
                }

                windowSlide -= 1;
            }

            const startCol = windowSlide + 1;
            const coordToCheck = checkRow * 10000 + startCol;
            const isNewNumber = !validCoordinates.has(coordToCheck);

            if (isNewNumber) {
                validCoordinates.add(coordToCheck);
                partStarts.push([checkRow, startCol]);
            }
        }
    }
}

let totalPartNumber = 0;

for (let i = 0; i < partStarts.length; i++) {
    const curStart = partStarts[i];
    const curRow = curStart[0];
    const curCol = curStart[1];

    const curLine = Buffer.from(lines[curRow]);
    let thisPart = curLine[curCol] - zeroASCII;

    for (let j = curCol + 1; j < curLine.length; j++) {
        const curChar = curLine[j];
        const isNumber = isASCIIdigit(curChar);

        if (!isNumber) {
            break;
        }

        thisPart = thisPart * 10 + (curChar - zeroASCII);
    }

    totalPartNumber += thisPart;
}

console.log(totalPartNumber);
