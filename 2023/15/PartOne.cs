using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
// using System.Globalization;
using System.Text;

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

            List<string> initSequence = lines[0].Split(',').ToList();
            long totalHash = 0;

            for (int i = 0; i < initSequence.Count; i++)
            {
                List<byte> thisSeq = Encoding.ASCII.GetBytes(initSequence[i]).ToList();

                long thisHash = 0;

                for (int j = 0; j < thisSeq.Count; j++)
                {
                    thisHash += thisSeq[j];
                    thisHash *= 17;
                    thisHash %= 256;
                }

                totalHash += thisHash;
            }

            Console.WriteLine($"Total hash: {totalHash}");
        }
    }
}
