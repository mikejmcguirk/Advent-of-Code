lines = [line.strip() for line in open("puzzle_input.txt")]

left_list = []
right_list = []
for line in lines:
    left_num, right_num = line.split()
    left_list.append(int(left_num))
    right_list.append(int(right_num))

left_list.sort()
right_list.sort()

distance = 0
for a, b in zip(left_list, right_list):
    distance += abs(a - b)

print(distance)
