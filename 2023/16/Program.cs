using System;

namespace AdventOfCode {
    public class Program {
        public static void Main() {
            string testData = "test_data.txt";
            string puzzleInput = "puzzle_input.txt";
            string inputFile = testData;

            Console.WriteLine();
            Console.WriteLine("========");
            Console.WriteLine("Part One");
            Console.WriteLine("========");
            Console.WriteLine();

            PartOne.Run(inputFile);

            Console.WriteLine();
            Console.WriteLine("========");
            Console.WriteLine("Part Two");
            Console.WriteLine("========");
            Console.WriteLine();

            PartTwo.Run(inputFile);

            Console.WriteLine();
        }
    }
}
