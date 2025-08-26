cao = float(input("Nhập vào chiều cao: "))
can = float(input("Nhập vào cân nặng: "))
bmi = can / (cao ** 2)
if bmi < 18.5:
    print("Bạn sẽ gầy.")
elif 18.5 <= bmi < 24.9:
    print("Bạn ổn.")
else:
    print("Bạn quá bel.")