import numpy as np

lines = [line.strip() for line in open("puzzle_input.txt")]

current = np.array([0, 0])
seen = set()
seen.add(tuple(current))


def get_move(move):
    match move:
        case "^":
            return [0, 1]
        case ">":
            return [1, 0]
        case "v":
            return [0, -1]
        case "<":
            return [-1, 0]
        case _:
            return [0, 0]


for move in lines[0]:
    change = np.array(get_move(move))
    current += change
    seen.add(tuple(current))

print(len(seen))
