lines = [line.strip() for line in open("puzzle_input.txt")]


def calc_paper(line):
    dimensions = [int(dimension) for dimension in line.split("x")]
    surfaces = [0] * 3

    for i in range(len(dimensions) - 1):
        for j in range(i + 1, len(dimensions)):
            surfaces[i + j - 1] = dimensions[i] * dimensions[j]

    paper = sum(surfaces) * 2 + min(surfaces)

    return paper


gifts = map(calc_paper, lines)
print(sum(gifts))
