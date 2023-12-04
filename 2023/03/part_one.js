// @ts-check

console.time("executionTime");

import fs from "fs";

const data = fs.readFileSync("puzzle_input.txt", "utf8");
const lines = data.split(/\r?\n/u);

const zeroASCII = 48;
const nineASCII = 57;
const periodASCII = 46;

const topCheck = function (topCurrentNum, topNumStart, topNumEnd, topLineLength, bottomLine) {
    let adjustedTopNumStart = topNumStart;
    let adjustedTopNumEnd = topNumEnd;

    if (adjustedTopNumStart > 0) {
        adjustedTopNumStart -= 1;
    }

    if (adjustedTopNumEnd < topLineLength - 1) {
        adjustedTopNumEnd += 1;
    }

    for (let k = adjustedTopNumStart; k <= adjustedTopNumEnd; k++) {
        const checkedBottomChar = bottomLine[k];
        const bottomCharIsNum = checkedBottomChar >= zeroASCII && checkedBottomChar <= nineASCII;

        if (!bottomCharIsNum && checkedBottomChar !== periodASCII) {
            return topCurrentNum;
        }
    }

    return 0;
};

const bottomCheck = function (
    botCurNum,
    botNumStart,
    butNumEnd,
    topLineLength,
    topLine,
    bottomLine
) {
    let adjBotNumStart = botNumStart;
    let adjBotNumEnd = butNumEnd;

    if (adjBotNumStart > 0) {
        adjBotNumStart -= 1;
    }

    if (adjBotNumEnd < topLineLength - 1) {
        adjBotNumEnd += 1;
    }

    for (let k = adjBotNumStart; k <= adjBotNumEnd; k++) {
        const checkedTopChar = topLine[k];
        const topCharIsNum = checkedTopChar >= zeroASCII && checkedTopChar <= nineASCII;

        if (!topCharIsNum && checkedTopChar !== periodASCII) {
            return botCurNum;
        }
    }

    const botLeftChar = bottomLine[adjBotNumStart];
    const botLeftCharIsNum = botLeftChar >= zeroASCII && botLeftChar <= nineASCII;
    const botLeftCharIsPeriod = botLeftChar === periodASCII;
    const botLeftIsSymbol = !botLeftCharIsNum && !botLeftCharIsPeriod;

    const botRightChar = bottomLine[adjBotNumEnd];
    const botRightCharIsNum = botRightChar >= zeroASCII && botRightChar <= nineASCII;
    const botRightCharIsPeriod = botRightChar === periodASCII;
    const botRightIsSymbol = !botRightCharIsNum && !botRightCharIsPeriod;

    if (botLeftIsSymbol || botRightIsSymbol) {
        return botCurNum;
    }

    return -1;
};

let total = 0;

const linesLength = lines.length - 1;

let topLine = Buffer.from(lines[0]);
let bottomLine = Buffer.from(lines[1]);

for (let i = 1; i < linesLength; i++) {
    bottomLine = Buffer.from(lines[i]);

    let topCurNum = -1;
    let topNumStart = -1;
    let topNumEnd = -1;

    let botCurNum = -1;
    let botNumStart = -1;
    let botNumEnd = -1;

    const topLineLength = topLine.length;

    for (let j = 0; j < topLineLength; j++) {
        const curTopChar = topLine[j];
        const curBotChar = bottomLine[j];
        // process.stdout.write(`${curBotChar}`);
        const topIsNum = curTopChar >= zeroASCII && curTopChar <= nineASCII;

        if (topIsNum) {
            if (topCurNum === -1) {
                topCurNum = curTopChar - zeroASCII;
                topNumStart = j;
            } else {
                topCurNum = topCurNum * 10 + (curTopChar - zeroASCII);
            }

            if (j === topLineLength - 1) {
                topNumEnd = j;

                total += topCheck(topCurNum, topNumStart, topNumEnd, topLineLength, bottomLine);

                topCurNum = -1;
            }
        } else {
            if (topCurNum > -1) {
                topNumEnd = j - 1;

                total += topCheck(topCurNum, topNumStart, topNumEnd, topLineLength, bottomLine);
            }

            topCurNum = -1;
        }

        const botIsNum = curBotChar >= zeroASCII && curBotChar <= nineASCII;

        if (botIsNum) {
            if (botCurNum === -1) {
                botCurNum = curBotChar - zeroASCII;
                botNumStart = j;
            } else {
                botCurNum = botCurNum * 10 + (curBotChar - zeroASCII);
            }

            if (j === topLineLength - 1) {
                botNumEnd = j;

                const checkedBotNum = bottomCheck(
                    botCurNum,
                    botNumStart,
                    botNumEnd,
                    topLineLength,
                    topLine,
                    bottomLine
                );

                if (checkedBotNum > 0) {
                    total += checkedBotNum;
                }

                if (checkedBotNum > -1) {
                    for (let k = botNumStart; k <= botNumEnd; k++) {
                        bottomLine[k] = periodASCII;
                    }
                }

                botCurNum = -1;
            }
        } else {
            if (botCurNum > -1) {
                botNumEnd = j - 1;

                const checkedBotNum = bottomCheck(
                    botCurNum,
                    botNumStart,
                    botNumEnd,
                    topLineLength,
                    topLine,
                    bottomLine
                );

                if (checkedBotNum > 0) {
                    total += checkedBotNum;
                }

                if (checkedBotNum > -1) {
                    for (let k = botNumStart; k <= botNumEnd; k++) {
                        bottomLine[k] = periodASCII;
                    }
                }
            }

            botCurNum = -1;
        }
    }

    topLine = bottomLine;
}

console.log(total);

console.timeEnd("executionTime");
