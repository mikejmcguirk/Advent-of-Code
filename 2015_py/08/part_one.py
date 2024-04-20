physical = 0
logical = 0

for line in open("puzzle_input.txt"):
    stripped = line.strip()
    physical += len(stripped)

    escaping = False
    chars = 0
    idx = 1

    while idx < len(stripped) - 1:
        if not escaping and stripped[idx] != "\\":
            chars += 1
        elif not escaping and stripped[idx] == "\\":
            escaping = True
        elif escaping and stripped[idx] != "x":
            chars += 1
            escaping = False
        else:
            idx += 2
            chars += 1
            escaping = False

        idx += 1

    logical += chars

print(physical - logical)
