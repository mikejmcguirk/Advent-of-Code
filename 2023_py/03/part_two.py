lines = [line.strip() for line in open("puzzle_input.txt")]
scratch_cards = [1] * len(lines)

for i, line in enumerate(lines):
    winning_nums, my_nums = line.split(":")[1].strip().split("|")
    winning_set = set(winning_nums.strip().split())
    my_set = set(my_nums.strip().split())
    new_cards = len(winning_set & my_set)

    for j in range(new_cards):
        scratch_cards[i + j + 1] += scratch_cards[i]

print(sum(scratch_cards))
