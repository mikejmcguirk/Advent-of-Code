// @ts-check

import fs from "fs";

const zeroASCII = 48;
const nineASCII = 57;
const gearASCII = 42;

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

const gears = [];

const data = fs.readFileSync("puzzle_input.txt", "utf8");
const lines = data.split(/\r?\n/u);
const linesLength = lines.length - 1;

for (let i = 1; i < linesLength; i++) {
    const curLine = Buffer.from(lines[i]);

    for (let j = 0; j < curLine.length; j++) {
        const curChar = curLine[j];
        const isGear = curChar === gearASCII;

        if (!isGear) {
            continue;
        }

        const gearParts = [];
        const validCoordinates = new Set();

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
            const isNewPart = !validCoordinates.has(coordToCheck);

            if (isNewPart) {
                validCoordinates.add(coordToCheck);
                gearParts.push([checkRow, startCol]);
            }
        }

        if (gearParts.length === 2) {
            gears.push(gearParts);
        }
    }
}

let totalGearRatio = 0;

for (let i = 0; i < gears.length; i++) {
    const curGear = gears[i];
    let gearRatio = 1;

    for (let j = 0; j < curGear.length; j++) {
        const gearPart = curGear[j];
        const curRow = gearPart[0];
        const curCol = gearPart[1];

        const curLine = Buffer.from(lines[curRow]);
        let thisNum = curLine[curCol] - zeroASCII;

        for (let k = curCol + 1; k < curLine.length; k++) {
            const curChar = curLine[k];
            const isNumber = isASCIIdigit(curChar);

            if (!isNumber) {
                break;
            }

            thisNum = thisNum * 10 + (curChar - zeroASCII);
        }

        gearRatio *= thisNum;
    }

    totalGearRatio += gearRatio;
}

console.log(totalGearRatio);
