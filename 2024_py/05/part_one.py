import math

lines = [line.strip() for line in open("puzzle_input.txt")]

rules = []
i = 0
while i < len(lines):
    if "|" not in lines[i]:
        i += 1
        break

    before, after = lines[i].split("|")
    rules.append((int(before), int(after)))

    i += 1

middles = 0
while i < len(lines):
    if lines[i].strip() == "":
        i += 1
        continue

    pages = list(map(int, lines[i].split(",")))

    is_correct = True
    for rule in rules:
        before = None
        after = None

        for j, num in enumerate(pages):
            if num == rule[0]:
                before = j
            elif num == rule[1]:
                after = j

            if before is not None and after is not None:
                break

        if before is None or after is None:
            continue

        if before > after:
            is_correct = False
            break

    if is_correct:
        middle_idx = len(pages) // 2
        # print("Correct line: ", pages, " Middle: ", pages[middle_idx])
        middles += pages[middle_idx]

    i += 1

print(middles)
