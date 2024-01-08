lines = [line.strip() for line in open("puzzle_input.txt")]

num_words = {
    "zero": 0,
    "one": 1,
    "two": 2,
    "three": 3,
    "four": 4,
    "five": 5,
    "six": 6,
    "seven": 7,
    "eight": 8,
    "nine": 9,
}


def get_calibration(line):
    start_num = 0

    for i in range(len(line)):
        this_char = line[i]

        if this_char.isdigit():
            start_num = int(this_char)
            break

        substring = line[i:]

        word_check = next(
            (num_words[word] for word in num_words if substring.startswith(word)), None
        )

        if word_check:
            start_num = word_check
            break

    end_num = 0

    for i in range(len(line) - 1, -1, -1):
        this_char = line[i]

        if this_char.isdigit():
            end_num = int(this_char)
            break

        substring = line[: i + 1]

        word_check = next(
            (num_words[word] for word in num_words if substring.endswith(word)), None
        )

        if word_check:
            end_num = word_check
            break

    return (start_num * 10) + end_num


calibrations = [get_calibration(line) for line in lines]
total = sum(calibrations)
print(total)
