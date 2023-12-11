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

            for (int i = 0; i < lines.Count; i++) {
                List<char> curLine = lines[i];

                bool emptyLine = curLine.All(c => c == '.');

                if (emptyLine) {
                    lines.Insert(i, Enumerable.Repeat('.', curLine.Count).ToList());

                    i++;
                }
            }

            for (int i = 0; i < lines[0].Count; i++) {
                int thisColGal = lines.Aggregate(0, (acc, cur) => cur[i] == '#' ? acc + 1 : acc);

                if (thisColGal == 0) {
                    for (int j = 0; j < lines.Count; j++) {
                        lines[j].Insert(i, '.');
                    }

                    i++;
                }
            }

            List<(int, int)> galaxies = lines
                .SelectMany((line, i) => line
                    .Select((thisChar, j) => (thisChar, i, j))
                    .Where(t => t.thisChar == '#')
                    .Select(t => (t.i, t.j)))
                .ToList();

            int totDistance = galaxies
                .SelectMany((startGal, i) => galaxies.Skip(i + 1)
                .Select(endGal => Math.Abs(endGal.Item1 - startGal.Item1)
                    + Math.Abs(endGal.Item2 - startGal.Item2)))
                .Sum();

            Console.WriteLine($"Total distance: {totDistance}");
        }
    }
}
