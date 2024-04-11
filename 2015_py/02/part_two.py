import math as m

lines = [line.strip() for line in open("puzzle_input.txt")]


def calc_ribbon(line):
    dimensions = [int(dimension) for dimension in line.split("x")]
    dimensions.sort()

    return dimensions[0] * 2 + dimensions[1] * 2 + m.prod(dimensions)


gifts = map(calc_ribbon, lines)
print(sum(gifts))
