import math
while True:
    r = float(input("Nhập vào bán kính hình tròn (r): "))
    if r >= 0:
        break
    print("Vui lòng nhập số không âm!")
print("Diện tích hình tròn là:", math.pi * r * r)
print("Chu vi hình tròn là:", 2 * math.pi * r)