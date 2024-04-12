lines = [line.strip() for line in open("puzzle_input.txt")]
lights = [[False for x in range(1000)] for y in range(1000)]

for line in lines:
    line_parts = line.split()

    start_idx = [int(line_part) for line_part in line_parts[-3].split(",")]
    end_idx = [int(line_part) for line_part in line_parts[-1].split(",")]
    action = line_parts[-4]

    for i in range(start_idx[0], end_idx[0] + 1):
        for j in range(start_idx[1], end_idx[1] + 1):
            if action == "off":
                lights[i][j] = False
            elif action == "on":
                lights[i][j] = True
            else:
                lights[i][j] = not lights[i][j]

lights_on = 0

for row in lights:
    lights_on += sum(row)

print(lights_on)
