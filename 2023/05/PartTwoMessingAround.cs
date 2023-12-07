using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Text.RegularExpressions;
/*
 * My first attempt at writing this in Javascript failed because its number type could not
 * contain the large numbers in the puzzle input
 *
 * C# is an underrated language. The list object is a thing of beauty
 */

namespace PartTwo
{
    public class Program
    {
        public static void Main()
        {
            string input = "puzzle_input.txt";
            List<string> lines = new();

            try
            {
                lines = File.ReadAllLines(input)
                    .Where(line => !string.IsNullOrWhiteSpace(line))
                    .ToList();
            }
            catch (FileNotFoundException)
            {
                Console.WriteLine("File not found: {0}", input);
                return;
            }

            string[] getSeeds = lines[0].Split(":");
            List<long> seeds = new();
            seeds = Regex.Split(getSeeds[1], @"\s+")
                .Where(s => !string.IsNullOrWhiteSpace(s))
                .Select(long.Parse)
                .ToList();

            List<List<long>> allTheSeeds = Regex.Split(getSeeds[1], @"\s+")
                .Where(s => !string.IsNullOrWhiteSpace(s))
                .Select(long.Parse)
                .Select((seed, index) => new { Value = seed, Index = index })
                .Where(seed => seed.Index % 2 == 1)
                .Select(seed => new List<long> {
                        seeds[seed.Index], seeds[seed.Index] + seeds[seed.Index - 1] - 1
                        })
                .ToList();

            long lowestLocation = -1;

            for (int i = 1; i < seeds.Count; i += 2)
            {
                long seedLbound = seeds[i - 1];
                long seedUbound = seedLbound + seeds[i] - 1;
                List<long> range = new() { seedLbound, seedUbound };
                List<List<long>> allSeeds = new() { range };

                long thisLowestLocation = GetTotal(allSeeds, lines);

                if (lowestLocation == -1 || thisLowestLocation < lowestLocation)
                {
                    lowestLocation = thisLowestLocation;
                }
            }

            Console.WriteLine("Lowest location: {0}", lowestLocation);
        }

        private static long GetTotal(List<List<long>> allSeeds, List<string> lines)
        {
            List<List<long>> theseSeeds = new();
            theseSeeds = allSeeds.Select(innerList => innerList.ToList()).ToList();

            void restoreAbs()
            {
                for (int j = 0; j < theseSeeds.Count; j++)
                {
                    for (int k = 0; k < theseSeeds[j].Count; k++)
                    {
                        theseSeeds[j][k] = Math.Abs(theseSeeds[j][k]);
                    }
                }
            }

            for (int i = 1; i < lines.Count; i++)
            {
                string thisLine = lines[i];

                if (Regex.IsMatch(thisLine, @"\bmap\b", RegexOptions.IgnoreCase))
                {
                    restoreAbs();
                    continue;
                }

                List<long> thisMap = new();
                thisMap = Regex.Split(thisLine, @"\s+")
                    .Where(s => !string.IsNullOrWhiteSpace(s))
                    .Select(long.Parse)
                    .ToList();

                long mapLbound = thisMap[1];
                long mapUbound = mapLbound + thisMap[2] - 1;

                List<List<long>> newSeeds = new();

                foreach (List<long> seed in theseSeeds)
                {
                    long seedLbound = seed[0];
                    long seedUbound = seed[1];

                    bool seedLnegative = seedLbound < 0;
                    bool seedUnegative = seedUbound < 0;
                    bool singleNegative = seedLnegative ^ seedUnegative;
                    bool doubleNegative = seedLnegative && seedUnegative;

                    if (singleNegative)
                    {
                        throw new InvalidOperationException(
                            "Mismatch in range: Only one negative number in the range."
                        );
                    }

                    if (doubleNegative)
                    {
                        newSeeds.Add(new List<long> { seedLbound, seedUbound });
                        continue;
                    }

                    long intersectionLbound = Math.Max(mapLbound, seedLbound);
                    long intersectionUbound = Math.Min(mapUbound, seedUbound);

                    if (intersectionLbound <= intersectionUbound)
                    {
                        long incrementor = thisMap[0] - mapLbound;
                        long adjustedLbound = -(intersectionLbound + incrementor);
                        long adjustedUbound = -(intersectionUbound + incrementor);
                        newSeeds.Add(new List<long> { adjustedLbound, adjustedUbound });

                        if (seedLbound < intersectionLbound)
                        {
                            newSeeds.Add(new List<long> { seedLbound, intersectionLbound - 1 });
                        }

                        if (seedUbound > intersectionUbound)
                        {
                            newSeeds.Add(new List<long> { intersectionUbound + 1, seedUbound });
                        }
                    }
                    else
                    {
                        newSeeds.Add(new List<long> { seedLbound, seedUbound });
                    }
                }

                theseSeeds = newSeeds;
            }

            restoreAbs();

            long lowestLocation = theseSeeds
                .Where(seed => seed.Count > 0)
                .Min(seed => seed[0]);

            return lowestLocation;
        }
    }
}
