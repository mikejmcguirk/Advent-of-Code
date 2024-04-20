logical = 0
physical = 0

for line in open("puzzle_input.txt"):
    stripped = line.strip()
    logical += len(stripped)

    chars = 0

    for c in stripped:
        if c == '"' or c == "\\":
            chars += 1

        chars += 1

    physical += chars + 2

print(physical - logical)
