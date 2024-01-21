def get_score(line):
    winning_nums, my_nums = line.split(":")[1].strip().split("|")
    winning_set = set(winning_nums.strip().split())
    my_set = set(my_nums.strip().split())
    total_winners = len(winning_set & my_set)

    return 2 ** (total_winners - 1) if total_winners > 0 else 0


lines = [line.strip() for line in open("puzzle_input.txt")]
scores = [get_score(line) for line in lines]
print(sum(scores))
