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
        return card - zeroASCII - 1;
    } else if (card === tenASCII) {
        return 9;
    } else if (card === jackASCII) {
        return 10;
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
    let sumCounts = 0;

    while (workingCardCounts > 0) {
        const thisDigit = workingCardCounts % 10;
        workingCardCounts = Math.floor(workingCardCounts / 10);

        if (thisDigit === 5) {
            return fiveOfAKind;
        }

        if (thisDigit === 0) {
            continue;
        }
        sumCounts += 10 ** thisDigit;
    }

    if (sumCounts === 50) {
        return highCard;
    } else if (sumCounts === 130) {
        return pair;
    } else if (sumCounts === 210) {
        return twoPair;
    } else if (sumCounts === 1020) {
        return threeOfAKind;
    } else if (sumCounts === 1100) {
        return fullHouse;
    } else if (sumCounts === 10010) {
        return fourOfAKind;
    }

    const errString = `Invalid hand: ${sumCounts}`;
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
