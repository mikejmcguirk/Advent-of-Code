lines = [line.strip() for line in open("puzzle_input.txt")]
lights = [[0 for x in range(1000)] for y in range(1000)]

for line in lines:
    line_parts = line.split()

    start_idx = [int(line_part) for line_part in line_parts[-3].split(",")]
    end_idx = [int(line_part) for line_part in line_parts[-1].split(",")]
    action = line_parts[-4]
    change = 1

    if action == "off":
        change = -1
    elif action == "toggle":
        change = 2

    for i in range(start_idx[0], end_idx[0] + 1):
        for j in range(start_idx[1], end_idx[1] + 1):
            lights[i][j] = max(lights[i][j] + change, 0)

total_brightness = 0

for row in lights:
    total_brightness += sum(row)

print(total_brightness)
