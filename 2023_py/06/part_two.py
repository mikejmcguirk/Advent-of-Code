import math as m

lines = [line.strip() for line in open("puzzle_input.txt")]
time_info = lines[0].split(":")[1].strip()
dist_info = lines[1].split(":")[1].strip()

a = -1
b = int("".join([info.strip() for info in time_info]))
c = int("".join([info.strip() for info in dist_info])) * -1

discriminant = m.sqrt(b**2 - 4 * a * c)
root_1 = m.ceil((-b + discriminant) / (2 * a))
root_2 = (-b - discriminant) // (2 * a)

print(root_2 - root_1 + 1)
