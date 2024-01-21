import re

lines = [line.strip() for line in open("puzzle_input.txt")]
max_cubes = {"red": 12, "green": 13, "blue": 14}


def check_game(line):
    game_hdr, game_info = line.split(":")
    draws = re.split(r"[;,]\s*", game_info.strip())

    for draw in draws:
        count, color = draw.strip().split(" ")

        if int(count) > max_cubes[color]:
            break
    else:
        _, game_idx = game_hdr.split(" ")

        return int(game_idx)

    return 0


valid_idxs = [check_game(line) for line in lines]
total_valid = sum(valid_idxs)
print(total_valid)
