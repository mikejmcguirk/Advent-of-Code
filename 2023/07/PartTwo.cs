using System;
using System.Collections.Generic;
using System.Globalization;
using System.IO;
using System.Linq;
using System.Text;
using System.Text.RegularExpressions;

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

            int linesCount = lines.Count;

            List<int> cardCounts = Enumerable.Repeat(0, 13).ToList();
            int possibleCards = cardCounts.Count;

            List<Hand> hands = new();

            for (int i = 0; i < linesCount; i++)
            {
                List<string> lineParts = Regex.Split(lines[i], @"\s+").ToList();
                string thisHandStr = lineParts[0];

                byte[] handBytes = Encoding.ASCII.GetBytes(thisHandStr);
                int handBytesLen = handBytes.Length;

                for (int j = 0; j < possibleCards; j++)
                {
                    cardCounts[j] = 0;
                }

                for (int j = 0; j < handBytesLen; j++)
                {
                    byte card = MapCard(handBytes[j]);

                    handBytes[j] = card;

                    cardCounts[card]++;
                }

                int jokers = cardCounts[0];
                cardCounts[0] = 0;

                cardCounts.Sort((a, b) => b.CompareTo(a));
                cardCounts[0] += jokers;
                byte hand = GetHand(cardCounts);

                int bid = int.Parse(lineParts[1], CultureInfo.InvariantCulture);
                long combinedHand = hand;

                for (int j = 0; j < handBytesLen; j++)
                {
                    combinedHand <<= 8;
                    combinedHand |= handBytes[j];
                }

                Hand thisHand = new(combinedHand, bid);
                hands.Add(thisHand);
            }

            hands.Sort((hand1, hand2) => hand1.val.CompareTo(hand2.val));
            int handsCount = hands.Count;

            int totalWinnings = 0;

            for (int i = 0; i < handsCount; i++)
            {
                int bid = hands[i].bid;
                int multiplier = i + 1;
                int winnings = bid * multiplier;

                totalWinnings += winnings;
            }

            Console.WriteLine("Total winnings: {0}", totalWinnings);
        }

        private static byte MapCard(byte card)
        {
            return card switch
            {
                74 => 0,
                50 => 1,
                51 => 2,
                52 => 3,
                53 => 4,
                54 => 5,
                55 => 6,
                56 => 7,
                57 => 8,
                84 => 9,
                81 => 10,
                75 => 11,
                65 => 12,
                _ => throw new InvalidDataException("Invalid card"),
            };
        }

        private static byte GetHand(List<int> cardCounts)
        {
            if (cardCounts[0] == 5)
            {
                return 6;
            }
            else if (cardCounts[0] == 4)
            {
                return 5;
            }
            else if (cardCounts[0] == 3 && cardCounts[1] == 2)
            {
                return 4;
            }
            else if (cardCounts[0] == 3)
            {
                return 3;
            }
            else if (cardCounts[0] == 2 && cardCounts[1] == 2)
            {
                return 2;
            }
            else if (cardCounts[0] == 2)
            {
                return 1;
            }
            else if (cardCounts[0] == 1)
            {
                return 0;
            }

            throw new ArgumentException("Invalid hand");
        }

        private struct Hand
        {
            public long val;
            public int bid;

            public Hand(long val, int bid)
            {
                this.val = val;
                this.bid = bid;
            }
        }
    }
}
