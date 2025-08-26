def daongc(x):
    return int(str(x)[::-1])

while True:
    x = int(input("Nhập vào x (số nguyên dương): "))
    if x > 0:
        break
    print("Vui lòng nhập số nguyên dương!")

print("Số đảo ngược của", x, "là:", daongc(x))
