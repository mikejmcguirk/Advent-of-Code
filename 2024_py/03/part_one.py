lines = [line.strip() for line in open("puzzle_input.txt")]

BYTE_M = 109
BYTE_U = 117
BYTE_L = 108
BYTE_ZERO = 48
BYTE_NINE = 57
BYTE_OPEN = 40
BYTE_CLOSE = 41
BYTE_COMMA = 44

total_results = 0
for line in lines:
    bytes = line.encode("utf-8")

    is_m = False
    is_u = False
    is_mul = False
    is_open = False
    in_first = False
    first = 0
    is_comma = False
    in_second = False
    second = 0

    this_line = 0

    for byte in bytes:
        if byte == BYTE_M:
            is_m = True
            is_u = False
            is_u = False
            is_mul = False
            is_open = False
            in_first = False
            first = 0
            first_done = False
            is_comma = False
            in_second = False
            second = 0
            continue

        if byte == BYTE_U and is_m:
            is_u = True
            continue

        if byte == BYTE_L and is_m and is_u:
            is_mul = True
            continue

        if byte == BYTE_OPEN and is_mul:
            is_open = True
            continue

        if byte >= BYTE_ZERO and byte <= BYTE_NINE and is_open and not (in_first or first_done):
            in_first = True
            first = first * 10 + (byte - BYTE_ZERO)
            continue

        if byte >= BYTE_ZERO and byte <= BYTE_NINE and in_first and (not first_done):
            first = first * 10 + (byte - BYTE_ZERO)
            continue

        if byte == BYTE_COMMA and in_first:
            is_comma = True
            in_first = False
            first_done = True
            continue

        if byte >= BYTE_ZERO and byte <= BYTE_NINE and is_comma and (not in_second):
            # print("opening second", byte - BYTE_ZERO)
            in_second = True
            second = second * 10 + (byte - BYTE_ZERO)
            continue

        if byte >= BYTE_ZERO and byte <= BYTE_NINE and in_second:
            # print("in second", byte - BYTE_ZERO)
            second = second * 10 + (byte - BYTE_ZERO)
            continue

        if byte == BYTE_CLOSE and in_second:
            # print(first, second, first * second)
            this_line += first * second

        is_m = False
        is_u = False
        is_mul = False
        is_open = False
        in_first = False
        first = 0
        first_power = 1
        is_comma = False
        in_second = False
        second = 0
        second_power = 1

    total_results += this_line

print(total_results)
