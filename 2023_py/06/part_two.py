lines = [line.strip() for line in open("test_data.txt")]
time_info = lines[0].split(":")[1].strip()
dist_info = lines[1].split(":")[1].strip()
time = 0
dist = 0

for c in range(len(time_info)):
    this_char = time_info[c]

    if this_char.isdigit():
        time = time * 10 + int(this_char)

for c in range(len(dist_info)):
    this_char = dist_info[c]

    if this_char.isdigit():
        dist = dist * 10 + int(this_char)
