lines = [line.strip() for line in open("puzzle_input.txt")]

total = 0

forward_forward = sum(
    1
    for row in range(2, len(lines))
    for col in range(2, len(lines[row]))
    if (
        (
            lines[row][col] == "S"
            and lines[row - 1][col - 1] == "A"
            and lines[row - 2][col - 2] == "M"
        )
        and (
            lines[row][col - 2] == "S"
            and lines[row - 1][col - 1] == "A"
            and lines[row - 2][col] == "M"
        )
    )
)
total += forward_forward

forward_backward = sum(
    1
    for row in range(2, len(lines))
    for col in range(2, len(lines[row]))
    if (
        (
            lines[row][col] == "S"
            and lines[row - 1][col - 1] == "A"
            and lines[row - 2][col - 2] == "M"
        )
        and (
            lines[row][col - 2] == "M"
            and lines[row - 1][col - 1] == "A"
            and lines[row - 2][col] == "S"
        )
    )
)
total += forward_backward

backward_backward = sum(
    1
    for row in range(2, len(lines))
    for col in range(2, len(lines[row]))
    if (
        (
            lines[row][col] == "M"
            and lines[row - 1][col - 1] == "A"
            and lines[row - 2][col - 2] == "S"
        )
        and (
            lines[row][col - 2] == "M"
            and lines[row - 1][col - 1] == "A"
            and lines[row - 2][col] == "S"
        )
    )
)
total += backward_backward

backward_forward = sum(
    1
    for row in range(2, len(lines))
    for col in range(2, len(lines[row]))
    if (
        (
            lines[row][col] == "M"
            and lines[row - 1][col - 1] == "A"
            and lines[row - 2][col - 2] == "S"
        )
        and (
            lines[row][col - 2] == "S"
            and lines[row - 1][col - 1] == "A"
            and lines[row - 2][col] == "M"
        )
    )
)
total += backward_forward

print(total)
