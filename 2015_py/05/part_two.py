import re

lines = [line.strip() for line in open("puzzle_input.txt")]


def is_nice(word):
    if not re.search(r"(..).*\1", word):
        return False

    if not re.search(r"(.).\1", word):
        return False

    return True


determinations = map(is_nice, lines)
print(sum(determinations))
