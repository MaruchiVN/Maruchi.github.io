with open("input1.txt", "r") as file:
    a= int(file.read())
kq= a*(a+1)//2
with open ("output2.txt", "w") as file:
    file.write("f{kq}")
print(kq)