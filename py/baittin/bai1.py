with open("input1.txt", "r") as file:
    a = int(file.read())
    print(type(a))
if a % 2 == 0:
    print("a là số chẵn")
else:
    print("a là số lẻ")

    

