using System;
// using System.Collections.Generic;
// using System.Globalization;
using System.IO;
using System.Linq;
using System.Text;
// using System.Text.RegularExpressions;

namespace AdventOfCode {
    public static class PartOne {
        public static void Run(string inputFile) {
            try {
                int finalFloor = File.ReadAllLines(inputFile)
                    .Where(line => !string.IsNullOrWhiteSpace(line))
                    .Select(line => Encoding.ASCII.GetBytes(line).ToList())
                    .Aggregate(0, (acc, line) => {
                        int theseDirections = line
                            .Count(c => c == '(')
                            - line
                            .Count(c => c == ')');

                        return acc + theseDirections;
                    });

                Console.WriteLine($"Final floor: {finalFloor}");
            }
            catch (Exception ex) {
                Console.WriteLine($"Unable to read file: {ex.Message}");
            }
        }
    }
}
