import itertools

input = [line.strip() for line in open("puzzle_input.txt")][0]

for _ in range(50):
    out = ""

    for num, count in itertools.groupby(input):
        # Doing these assignments separately is actually faster than
        # out = out + str(len(list(count))) + str(num)
        out = out + str(len(list(count)))
        out = out + str(num)

    input = out

print(len(input))
