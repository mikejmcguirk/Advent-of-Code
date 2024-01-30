lines = [line.strip() for line in open("puzzle_input.txt")]
seed_info = lines[0].split(":")[1].strip()
seed_nums = [int(seed) for seed in seed_info.split()]
zipped_seed_nums = zip(seed_nums[::2], seed_nums[1::2])
seeds = [(start, start + end - 1) for start, end in zipped_seed_nums]

for i in range(1, len(lines)):
    line = lines[i]

    if line == "":
        seeds = [(abs(seed[0]), abs(seed[1])) for seed in seeds]

        continue

    if not line[0].isdigit():
        continue

    new_seeds = []
    dest_start, source_start, length = [int(num) for num in line.split()]
    source_end = source_start + length - 1
    addition = dest_start - source_start

    for seed in seeds:
        seed_start = seed[0]
        seed_end = seed[1]
        intersection_start = max(seed_start, source_start)
        intersection_end = min(seed_end, source_end)

        if intersection_end < intersection_start:
            new_seeds.append((seed_start, seed_end))

            continue

        adjusted_start = (intersection_start + addition) * -1
        adjusted_end = (intersection_end + addition) * -1
        new_seeds.append((adjusted_start, adjusted_end))

        if seed_start < intersection_start:
            new_seeds.append((seed_start, intersection_start - 1))

        if seed_end > intersection_end:
            new_seeds.append((intersection_end + 1, seed_end))

    seeds = new_seeds

seeds = [(abs(seed[0]), abs(seed[1])) for seed in seeds]
min_seed = min([seed[0] for seed in seeds])
print(min_seed)
