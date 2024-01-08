lines = [line.strip() for line in open("puzzle_input.txt")]


def get_calibration(line):
    start_num = 0

    for char in line:
        if char.isdigit():
            start_num = int(char)
            break

    end_num = 0

    for i in range(len(line) - 1, -1, -1):
        this_char = line[i]

        if this_char.isdigit():
            end_num = int(this_char)
            break

    return (start_num * 10) + end_num


calibrations = [get_calibration(line) for line in lines]
total = sum(calibrations)
print(total)
