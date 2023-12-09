using System;
using System.Collections.Generic;
using System.Globalization;
using System.IO;
using System.Linq;
using System.Text.RegularExpressions;

namespace PartTwo {
    public class Program {
        public static void Main() {
            string input = "puzzle_input.txt";

            try {
                long totalNewNumbers = File.ReadAllLines(input)
                    .Where(line => !string.IsNullOrWhiteSpace(line))
                    .Aggregate(0L, (total, line) => {
                        List<long> lineParts = Regex.Split(line, @"\s+")
                            .Select(s => long.Parse(s.Trim(), CultureInfo.InvariantCulture))
                            .ToList();

                        long newFirstNumber = lineParts[0] - GetDiff(lineParts); // Part Two
                        // long newFirstNumber = lineParts[^1] + GetDiff(lineParts); // Part One

                        return total + newFirstNumber;
                    });

                Console.WriteLine("Total new numbers: {0}", totalNewNumbers);
            }
            catch (FileNotFoundException) {
                Console.WriteLine("File not found: {0}", input);
                return;
            }
        }

        private static long GetDiff(List<long> numbers) {
            if (numbers.All(num => num == 0)) {
                return 0;
            }

            List<long> diffs = numbers.Zip(numbers.Skip(1), (a, b) => b - a).ToList();

            return diffs[0] - GetDiff(diffs); //Part Two
            // return diffs[^1] + GetDiff(diffs); // Part One
        }

    }
}
