# Hướng Dẫn Sử Dụng Hiệu Ứng Animation cho Maruchi_VN

## Tổng Quan
Trang web của bạn đã được tích hợp với 5 hiệu ứng animation khác nhau cho chữ "Maruchi_VN" sử dụng GSAP (GreenSock Animation Platform).

## Các Hiệu Ứng Có Sẵn

### 1. Typewriter (Máy đánh chữ)
- **Mô tả**: Chữ xuất hiện từng ký tự một như đang được đánh máy
- **Đặc điểm**: Có con trỏ nhấp nháy ở cuối
- **Phù hợp**: Tạo cảm giác chuyên nghiệp, hiện đại

### 2. Bounce (Nảy)
- **Mô tả**: Các ký tự rơi xuống và nảy lên
- **Đặc điểm**: Hiệu ứng vật lý tự nhiên
- **Phù hợp**: Tạo cảm giác vui tươi, năng động

### 3. Wave (Sóng)
- **Mô tả**: Các ký tự xuất hiện theo dạng sóng
- **Đặc điểm**: Chuyển động mượt mà, uyển chuyển
- **Phù hợp**: Tạo cảm giác mềm mại, thanh lịch

### 4. Glitch (Lỗi)
- **Mô tả**: Hiệu ứng lỗi kỹ thuật số
- **Đặc điểm**: Các ký tự rung lắc và di chuyển ngẫu nhiên
- **Phù hợp**: Tạo cảm giác cyberpunk, hi-tech

### 5. Morph (Biến hình)
- **Mô tả**: Các ký tự biến đổi từ màu xanh sang đen
- **Đặc điểm**: Xoay và thay đổi kích thước
- **Phù hợp**: Tạo cảm giác ma thuật, ấn tượng

## Cách Sử Dụng

### Thay Đổi Hiệu Ứng
1. Mở trang web trong trình duyệt
2. Cuộn xuống phần tên "Maruchi_VN"
3. Nhấn vào các nút màu để thay đổi hiệu ứng:
   - 🔵 **Typewriter** (Xanh dương)
   - 🟢 **Bounce** (Xanh lá)
   - 🟣 **Wave** (Tím)
   - 🔴 **Glitch** (Đỏ)
   - 🟠 **Morph** (Cam)

### Tùy Chỉnh Trong Code

#### Thay Đổi Hiệu Ứng Mặc Định
Mở file `src/scripts/advanced-split-text.js` và thay đổi dòng:
```javascript
effect: 'typewriter', // Thay đổi thành 'bounce', 'wave', 'glitch', hoặc 'morph'
```

#### Tùy Chỉnh Thông Số Animation
```javascript
new AdvancedSplitTextAnimation(titleElement, {
    effect: 'typewriter',
    delay: 120,        // Độ trễ giữa các ký tự (ms)
    duration: 0.8,     // Thời gian animation (giây)
    threshold: 0.2,    // Ngưỡng kích hoạt scroll
    rootMargin: "-50px" // Khoảng cách kích hoạt
});
```

## Cấu Trúc File

```
src/
├── index.html              # Trang chính
├── scripts/
│   ├── split-text.js       # Hiệu ứng cơ bản
│   └── advanced-split-text.js # Hiệu ứng nâng cao
└── styles/
    └── animations.css      # CSS cho animation
```

## Tùy Chỉnh Nâng Cao

### Thêm Hiệu Ứng Mới
1. Mở file `src/scripts/advanced-split-text.js`
2. Thêm method mới trong class `AdvancedSplitTextAnimation`
3. Thêm case mới trong switch statement
4. Thêm nút trong HTML

### Ví Dụ Thêm Hiệu Ứng "Fade":
```javascript
fadeEffect(chars) {
    window.gsap.set(chars, { opacity: 0 });
    
    const tl = window.gsap.timeline({
        scrollTrigger: {
            trigger: this.element,
            start: `top ${(1 - this.options.threshold) * 100}%${this.options.rootMargin}`,
            toggleActions: "play none none none",
            once: true
        },
        onComplete: this.options.onComplete
    });
    
    tl.to(chars, {
        opacity: 1,
        duration: this.options.duration,
        ease: "power2.out",
        stagger: this.options.delay / 1000
    });
    
    this.timeline = tl;
}
```

## Lưu Ý Kỹ Thuật

- **Performance**: Các animation được tối ưu hóa với `will-change` và `force3D`
- **Compatibility**: Hoạt động trên tất cả trình duyệt hiện đại
- **Mobile**: Responsive và hoạt động tốt trên thiết bị di động
- **Accessibility**: Không ảnh hưởng đến khả năng truy cập

## Troubleshooting

### Animation Không Hoạt Động
1. Kiểm tra console để xem lỗi
2. Đảm bảo GSAP đã load thành công
3. Kiểm tra element ID có đúng không

### Hiệu Ứng Chậm
1. Giảm `delay` value
2. Giảm `duration` value
3. Kiểm tra performance của thiết bị

### Hiệu Ứng Không Mượt
1. Tăng `threshold` value
2. Điều chỉnh `rootMargin`
3. Kiểm tra CSS `will-change` property

## Liên Hệ
Nếu có vấn đề hoặc muốn thêm hiệu Ứng mới, hãy liên hệ qua email: ducanh80022161@gmail.com
