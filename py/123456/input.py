#cách 3:
# Bước 1: Đọc dữ liệu từ file INPUT.txt
with open("input.txt", "r", encoding="utf-8") as f:
    data = f.read().split()  # Tách theo khoảng trắng
    a = int(data[0])
    b = int(data[1])
# Bước 2: Tìm số lớn nhất
if a > b:
    max_val = a
else:
    max_val = b
# Bước 3: Ghi kết quả ra file KQ.txt
with open("KQ.txt", "w", encoding="utf-8") as f:
    f.write(f"Số lớn nhất là: {max_val}")

print("Đã ghi kết quả vào file KQ.txt")