import re

lines = [line.strip() for line in open("puzzle_input.txt")]


def get_score(line):
    _, numbers = line.split(":")
    winning_nums, my_nums = numbers.strip().split("|")
    winning_set = set(re.split(" +", winning_nums.strip()))
    my_set = set(re.split(" +", my_nums.strip()))

    return len(winning_set.intersection(my_set))


def traverse_cards(cur_line, total_lines, lines):
    if cur_line >= total_lines:
        return 0

    new_cards = get_score(lines[cur_line])
    additional_points = traverse_cards(cur_line + 1, cur_line + new_cards + 1, lines)
    these_points = 1 + traverse_cards(cur_line + 1, total_lines, lines)

    return additional_points + these_points


total_lines = len(lines)
total_cards = traverse_cards(0, total_lines, lines)
print(total_cards)
