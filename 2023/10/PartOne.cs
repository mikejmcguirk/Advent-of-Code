using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;

namespace AdventOfCode {
    public static class PartOne {
        public static void Run(string inputFile) {
            List<List<char>> lines = new();

            try {
                lines = File.ReadAllLines(inputFile)
                    .Where(line => !string.IsNullOrWhiteSpace(line))
                    .Select(line => line.ToList())
                    .ToList();
            }
            catch (Exception ex) {
                Console.WriteLine($"Unable to read file: {ex.Message}");
            }

            int[] curLocation = new int[2];

            for (int i = 0; i < lines.Count; i++) {
                int sLocation = lines[i].IndexOf('S');

                if (sLocation > -1) {
                    curLocation[0] = i;
                    curLocation[1] = sLocation;
                    break;
                }
            }

            int moves = 0;
            Direction lastDirection = Direction.Up;

            while (true) {
                char curChar = lines[curLocation[0]][curLocation[1]];

                if (curChar == 'S' && moves > 0) {
                    break;
                }

                int[] nextLocation = GetNextLocation(curLocation, lines, lastDirection, curChar);

                if (nextLocation[0] > curLocation[0]) {
                    lastDirection = Direction.Down;
                }
                else if (nextLocation[0] < curLocation[0]) {
                    lastDirection = Direction.Up;
                }
                else if (nextLocation[1] > curLocation[1]) {
                    lastDirection = Direction.Right;
                }
                else if (nextLocation[1] < curLocation[1]) {
                    lastDirection = Direction.Left;
                }

                curLocation = nextLocation;

                moves++;
            }

            int furthestFromStart = Convert.ToInt32(Math.Ceiling((double)moves / 2));

            Console.WriteLine($"Furthest from start is {furthestFromStart} steps.");
        }

        private enum Direction {
            Up,
            Down,
            Left,
            Right
        }

        private static int[] GetNextLocation(int[] curLocation,
                List<List<char>> pipeMaze,
                Direction lastDir,
                char curChar) {
            List<Direction> nextDirs = new();

            string nextUpChars = "|LJS";
            string nextDownChars = "|F7S";
            string nextLeftChars = "-J7S";
            string nextRightChars = "-LFS";

            int curRow = curLocation[0];
            int curCol = curLocation[1];

            bool topRow = curRow == 0;
            bool bottomRow = curRow == pipeMaze.Count - 1;
            bool leftCol = curCol == 0;
            bool rightCol = curCol == pipeMaze[curRow].Count - 1;

            if (nextUpChars.Contains(curChar) && lastDir != Direction.Down && !topRow) {
                nextDirs.Add(Direction.Up);
            }

            if (nextDownChars.Contains(curChar) && lastDir != Direction.Up && !bottomRow) {
                nextDirs.Add(Direction.Down);
            }

            if (nextLeftChars.Contains(curChar) && lastDir != Direction.Right && !leftCol) {
                nextDirs.Add(Direction.Left);
            }

            if (nextRightChars.Contains(curChar) && lastDir != Direction.Left && !rightCol) {
                nextDirs.Add(Direction.Right);
            }

            if (nextDirs.Count == 0) {
                throw new InvalidOperationException("Unable to find next direction");
            }

            string upChars = nextDownChars;
            string downChars = nextUpChars;
            string leftChars = nextRightChars;
            string rightChars = nextLeftChars;

            if (nextDirs.Contains(Direction.Up)) {
                char getUp = pipeMaze[curRow - 1][curCol];

                if (upChars.Contains(getUp)) {
                    return new int[] { curRow - 1, curCol };
                }
            }

            if (nextDirs.Contains(Direction.Down)) {
                char getDown = pipeMaze[curRow + 1][curCol];

                if (downChars.Contains(getDown)) {
                    return new int[] { curRow + 1, curCol };
                }
            }

            if (nextDirs.Contains(Direction.Left)) {
                char getLeft = pipeMaze[curRow][curCol - 1];

                if (leftChars.Contains(getLeft)) {
                    return new int[] { curRow, curCol - 1 };
                }
            }

            if (nextDirs.Contains(Direction.Right)) {
                char getRight = pipeMaze[curRow][curCol + 1];

                if (rightChars.Contains(getRight)) {
                    return new int[] { curRow, curCol + 1 };
                }
            }

            throw new InvalidOperationException("Unable to find next location");
        }
    }
}
