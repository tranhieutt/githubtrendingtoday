# GitHub Trending Today

Ứng dụng web hiển thị **top 5 repository trending trên GitHub** theo số lượng star, dữ liệu được scrape trực tiếp từ trang GitHub Trending.

![Tech Stack](https://img.shields.io/badge/React-18-blue) ![TypeScript](https://img.shields.io/badge/TypeScript-5-blue) ![Node.js](https://img.shields.io/badge/Node.js-Express-green) ![Tailwind CSS](https://img.shields.io/badge/Tailwind-CSS-cyan)

---

## Mô tả

Ứng dụng tự động scrape trang `github.com/trending`, lọc ra 5 repository có nhiều star nhất, sau đó hiển thị với giao diện đẹp, có animation mượt mà. Người dùng có thể xem tên repo, mô tả, ngôn ngữ lập trình, tổng số star và số star tăng trong ngày.

---

## Tech Stack

### Backend
| Công nghệ | Mục đích |
|-----------|----------|
| Node.js + Express | REST API server (port 3001) |
| Axios | HTTP client để fetch trang GitHub |
| Cheerio | Parse HTML, trích xuất dữ liệu |

### Frontend
| Công nghệ | Mục đích |
|-----------|----------|
| React 18 + TypeScript | UI framework |
| Vite | Build tool & dev server |
| Tailwind CSS | Styling (dark theme) |
| Framer Motion | Animation cho các card |
| Lucide React | Icon library |

---

## Tính năng

- **Top 5 Trending** — Hiển thị 5 repo có nhiều star nhất từ GitHub Trending
- **Thông tin đầy đủ** — Tên repo, mô tả, ngôn ngữ, tổng star, star hôm nay
- **Animation đẹp** — Cards xuất hiện staggered với Framer Motion
- **Dark theme** — Gradient tím/indigo với hiệu ứng glassmorphism
- **Responsive** — Tương thích mobile và desktop
- **Clickable** — Click vào card để mở repo trực tiếp trên GitHub

---

## Cách hoạt động

```
1. Frontend load  →  useEffect gọi /api/trending
2. Vite proxy     →  Forward request đến localhost:3001
3. Backend        →  Scrape github.com/trending bằng Axios + Cheerio
4. Xử lý dữ liệu →  Parse HTML (.Box-row), sort by stars, lấy top 5
5. Trả về JSON    →  Frontend render cards với animation
```

---

## Cài đặt & Chạy

### Yêu cầu
- Node.js >= 16
- npm

### Cài đặt

```bash
git clone https://github.com/your-username/Github-TrendingToday.git
cd Github-TrendingToday
npm install
```

### Chạy development

```bash
npm run dev
```

Lệnh này chạy đồng thời:
- **Backend** — Express server tại `http://localhost:3001`
- **Frontend** — Vite dev server tại `http://localhost:5173`

### Chỉ chạy backend

```bash
npm run dev:server
```

### Chỉ chạy frontend

```bash
npm run dev:ui
```

### Build production

```bash
npm run build
```

---

## API

### `GET /api/trending`

Scrape GitHub Trending và trả về top 5 repositories.

**Response:**
```json
[
  {
    "title": "owner/repository-name",
    "description": "Mô tả repository",
    "language": "TypeScript",
    "stars": 125000,
    "starsToday": 1200,
    "link": "https://github.com/owner/repository-name"
  }
]
```

---

## Cấu trúc thư mục

```
Github-TrendingToday/
├── src/                  # Frontend React
│   ├── main.tsx          # Entry point
│   ├── App.tsx           # Main component
│   └── index.css         # Global styles (Tailwind)
├── app/                  # Thư mục app
├── server.js             # Backend Express server
├── index.html            # HTML entry point
├── vite.config.ts        # Vite configuration (proxy /api → :3001)
├── tailwind.config.js    # Tailwind configuration
├── postcss.config.js     # PostCSS configuration
└── package.json          # Dependencies & scripts
```

---

## Lưu ý

- Dữ liệu được scrape **trực tiếp từ HTML** của GitHub, không cần API key
- Nếu GitHub thay đổi cấu trúc HTML, phần scraping có thể cần cập nhật
- Không có cache — mỗi lần load trang sẽ fetch mới từ GitHub
