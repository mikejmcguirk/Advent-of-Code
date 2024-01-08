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
        }
    }
}
