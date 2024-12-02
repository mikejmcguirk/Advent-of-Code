lines = [line.strip() for line in open("puzzle_input.txt")]


def window_scan(nums):
    correct_gap = all(abs(a - b) > 0 and abs(a - b) < 4 for a, b in zip(nums, nums[1:]))
    if not correct_gap:
        return False

    all_increasing = all(b > a for a, b in zip(nums, nums[1:]))
    all_decreasing = all(b < a for a, b in zip(nums, nums[1:]))
    if not (all_increasing or all_decreasing):
        return False

    return True


safe_levels = 0
for line in lines:
    nums = list(map(int, line.split()))

    if window_scan(nums):
        safe_levels += 1
        continue

    success = False
    for i in range(0, len(nums)):
        dampened_nums = nums.copy()
        del dampened_nums[i]

        if window_scan(dampened_nums):
            success = True
            break

    if success:
        safe_levels += 1


print(safe_levels)
