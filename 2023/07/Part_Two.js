// @ts-check

import fs from "fs";

const data = fs.readFileSync("puzzle_input.txt", "utf8");
const lines = data.split(/\r?\s*\n/u).filter((line) => line !== "");
const linesLength = lines.length;

const zeroASCII = 48;
const deuceASCII = 50;
const nineASCII = 57;
const tenASCII = 84;
const jackASCII = 74;
const queenASCII = 81;
const kingASCII = 75;
const aceASCII = 65;

const spaceASCII = 32;

/**
 * @param {number} card
 */
const parseCard = function (card) {
    if (card >= deuceASCII && card <= nineASCII) {
        return card - zeroASCII;
    } else if (card === tenASCII) {
        return 10;
    } else if (card === jackASCII) {
        return 1;
    } else if (card === queenASCII) {
        return 11;
    } else if (card === kingASCII) {
        return 12;
    } else if (card === aceASCII) {
        return 13;
    }

    throw new Error("Invalid card");
};

const fiveOfAKind = zeroASCII + 6;
const fourOfAKind = zeroASCII + 5;
const fullHouse = zeroASCII + 4;
const threeOfAKind = zeroASCII + 3;
const twoPair = zeroASCII + 2;
const pair = zeroASCII + 1;
const highCard = zeroASCII;

/**
 * @param {number} cardCounts
 */
const getHand = function (cardCounts) {
    let workingCardCounts = cardCounts;

    workingCardCounts = Math.floor(workingCardCounts / 10);
    let countJacks = workingCardCounts % 10;
    workingCardCounts = Math.floor(workingCardCounts / 10);

    if (workingCardCounts === 0) {
        return fiveOfAKind;
    }

    const comboCounts = new Array(5).fill(0);

    while (workingCardCounts > 0) {
        const thisDigit = workingCardCounts % 10;
        workingCardCounts = Math.floor(workingCardCounts / 10);

        if (thisDigit === 5) {
            return fiveOfAKind;
        }

        if (thisDigit === 0) {
            continue;
        }

        const thisIndex = thisDigit - 1;
        comboCounts[thisIndex] += 1;
    }

    let highestCount = comboCounts.reduce(
        (maxIdxWithVal, curVal, curIdx, array) => (curVal > 0 ? curIdx : maxIdxWithVal),
        0
    );

    while (countJacks > 0) {
        comboCounts[highestCount + 1] += 1;
        comboCounts[highestCount] -= 1;
        highestCount += 1;
        countJacks -= 1;
    }

    if (comboCounts[4] === 1) {
        return fiveOfAKind;
    } else if (comboCounts[3] === 1) {
        return fourOfAKind;
    } else if (comboCounts[2] === 1 && comboCounts[1] === 1) {
        return fullHouse;
    } else if (comboCounts[2] === 1 && comboCounts[0] === 2) {
        return threeOfAKind;
    } else if (comboCounts[1] === 2) {
        return twoPair;
    } else if (comboCounts[1] === 1) {
        return pair;
    } else if (comboCounts[0] === 5) {
        return highCard;
    }

    const errString = `Invalid hand: ${comboCounts}`;
    throw new Error(errString);
};

const cleanedLines = [];

for (let i = 0; i < linesLength; i++) {
    const curLine = Buffer.from(lines[i]);
    const curLineLength = curLine.length;

    const cleanedLine = [];

    let cardCounts = 0;
    let j = 0;

    for (;;) {
        const thisCard = curLine[j];

        if (thisCard === spaceASCII) {
            j += 1;

            break;
        }

        const parsedCard = parseCard(thisCard);
        cleanedLine.push(parsedCard + 33);
        cardCounts += 10 ** parsedCard;

        j += 1;
    }

    const hand = getHand(cardCounts);
    cleanedLine.unshift(hand);

    for (j; j < curLineLength; j++) {
        cleanedLine.push(curLine[j]);
    }

    const cleanedString = cleanedLine.map((charCode) => String.fromCharCode(charCode)).join("");
    cleanedLines.push(cleanedString);
}

cleanedLines.sort();

let totalWinnings = 0;

for (let i = 0; i < linesLength; i++) {
    const curLine = Buffer.from(cleanedLines[i]);
    const curLineLength = curLine.length;

    let bid = 0;

    for (let j = 6; j < curLineLength; j++) {
        const thisNum = curLine[j];

        bid = bid * 10 + (thisNum - zeroASCII);
    }

    const rank = i + 1;

    const theseWinnings = bid * rank;
    totalWinnings += theseWinnings;
}

console.log(totalWinnings);
