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

const colorIndices = {
    red: 0,
    green: 1,
    blue: 2,
};

const minColors = [0, 0, 0];

let totalPower = 0;

rl.on("line", (line) => {
    const cleanLine = line.replace(/^Game \d+:\s*/u, "");
    const draws = cleanLine.trim().split(";");

    for (let i = 0; i < draws.length; i++) {
        const cubes = draws[i].split(",");

        for (let j = 0; j < cubes.length; j++) {
            const [count, color] = cubes[j].trim().split(" ");
            const countNum = parseInt(count);

            const thisIndex = colorIndices[color];

            if (minColors[thisIndex] < countNum) {
                minColors[thisIndex] = countNum;
            }
        }
    }

    let thisPower = 0;
    // console.log(`red: ${minColors[0]}, green: ${minColors[1]}, blue: ${minColors[2]}`);
    thisPower += minColors[0] * minColors[1] * minColors[2];
    totalPower += thisPower;

    for (let i = 0; i < minColors.length; i++) {
        minColors[i] = 0;
    }
});

rl.on("close", () => {
    console.log(totalPower);
    console.timeEnd("executionTime");
});
