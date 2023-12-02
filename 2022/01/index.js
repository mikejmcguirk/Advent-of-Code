// @ts-check

import fs from "fs";
import readline from "readline";

/**
 * @return {Promise<{maxElf: number, maxElfCalories: number}>}
 */
const readFile = function () {
    return new Promise((resolve, reject) => {
        const calorieStores = "calorie_stores.txt";
        const fileStream = fs.createReadStream(calorieStores);

        const rl = readline.createInterface({
            crlfDelay: Infinity,
            input: fileStream,
        });

        let curElf = 1;
        let curElfCalories = 0;
        let maxElf = 1;
        let maxElfCalories = 0;

        rl.on("line", (line) => {
            const thisLineValue = parseInt(line);

            if (!isNaN(thisLineValue)) {
                curElfCalories += thisLineValue;

                return;
            }

            if (curElfCalories > maxElfCalories) {
                maxElfCalories = curElfCalories;
                maxElf = curElf;
            }

            const zeroOutElf = 0;
            curElfCalories = zeroOutElf;
            const elfIncrement = 1;
            curElf += elfIncrement;
        });

        rl.on("close", () => {
            console.log("Read complete");
            resolve({ maxElf, maxElfCalories });
        });

        rl.on("error", (err) => {
            reject(err);
        });
    });
};

/**
 * @return {Promise<void>}
 */
const printStartMessage = function () {
    return new Promise((resolve) => {
        console.log("Checking calorie reserves...");
        resolve();
    });
};

Promise.all([readFile(), printStartMessage()])
    .then(([{ maxElf, maxElfCalories }]) => {
        console.log(`Elf ${maxElf} has the most calories with ${maxElfCalories}`);
    })
    .catch((error) => {
        console.error("Error odccurred:", error);
    });
