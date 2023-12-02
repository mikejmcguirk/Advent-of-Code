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

let sumValidIDs = 0;

rl.on("line", (line) => {
    const [gameIDslice, game] = line.split(":");
    const draws = game.trim().split(";");

    let validGame = true;
    // console.log(draws.length);

    for (let i = 0; i < draws.length; i++) {
        const cubes = draws[i].split(",");
        // console.log(i);
        // console.log(draws[i]);

        for (let j = 0; j < cubes.length; j++) {
            // console.log(cubes.length);
            // console.log(cubes[j]);
            const [count, color] = cubes[j].trim().split(" ");
            const countNum = parseInt(count);
            // console.log(`Cubes: ${count}, Color: ${color}`);

            if (
                (color === "red" && countNum > 12) ||
                (color === "green" && countNum > 13) ||
                (color === "blue" && countNum > 14)
            ) {
                // console.log("invalid");
                validGame = false;
                break;
            }
        }

        if (!validGame) {
            break;
        }
    }

    if (validGame) {
        const gameIDstr = gameIDslice.match(/\d+$/u);

        if (!gameIDstr) {
            throw new Error("No number found at the end of gameIDstr");
        }

        const gameIDnum = parseInt(gameIDstr[0]);

        if (isNaN(gameIDnum)) {
            throw new Error("Failed to parse number from gameID");
        }

        // console.log(gameIDnum);
        sumValidIDs += gameIDnum;
    }
});

rl.on("close", () => {
    console.log(sumValidIDs);
    console.timeEnd("executionTime");
});
