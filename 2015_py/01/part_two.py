lines = [line.strip() for line in open("puzzle_input.txt")]
floor = 0

for c in range(len(lines[0])):
    if lines[0][c] == "(":
        floor += 1
    else:
        floor -= 1

    if floor == -1:
        print(c + 1)
        break
