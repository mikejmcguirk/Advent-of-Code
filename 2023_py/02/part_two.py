import re
from collections import defaultdict
from functools import reduce

lines = [line.strip() for line in open("puzzle_input.txt")]


def check_game(line):
    _, game_info = line.split(":")
    draws = re.split(r"[;,]\s*", game_info.strip())
    min_cubes = defaultdict(int)

    for draw in draws:
        count, color = draw.strip().split(" ")
        int_count = int(count)

        min_cubes[color] = max(min_cubes[color], int_count)

    power = reduce(lambda x, y: x * y, min_cubes.values(), 1)

    return power


powers = [check_game(line) for line in lines]
total_power = sum(powers)
print(total_power)
