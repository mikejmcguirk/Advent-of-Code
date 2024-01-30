lines = [line.strip() for line in open("puzzle_input.txt")]
seed_info = lines[0].split(":")[1].strip()
raw_seed_nums = seed_info.split()
seeds = [int(seed) for seed in raw_seed_nums]

for i in range(1, len(lines)):
    line = lines[i]

    if line == "":
        seeds = [abs(seed) for seed in seeds]
        continue

    if not line[0].isdigit():
        continue

    dest_start, source_start, length = [int(num) for num in line.split()]
    source_end = source_start + length - 1
    addition = dest_start - source_start

    for j, seed in enumerate(seeds):
        if source_start <= seed <= source_end:
            seeds[j] = (seed + addition) * -1

seeds = [abs(seed) for seed in seeds]
print(min(seeds))
