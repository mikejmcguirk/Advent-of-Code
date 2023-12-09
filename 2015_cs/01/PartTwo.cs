using System;
// using System.Collections.Generic;
// using System.Globalization;
using System.IO;
using System.Linq;
using System.Text;
// using System.Text.RegularExpressions;

namespace AdventOfCode {
    public static class PartTwo {
        public static void Run(string inputFile) {
            try {
                int firstBasementPosition = File.ReadAllLines(inputFile)
                    .Where(line => !string.IsNullOrWhiteSpace(line))
                    .Aggregate(0, (acc, line) => {
                        int firstBasementEntrance = 0;
                        int thisAcc = 0;

                        for (int i = 0; i < line.Length; i++) {
                            char thisChar = line[i];

                            if (thisChar == '(') {
                                thisAcc++;
                            }
                            else if (thisChar == ')') {
                                thisAcc--;
                            }

                            if (thisAcc == -1) {
                                firstBasementEntrance = i + 1;
                                break;
                            }
                        }

                        return acc + firstBasementEntrance;
                    });

                Console.WriteLine($"Basement Position: {firstBasementPosition}");
            }
            catch (Exception ex) {
                Console.WriteLine($"Unable to read file: {ex.Message}");
            }
        }
    }
}
