// @ts-check

console.time("executionTime");

import fs from "fs";
import readline from "readline";

const gameData = "game_data.txt";
const fileStream = fs.createReadStream(gameData);

const rl = readline.createInterface({
    crlfDelay: Infinity,
    input: fileStream,
});

let totalPower = 0;
let curPower = 0;
let redCubes = 0;
let blueCubes = 0;
let greenCubes = 0;

const colonASCII = 58;
const rASCII = 114;
const gASCII = 103;
const bASCII = 98;
const zeroASCII = 48;
const nineASCII = 57;

rl.on("line", (line) => {
    const bytes = Buffer.from(line);

    let i = 0;

    for (;;) {
        if (bytes[i] === colonASCII) {
            i += 1;
            break;
        }

        i += 1;
    }

    for (i; i < bytes.length; i++) {
        const thisChar = bytes[i];

        if (thisChar >= zeroASCII && thisChar <= nineASCII) {
            curPower = curPower * 10 + (thisChar - zeroASCII);
        } else if (thisChar === rASCII) {
            redCubes = Math.max(redCubes, curPower);
            curPower = 0;
        } else if (thisChar === gASCII) {
            greenCubes = Math.max(greenCubes, curPower);
            curPower = 0;
        } else if (thisChar === bASCII) {
            blueCubes = Math.max(blueCubes, curPower);
            curPower = 0;
        }
    }

    totalPower += redCubes * greenCubes * blueCubes;
    redCubes = 0;
    greenCubes = 0;
    blueCubes = 0;
});

rl.on("close", () => {
    console.log(totalPower);
    console.timeEnd("executionTime");
});
