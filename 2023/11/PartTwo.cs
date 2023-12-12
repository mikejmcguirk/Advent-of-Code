using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;

namespace AdventOfCode {
    public static class PartTwo {
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

            List<int> emptyRows = lines
                .Select((line, index) => (line, index))
                .Where(t => t.line.All(c => c == '.'))
                .Select(t => t.index)
                .ToList();

            List<int> emptyCols = Enumerable.Range(0, lines[0].Count)
                .Where(colIndex => lines.All(line => line[colIndex] != '#'))
                .ToList();

            List<(int, int)> galaxies = lines
                .SelectMany((line, i) => line
                    .Select((thisChar, j) => (thisChar, i, j))
                    .Where(t => t.thisChar == '#')
                    .Select(t => (t.i, t.j)))
                .ToList();

            long totDistance = galaxies
                .SelectMany((startGal, i) => galaxies.Skip(i + 1)
                    .Select(endGal => {
                        int startRow = startGal.Item1;
                        int startCol = startGal.Item2;
                        int endRow = endGal.Item1;
                        int endCol = endGal.Item2;

                        int minRow = Math.Min(endRow, startRow);
                        int maxRow = Math.Max(endRow, startRow);
                        int minCol = Math.Min(endCol, startCol);
                        int maxCol = Math.Max(endCol, startCol);

                        int rowCrosses = emptyRows.Count(cur => cur > minRow && cur < maxRow);
                        int colCrosses = emptyCols.Count(cur => cur > minCol && cur < maxCol);

                        long expansionFactor = 1000000;

                        long rowExpansion = rowCrosses * (expansionFactor - 1);
                        long colExpansion = colCrosses * (expansionFactor - 1);

                        long rowDistance = Math.Abs(endRow - startRow) + rowExpansion;
                        long colDistance = Math.Abs(endCol - startCol) + colExpansion;

                        return rowDistance + colDistance;
                    }))
                .Sum();

            Console.WriteLine($"Total distance: {totDistance}");
        }
    }
}
