from functools import reduce

lines = [line.strip() for line in open("puzzle_input.txt")]
time_info = lines[0].split(":")[1].strip()
times = [int(time) for time in time_info.split()]
dist_info = lines[1].split(":")[1].strip()
dists = [int(dist) for dist in dist_info.split()]
races = zip(times, dists)


def get_winning_presses(race):
    race_time = race[0]
    dist_to_beat = race[1]
    winning_presses = 0

    for press_time in range(race_time):
        this_dist = press_time * (race_time - press_time)

        if this_dist > dist_to_beat:
            winning_presses += 1

    return winning_presses


press_counts = map(get_winning_presses, races)
power_presses = reduce(lambda x, y: x * y, press_counts)
print(power_presses)
