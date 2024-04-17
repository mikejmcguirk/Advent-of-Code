import re

unknown = {}
seen = {}

for line in open("puzzle_input.txt"):
    parts = line.strip().split(" -> ")
    unknown[parts[1]] = parts[0]


def get_signal(end_point):
    if re.match(r"^-?\d+$", end_point):
        return int(end_point)
    elif end_point in seen:
        return seen[end_point]

    logic = unknown[end_point]

    if re.match(r"^-?\d+$", logic):
        seen[end_point] = int(logic)
        return int(logic)

    parts = logic.split()

    if len(parts) == 2:  # NOT
        return ~(get_signal(parts[1]) & 0xFFFF)
    elif len(parts) == 1:  # Either an integer or a single end point, no operation required
        return get_signal(parts[0])

    a = get_signal(parts[0])
    b = get_signal(parts[2])

    if parts[1] == "AND":
        result = a & b
    elif parts[1] == "OR":
        result = a | b
    elif parts[1] == "LSHIFT":
        result = a << b
    elif parts[1] == "RSHIFT":
        result = a >> b

    seen[end_point] = result
    return result


print(get_signal("a"))
