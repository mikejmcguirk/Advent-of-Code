lines = [line.strip() for line in open("puzzle_input.txt")]

left_list = []
right_list = []

for line in lines:
    left_num, right_num = line.split()
    left_list.append(left_num)
    right_list.append(right_num)

left_map = {}
for txt_num in left_list:
    left_map[txt_num] = 0

for txt_num in right_list:
    if txt_num in left_map:
        left_map[txt_num] += 1

score = 0
for txt_num in left_list:
    score += int(txt_num) * left_map[txt_num]

print(score)
