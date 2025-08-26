def ucln(a, b):
    while b != 0:
        a, b = b, a % b
    return abs(a)

a = int(input("Nhập số a: "))
b = int(input("Nhập số b: "))
print("ƯCLN của", a, "và", b, "là:", ucln(a, b))