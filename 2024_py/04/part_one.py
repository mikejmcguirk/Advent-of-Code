lines = [line.strip() for line in open("puzzle_input.txt")]

total = 0

for line in lines:
    for i in range(len(line) - 3):
        window = line[i : i + 4]
        if window in ("XMAS", "SAMX"):
            total += 1

vertical = sum(
    1
    for row in range(3, len(lines))
    for col in range(len(lines[row]))
    if (
        (
            lines[row][col] == "S"
            and lines[row - 1][col] == "A"
            and lines[row - 2][col] == "M"
            and lines[row - 3][col] == "X"
        )
        or (
            lines[row][col] == "X"
            and lines[row - 1][col] == "M"
            and lines[row - 2][col] == "A"
            and lines[row - 3][col] == "S"
        )
    )
)
total += vertical

forward_slash = sum(
    1
    for row in range(3, len(lines))
    for col in range(3, len(lines[row]))
    if (
        (
            lines[row][col] == "S"
            and lines[row - 1][col - 1] == "A"
            and lines[row - 2][col - 2] == "M"
            and lines[row - 3][col - 3] == "X"
        )
        or (
            lines[row][col] == "X"
            and lines[row - 1][col - 1] == "M"
            and lines[row - 2][col - 2] == "A"
            and lines[row - 3][col - 3] == "S"
        )
    )
)
total += forward_slash

forward_slash = sum(
    1
    for row in range(3, len(lines))
    for col in range(len(lines[row]) - 3)
    if (
        (
            lines[row][col] == "S"
            and lines[row - 1][col + 1] == "A"
            and lines[row - 2][col + 2] == "M"
            and lines[row - 3][col + 3] == "X"
        )
        or (
            lines[row][col] == "X"
            and lines[row - 1][col + 1] == "M"
            and lines[row - 2][col + 2] == "A"
            and lines[row - 3][col + 3] == "S"
        )
    )
)
total += forward_slash

print(total)
