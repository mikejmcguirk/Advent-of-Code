lines = [line.strip() for line in open("puzzle_input.txt")]

left_list = []
right_list = []

for line in lines:
    left_num, right_num = line.split()
    left_list.append(left_num)
    right_list.append(right_num)

left_list.sort()
right_list.sort()
distances = []

for i in range(len(left_list)):
    distance = abs(int(left_list[i]) - int(right_list[i]))
    distances.append(distance)

print(sum(distances))
