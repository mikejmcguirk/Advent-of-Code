lines = [line.strip() for line in open("puzzle_input.txt")]

BYTE_D = 100
BYTE_O = 111
BYTE_N = 110
BYTE_APOS = 39
BYTE_T = 116

BYTE_M = 109
BYTE_U = 117
BYTE_L = 108
BYTE_ZERO = 48
BYTE_NINE = 57
BYTE_OPEN = 40
BYTE_CLOSE = 41
BYTE_COMMA = 44

total_results = 0
is_dont = False

is_d = False
is_o = False
is_n = False
is_apos = False
is_t = False

is_m = False
is_u = False
is_mul = False
is_open = False
in_first = False
first = 0
first_done = False
is_comma = False
in_second = False
second = 0
# count_do = 0
# count_dont = 0
for line in lines:
    bytes = line.encode("utf-8")

    for byte in bytes:
        if byte == BYTE_D:
            is_d = True
            is_o = False
            is_n = False
            is_apos = False
            is_t = False

            is_m = False
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

        if byte == BYTE_O and is_d:
            is_o = True
            continue

        if byte == BYTE_N and is_d and is_o:
            is_n = True
            continue

        if byte == BYTE_APOS and is_d and is_o and is_n:
            is_apos = True
            continue

        if byte == BYTE_T and is_d and is_o and is_n and is_apos:
            is_t = True
            continue

        making_do = is_d and is_o and (not is_n) and (not is_apos) and (not is_t)
        making_dont = is_d and is_o and is_n and is_apos and is_t

        if byte == BYTE_OPEN and (making_do or making_dont):
            is_open = True
            continue

        if byte == BYTE_CLOSE and is_open:
            if making_do:
                is_dont = False
                is_d = False
                is_o = False
                is_n = False
                is_apos = False
                is_t = False
                is_open = False
                continue

            if making_dont:
                is_dont = True
                is_d = False
                is_o = False
                is_n = False
                is_apos = False
                is_t = False
                is_open = False
                continue

        if is_dont:
            continue

        if byte == BYTE_M:
            is_d = False
            is_o = False
            is_n = False
            is_apos = False
            is_t = False

            is_m = True
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

        not_in_first = not (in_first or first_done)
        if byte >= BYTE_ZERO and byte <= BYTE_NINE and is_open and not_in_first and is_mul:
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
            in_second = True
            second = second * 10 + (byte - BYTE_ZERO)
            continue

        if byte >= BYTE_ZERO and byte <= BYTE_NINE and in_second:
            second = second * 10 + (byte - BYTE_ZERO)
            continue

        if byte == BYTE_CLOSE and in_second:
            total_results += first * second

        is_d = False
        is_o = False
        is_n = False
        is_apos = False
        is_t = False

        is_m = False
        is_u = False
        is_mul = False
        is_open = False
        in_first = False
        first = 0
        first_done = False
        is_comma = False
        in_second = False
        second = 0


print(total_results)
