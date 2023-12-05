with open("test_data.txt", "r") as file:
    lines = file.readlines()

cards = [1] * len(lines)

for i, line in enumerate(lines):
    winners, numbers = [set(x.split()) for x in line.split(":", 1)[1].split("|", 1)]
    for n in range(len(numbers.intersection(winners))):
        cards[i + n + 1] += cards[i]

print(sum(cards))
