lines = [line.strip() for line in open("puzzle_input.txt")]

safe_levels = 0
for line in lines:
    nums = list(map(int, line.split()))

    correct_gap = all(abs(a - b) > 0 and abs(a - b) < 4 for a, b in zip(nums, nums[1:]))
    if not correct_gap:
        continue

    all_increasing = all(b > a for a, b in zip(nums, nums[1:]))
    all_decreasing = all(b < a for a, b in zip(nums, nums[1:]))
    if not (all_increasing or all_decreasing):
        continue

    safe_levels += 1

print(safe_levels)
