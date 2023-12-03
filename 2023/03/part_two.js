// @ts-check

import fs from "fs";

const gearASCII = 42;
const zeroASCII = 48;
const nineASCII = 57;

class PartNum {
    constructor(num, startIndex, endIndex) {
        this.num = num;
        this.startIndex = startIndex;
        this.endIndex = endIndex;
    }
}

let totalRatio = 0;

const data = fs.readFileSync("puzzle_input.txt", "utf8");
const lines = data.split(/\r?\n/u);

const extraLine = lines[0].replace(/./gu, ".");
lines.unshift(extraLine);

const linesLength = lines.length - 1;

for (let i = 2; i < linesLength; i++) {
    const topLine = Buffer.from(lines[i - 2]);
    const midLine = Buffer.from(lines[i - 1]);
    const botLine = Buffer.from(lines[i]);

    const thisLineLength = midLine.length;

    for (let j = 0; j < thisLineLength; j++) {
        const potentialGear = midLine[j];

        if (potentialGear !== gearASCII) {
            continue;
        }

        const gearParts = [];
        const leftBound = j - 1;
        const rightBound = j + 1;

        const topParts = [];
        let topCurNum = -1;
        let topNumStart = -1;
        let topNumEnd = -1;

        for (let k = 0; k < midLine.length; k++) {
            const topChar = topLine[k];
            const topCharIsNum = topChar >= zeroASCII && topChar <= nineASCII;

            if (topCharIsNum) {
                if (topCurNum === -1) {
                    topCurNum = topChar - zeroASCII;
                    topNumStart = k;
                } else {
                    topCurNum = topCurNum * 10 + (topChar - zeroASCII);
                }
            }

            const potentialCollect = !topCharIsNum || k === thisLineLength - 1;
            const collectablePartNum = topCurNum > -1;

            if (potentialCollect && collectablePartNum) {
                if (topCharIsNum) {
                    topNumEnd = k;
                } else {
                    topNumEnd = k - 1;
                }

                topParts.push(new PartNum(topCurNum, topNumStart, topNumEnd));

                topCurNum = -1;
            }
        }

        for (let k = 0; k < topParts.length; k++) {
            const startIndex = topParts[k].startIndex;
            const endIndex = topParts[k].endIndex;

            const overLeft =
                startIndex <= leftBound && endIndex >= leftBound && endIndex < rightBound;
            const overRight =
                startIndex <= rightBound && endIndex >= rightBound && startIndex > leftBound;
            const overlap = startIndex <= leftBound && endIndex >= rightBound;

            if (overLeft || overRight || overlap) {
                gearParts.push(topParts[k]);
            }
        }

        if (gearParts.length > 2) {
            continue;
        }

        const midParts = [];
        let midCurNum = -1;
        let midNumStart = -1;
        let midNumEnd = -1;

        for (let k = 0; k < midLine.length; k++) {
            const midChar = midLine[k];
            const midCharIsNum = midChar >= zeroASCII && midChar <= nineASCII;

            if (midCharIsNum) {
                if (midCurNum === -1) {
                    midCurNum = midChar - zeroASCII;
                    midNumStart = k;
                } else {
                    midCurNum = midCurNum * 10 + (midChar - zeroASCII);
                }
            }

            const potentialCollect = !midCharIsNum || k === thisLineLength - 1;
            const collectablePartNum = midCurNum > -1;

            if (potentialCollect && collectablePartNum) {
                if (midCharIsNum) {
                    midNumEnd = k;
                } else {
                    midNumEnd = k - 1;
                }

                midParts.push(new PartNum(midCurNum, midNumStart, midNumEnd));

                midCurNum = -1;
            }
        }

        for (let k = 0; k < midParts.length; k++) {
            const withinLeftBound = midParts[k].endIndex === leftBound;
            const withinRightBound = midParts[k].startIndex === rightBound;

            if (withinLeftBound || withinRightBound) {
                gearParts.push(midParts[k]);
            }
        }

        if (gearParts.length > 2) {
            continue;
        }

        const botParts = [];
        let botCurNum = -1;
        let botNumStart = -1;
        let botNumEnd = -1;

        for (let k = 0; k < botLine.length; k++) {
            const botChar = botLine[k];
            const botCharIsNum = botChar >= zeroASCII && botChar <= nineASCII;

            if (botCharIsNum) {
                if (botCurNum === -1) {
                    botCurNum = botChar - zeroASCII;
                    botNumStart = k;
                } else {
                    botCurNum = botCurNum * 10 + (botChar - zeroASCII);
                }
            }

            const potentialCollect = !botCharIsNum || k === thisLineLength - 1;
            const collectablePartNum = botCurNum > -1;

            if (potentialCollect && collectablePartNum) {
                if (botCharIsNum) {
                    botNumEnd = k;
                } else {
                    botNumEnd = k - 1;
                }

                botParts.push(new PartNum(botCurNum, botNumStart, botNumEnd));

                botCurNum = -1;
            }
        }

        for (let k = 0; k < botParts.length; k++) {
            const startIndex = botParts[k].startIndex;
            const endIndex = botParts[k].endIndex;

            const overLeft =
                startIndex <= leftBound && endIndex >= leftBound && endIndex < rightBound;
            const overRight =
                startIndex <= rightBound && endIndex >= rightBound && startIndex > leftBound;
            const overlap = startIndex <= leftBound && endIndex >= rightBound;

            if (overLeft || overRight || overlap) {
                gearParts.push(botParts[k]);
            }
        }

        if (gearParts.length === 2) {
            let gearRatio = 1;

            for (let k = 0; k < gearParts.length; k++) {
                gearRatio *= gearParts[k].num;
            }

            totalRatio += gearRatio;
        }
    }
}

console.log(totalRatio);
