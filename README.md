# Portfolio Website với Admin Dashboard

Website Portfolio cá nhân hiện đại được xây dựng với ReactJS, TailwindCSS, và Framer Motion, kết hợp với backend API đầy đủ.

## 🚀 Tính năng

### Frontend (Portfolio)
- ✨ Hero section với animation đẹp mắt
- 📝 Trang About với timeline và core values
- 💼 Projects showcase với grid layout
- 📚 Blog system với danh sách bài viết
- 🎓 Certificates display
- 💪 Skills với progress bars
- 📧 Contact form
- 🌓 Dark/Light mode

### Admin Dashboard
- 🔐 Authentication với JWT
- 📊 Dashboard với analytics và charts
- ✏️ CRUD đầy đủ cho:
  - Projects
  - Blog Posts
  - Skills
  - Certificates
  - Profile
  - About
  - Contact messages

## 🛠️ Tech Stack

- **Frontend**: React 18, TypeScript, Vite
- **UI**: TailwindCSS, shadcn/ui
- **Animation**: Framer Motion
- **Charts**: Recharts
- **API Client**: Axios
- **Routing**: React Router v6

## 📦 Cài đặt

\`\`\`bash
# Clone repository
git clone <your-repo-url>

# Cài đặt dependencies
npm install

# Tạo file .env từ .env.example
cp .env.example .env

# Cập nhật API URL trong .env
VITE_API_BASE_URL=http://localhost:3000

# Chạy development server
npm run dev
\`\`\`

## 🔧 Configuration

### Environment Variables

Tạo file \`.env\` trong thư mục root với nội dung:

\`\`\`env
VITE_API_BASE_URL=http://localhost:3000
\`\`\`

### API Endpoints

API backend cần implement các endpoints theo swagger.json:

- \`POST /api/auth/register\` - Đăng ký user
- \`POST /api/auth/login\` - Đăng nhập
- \`GET /api/auth/me\` - Get current user
- \`GET /api/profiles\` - Get profile
- \`PUT /api/profiles\` - Update profile
- \`GET/PUT/DELETE /api/about\` - Quản lý about
- \`GET /api/projects\` - Get projects list
- \`POST /api/projects\` - Create project
- \`PUT /api/projects/:id\` - Update project
- \`DELETE /api/projects/:id\` - Delete project
- \`GET /api/posts\` - Get blog posts
- \`POST /api/posts\` - Create post
- \`PUT /api/posts/:id\` - Update post
- \`DELETE /api/posts/:id\` - Delete post
- \`GET /api/skills\` - Get skills
- \`POST /api/skills\` - Create skill
- \`PUT /api/skills/:id\` - Update skill
- \`DELETE /api/skills/:id\` - Delete skill
- \`GET /api/certificates\` - Get certificates
- \`POST /api/certificates\` - Create certificate
- \`PUT /api/certificates/:id\` - Update certificate
- \`DELETE /api/certificates/:id\` - Delete certificate
- \`GET /api/dashboard\` - Get dashboard stats
- \`GET /api/dashboard/weekly-views\` - Get weekly views data
- \`GET /api/dashboard/projects-timeline\` - Get projects timeline
- \`GET /api/contact\` - Get contact messages
- \`POST /api/contact\` - Create contact message

## 🔐 Authentication

Hệ thống sử dụng JWT authentication:

1. Login qua \`/admin/login\`
2. Token được lưu vào localStorage
3. Mọi API request tự động gửi kèm token trong header: \`Authorization: Bearer <token>\`
4. Khi token hết hạn, user sẽ được redirect về trang login

## 📝 Sử dụng

### Admin Dashboard

1. Truy cập \`/admin/login\`
2. Đăng nhập với email/password đã đăng ký qua API backend
3. Quản lý nội dung qua các menu:
   - Dashboard - Xem analytics
   - Projects - Quản lý dự án
   - Blog - Quản lý bài viết
   - Skills - Quản lý kỹ năng
   - Certificates - Quản lý chứng chỉ
   - Profile - Cập nhật thông tin cá nhân
   - About - Cập nhật about section
   - Contact - Xem tin nhắn liên hệ
   - Theme - Tùy chỉnh giao diện

### Public Portfolio

Người dùng có thể xem portfolio tại các routes:
- \`/\` - Trang chủ
- \`/about\` - Giới thiệu
- \`/skills\` - Kỹ năng
- \`/projects\` - Dự án
- \`/certificates\` - Chứng chỉ
- \`/blog\` - Blog
- \`/blog/:id\` - Chi tiết bài viết
- \`/contact\` - Liên hệ

## 🏗️ Cấu trúc Project

\`\`\`
src/
├── components/          # Reusable components
│   ├── ui/             # shadcn/ui components
│   ├── Navbar.tsx
│   ├── Footer.tsx
│   └── ...
├── pages/              # Page components
│   ├── admin/          # Admin dashboard pages
│   └── ...             # Public pages
├── services/           # API services
│   ├── auth.service.ts
│   ├── profile.service.ts
│   ├── project.service.ts
│   ├── post.service.ts
│   ├── skill.service.ts
│   ├── certificate.service.ts
│   ├── dashboard.service.ts
│   └── contact.service.ts
├── lib/
│   ├── api.ts          # Axios instance
│   └── utils.ts
├── data/
│   └── fakeData.ts     # Fake data (fallback, không dùng nữa)
└── index.css           # Global styles
\`\`\`

## 🎨 Customization

### Theme Colors

Edit \`src/index.css\` để thay đổi color scheme:

\`\`\`css
:root {
  --primary: ...;
  --secondary: ...;
  --accent: ...;
  /* ... */
}
\`\`\`

### Animations

Tất cả animations sử dụng Framer Motion. Customize tại các component tương ứng.

## 🔗 API Integration

Tất cả các service đã được tạo sẵn trong thư mục \`src/services/\`. Chỉ cần:
1. Cấu hình \`VITE_API_BASE_URL\` trong file \`.env\`
2. Backend API implement đúng các endpoints theo swagger.json
3. Mọi thứ sẽ hoạt động tự động

## 📄 License

MIT License

## 👨‍💻 Developer

Portfolio template được tạo bởi Lovable AI
