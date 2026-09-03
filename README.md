# cv-online

CV / landing page cá nhân song ngữ (Việt – Anh) của **Bùi Nguyễn Thắng** — Backend / .NET Developer.

Xây bằng **Next.js 16 (App Router) + TypeScript + Tailwind CSS v4**, có scene 3D bằng React Three Fiber ở phần hero.

## Chạy dự án

```bash
npm install
npm run dev
```

Mở http://localhost:3000

Các lệnh khác:

| Lệnh | Tác dụng |
| --- | --- |
| `npm run dev` | Dev server (Turbopack) |
| `npm run build` | Build production |
| `npm start` | Chạy bản đã build |

> `npm run lint` hiện chưa dùng được: `next lint` đã bị gỡ khỏi Next 16 và project chưa có config ESLint.

## Cấu trúc

```
src/
  app/
    layout.tsx        # Layout gốc + metadata SEO
    page.tsx          # Landing page — toàn bộ các section
    globals.css       # Tailwind v4, biến màu, keyframes hiệu ứng
  components/
    LangToggle.tsx    # Nút chuyển VI / EN
    Reveal.tsx        # Hiện dần khi cuộn tới (IntersectionObserver)
    three/
      Scene.tsx       # Canvas R3F ở hero
  lib/
    content.ts        # PROFILE + nội dung song ngữ + SKILLS
    projects.ts       # Danh sách dự án tiêu biểu
```

## Sửa nội dung

Toàn bộ chữ nghĩa nằm trong `src/lib/`, **không cần đụng vào component**:

- `content.ts` → `PROFILE`: họ tên, năm sinh, số điện thoại, email, Facebook, địa chỉ.
  Để trống trường nào thì trường đó tự ẩn khỏi mục Liên hệ.
- `content.ts` → `CONTENT`: chữ của từng section, cả 2 ngôn ngữ.
- `content.ts` → `SKILLS`: các nhóm kỹ năng. Nhóm gắn `primary: true` sẽ hiển thị
  nổi bật và chiếm trọn hàng.
- `content.ts` → `EXPERIENCE`: kinh nghiệm làm việc.
- `projects.ts` → `PROJECTS`: dự án tiêu biểu, mỗi dự án có mã, tên, mô tả và
  danh sách công nghệ.

Kiểu `L = { vi: string; en: string }` bắt buộc mỗi chuỗi phải có đủ 2 bản dịch,
nên thiếu bản dịch nào là TypeScript báo lỗi ngay. Helper `same()` dùng cho tên
công nghệ giữ nguyên ở cả hai ngôn ngữ.

## Ngôn ngữ

Nút VI / EN ở góc phải header. Lựa chọn được lưu vào `localStorage` và cập nhật
cả thuộc tính `<html lang>`. Mặc định là tiếng Việt.

## Hiệu ứng

Đốm sáng gradient trôi ở nền, gradient chạy trên tên, con trỏ nhấp nháy, các
khối hiện dần khi cuộn, card nhấc lên khi hover, vệt sáng quét ngang thẻ dự án.
Tất cả tự tắt khi hệ điều hành bật *prefers-reduced-motion*.

## Ghi chú về Three.js

- Three.js chỉ chạy phía client → component chứa `<Canvas>` phải là `"use client"`
  và được import bằng `dynamic(..., { ssr: false })`.
- `next.config.ts` đã bật `transpilePackages: ["three"]`.
- `Scene.tsx` có sẵn xử lý mất WebGL context và fallback khi trình duyệt không
  hỗ trợ WebGL — lỗi sẽ hiện thông báo thay vì canvas trắng.
- `<Environment preset="city" />` tải file HDR từ CDN ngoài nên được bọc
  `<Suspense>` riêng: mạng lỗi thì chỉ mất phản chiếu, scene vẫn chạy.

## Deploy lên Vercel

Trang này build ra **static hoàn toàn** (không API route, không server runtime,
không cần biến môi trường), nên deploy chỉ là đẩy code lên và bấm import — Vercel
tự nhận diện Next.js, không cần `vercel.json`.

Trước khi đẩy, chạy thử đúng thứ Vercel sẽ chạy:

```bash
npm ci        # cài đúng theo package-lock.json, như trên Vercel
npm run build # phải pass; đây là lệnh build Vercel dùng
```

### Cách 1 — GitHub + Vercel (khuyến nghị)

Tự động deploy lại mỗi lần push, có preview URL cho từng nhánh.

```bash
git init -b main
git add .
git commit -m "init: CV online"
gh repo create cv-online --private --source=. --push
# không dùng gh thì tạo repo trên github.com rồi:
# git remote add origin https://github.com/<user>/cv-online.git && git push -u origin main
```

Sau đó vào <https://vercel.com/new> → **Import Git Repository** → chọn repo →
**Deploy**. Để nguyên toàn bộ mặc định:

| Mục | Giá trị |
| --- | --- |
| Framework Preset | Next.js (tự nhận) |
| Build Command | `next build` (mặc định) |
| Output Directory | để trống (mặc định) |
| Install Command | `npm install` (mặc định) |
| Environment Variables | không cần |

### Cách 2 — Vercel CLI (nhanh nhất, không cần GitHub)

```bash
npx vercel login    # đăng nhập 1 lần
npx vercel          # tạo preview deployment
npx vercel --prod   # đẩy lên production
```

Lần chạy đầu CLI hỏi vài câu — cứ Enter theo mặc định, riêng
*In which directory is your code located?* để `./`. Thư mục `.vercel` sinh ra
đã nằm trong `.gitignore`.

### Tên miền

Project Settings → **Domains** → thêm domain → trỏ DNS theo hướng dẫn Vercel
(`A 76.76.21.21` cho domain gốc, hoặc `CNAME cname.vercel-dns.com` cho
subdomain). HTTPS được cấp tự động.

### Lưu ý

- `npm run lint` đang hỏng (`next lint` đã bị gỡ khỏi Next 16) nhưng **không
  ảnh hưởng deploy** — Vercel chỉ chạy `next build`.
- Scene 3D tải file HDR (`<Environment preset="city" />`) từ CDN ngoài lúc
  chạy trên trình duyệt; nếu CDN lỗi thì chỉ mất phản chiếu, trang vẫn chạy.
- Đổi nội dung CV chỉ cần sửa `src/lib/` rồi push — Vercel tự build lại.
