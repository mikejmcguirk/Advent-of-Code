import hashlib as h

lines = [line.strip() for line in open("puzzle_input.txt")]
idx = 0

while True:
    test = lines[0] + str(idx)
    hashed = h.md5()
    hashed.update(test.encode())
    digested = hashed.hexdigest()

    if digested[:5] == "00000":
        print(digested)
        print(idx)
        break
    else:
        idx += 1
