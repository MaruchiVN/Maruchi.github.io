import math

with open("input5.txt", "r") as file:
    so = file.read().split()
    a=int(so[0])
    b=int(so[1])
ucln = math.gcd(a, b)
print(f"ucln của a,b là: {ucln}")
for i in range(1, a * b +1):
    if i % a == 0 and i % b == 0:
        print(f"bội chung nhỏ nhất của {a} và {b} là: {i}")
        break


    
