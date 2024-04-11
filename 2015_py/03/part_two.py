import numpy as np

lines = [line.strip() for line in open("puzzle_input.txt")]

current = [np.array([0, 0]), np.array([0, 0])]  # Santa and Robo-Santa start
seen = set()
seen.add(tuple(np.array([0, 0])))


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


for i in range(len(lines[0])):
    change = np.array(get_move(lines[0][i]))
    which = i % 2
    current[which] += change
    seen.add(tuple(current[which]))

print(len(seen))
