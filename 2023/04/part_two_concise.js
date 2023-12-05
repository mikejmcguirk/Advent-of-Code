// @ts-check

import fs from "fs";

const data = fs.readFileSync("test_data.txt", "utf8");
const lines = data.split(/\r?\s*\n/u).filter((line) => line !== "");
const linesLength = lines.length;

const cards = Array.from({ length: linesLength }, () => 1);

for (let i = 0; i < linesLength; i++) {
    const [cardNum, cardData] = lines[i].split(":");
    const [winnersString, myNumsString] = cardData.split("|");
    const winners = winnersString.trim().split(/\s+/u).map(Number);
    const myNums = myNumsString.trim().split(/\s+/u).map(Number);
    const validNums = myNums.filter((num) => winners.includes(num));

    for (let k = 0; k < validNums.length; k++) {
        cards[i + k + 1] += cards[i];
    }
}

const sumCards = cards.reduce((accumulator, currentValue) => accumulator + currentValue, 0);
console.log(sumCards);
