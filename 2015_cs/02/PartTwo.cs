using System;
using System.Collections.Generic;
// using System.Globalization;
using System.IO;
using System.Linq;

// using System.Text.RegularExpressions;

namespace AdventOfCode
{
    public static class PartTwo
    {
        public static void Run(string inputFile)
        {
            List<string> lines = new();

            try
            {
                lines = File.ReadAllLines(inputFile)
                    .Where(line => !string.IsNullOrWhiteSpace(line))
                    .ToList();
            }
            catch (Exception ex)
            {
                Console.WriteLine($"Unable to read file: {ex.Message}");
            }

            long totRibbon = lines.Aggregate(
                0L,
                (total, line) =>
                {
                    List<int> dimensions = line.Split('x').Select(int.Parse).ToList();

                    int smallestDimension = dimensions.Min();
                    int smallestDimensionIdx = dimensions.IndexOf(smallestDimension);
                    int secondSmallest = dimensions
                        .Where((dimension, idx) => idx != smallestDimensionIdx)
                        .Min();

                    int ribbonAround = (2 * smallestDimension) + (2 * secondSmallest);

                    int totForBow = dimensions.Aggregate(
                        1,
                        (total, dimension) => total * dimension
                    );

                    return total + ribbonAround + totForBow;
                }
            );

            Console.WriteLine($"Total Wrapping Paper: {totRibbon}");
        }
    }
}
