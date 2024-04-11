using System;
using System.Collections.Generic;
// using System.Globalization;
using System.IO;
using System.Linq;

// using System.Text.RegularExpressions;

namespace AdventOfCode
{
    public static class PartOne
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

            long totalWrappingPaper = lines.Aggregate(
                0L,
                (total, line) =>
                {
                    List<int> dimensions = line.Split('x').Select(int.Parse).ToList();

                    int dimensionsCount = dimensions.Count;
                    int thisTotalArea = 0;
                    int smallestDimension = -1;

                    for (int i = 0; i < dimensionsCount - 1; i++)
                    {
                        for (int j = i + 1; j < dimensionsCount; j++)
                        {
                            int thisArea = dimensions[i] * dimensions[j];

                            if (smallestDimension == -1 || thisArea < smallestDimension)
                            {
                                smallestDimension = thisArea;
                            }

                            thisTotalArea += 2 * thisArea;
                        }
                    }

                    return total + thisTotalArea + smallestDimension;
                }
            );

            Console.WriteLine($"Total Wrapping Paper: {totalWrappingPaper}");
        }
    }
}
