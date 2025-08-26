with open("input1.txt", "r") as file:
    a = int(file.read())
if a < 2:
    print("a không là số nguyên tố")
else:
    for i in range(2, int(a ** 0.5) + 1):
        if a % i == 0:
            print("a không là số nguyên tố")
            break
    else:
        print("a là số nguyên tố")




