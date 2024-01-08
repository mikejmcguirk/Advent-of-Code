using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Text.RegularExpressions;

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

            long validCombos = 0;

            for (int i = 0; i < lines.Count; i++)
            {
                List<string> lineParts = Regex.Split(lines[i], @"\s+").ToList();
                string springMap = '.' + lineParts[0] + '.';
                List<int> goodSprings = lineParts[1].Split(',').Select(int.Parse).ToList();

                int questionMarks = springMap.Count(c => c == '?');
                int qCombos = (int)Math.Pow(2, questionMarks);

                int theseValidCombos = 0;

                for (int j = 0; j < qCombos; j++)
                {
                    string binaryString = Convert.ToString(j, 2).PadLeft(questionMarks, '0');
                    string newChars = binaryString.Replace('0', '.').Replace('1', '#');
                    IEnumerator<char> binaryChars = newChars.GetEnumerator();

                    string newSpringMap = new string(
                        springMap
                            .Select(
                                c => c == '?' && binaryChars.MoveNext() ? binaryChars.Current : c
                            )
                            .ToArray()
                    );

                    bool valid = true;
                    int lastIdx = 0;

                    for (int k = 0; k < goodSprings.Count; k++)
                    {
                        int thisGoodSpring = goodSprings[k];
                        string thisSpring = '.' + new string('#', thisGoodSpring) + '.';

                        if (!newSpringMap.Contains(thisSpring))
                        {
                            valid = false;
                            break;
                        }

                        int idxFound = newSpringMap.IndexOf(
                            thisSpring,
                            System.StringComparison.Ordinal
                        );

                        if (idxFound < lastIdx)
                        {
                            valid = false;
                            break;
                        }

                        lastIdx = idxFound;

                        newSpringMap = newSpringMap
                            .Remove(idxFound, thisSpring.Length)
                            .Insert(idxFound, new string('.', thisSpring.Length));
                    }

                    if (newSpringMap.Any(c => c != '.'))
                    {
                        valid = false;
                    }

                    if (valid)
                    {
                        theseValidCombos++;
                    }
                }

                validCombos += theseValidCombos;
            }

            Console.WriteLine($"Found {validCombos} valid combos");
        }
    }
}
