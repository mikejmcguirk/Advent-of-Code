from functools import reduce


def check_safe(nums):
    trend = 0
    for a, b in zip(nums, nums[1:]):
        delta = b - a

        if abs(delta) > 3 or delta == 0:
            return False

        this_trend = 1 if delta > 0 else -1
        if trend != 0 and this_trend != trend:
            return False
        else:
            trend = this_trend

    return True


def check_line(acc, line):
    nums = list(map(int, line.split()))
    if len(nums) < 2 or check_safe(nums):
        return acc + 1

    for i in range(len(nums)):
        dampened_nums = nums[:i] + nums[i + 1 :]
        if check_safe(dampened_nums):
            return acc + 1

    return acc


lines = [line.strip() for line in open("puzzle_input.txt")]
safe_levels = reduce(check_line, lines, 0)
print(safe_levels)
