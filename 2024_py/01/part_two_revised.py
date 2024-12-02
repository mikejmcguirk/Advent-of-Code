lines = [line.strip() for line in open("puzzle_input.txt")]

left_list = []
right_list = []
for line in lines:
    left_num, right_num = line.split()
    left_list.append(int(left_num))
    right_list.append(int(right_num))

left_map = {}
for num in right_list:
    if num in left_map:
        left_map[num] += 1
    else:
        left_map[num] = 1

score = 0
for num in left_list:
    if num in left_map:
        score += num * left_map[num]

print(score)
