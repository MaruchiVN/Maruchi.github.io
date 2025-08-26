with open("input.txt", "r") as file:
    kq = file.read().split()
    a = int(kq[0])
    b = int(kq[1])
kqtt = a + b
with open("kqtt.txt", "w") as file:
    file.write(f"{kqtt}")
print(kqtt)

