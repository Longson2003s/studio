# Medical Diagnosis Assistant - Studio

Ứng dụng hỗ trợ chẩn đoán y tế dựa trên AI, được xây dựng với Next.js, TypeScript, và Firebase Genkit.

## 📋 Mục Lục

- [Tính Năng](#-tính-năng)
- [Yêu Cầu Hệ Thống](#-yêu-cầu-hệ-thống)
- [Cài Đặt](#-cài-đặt)
- [Chạy Ứng Dụng](#-chạy-ứng-dụng)
- [Cấu Trúc Dự Án](#-cấu-trúc-dự-án)
- [Các Lệnh Có Sẵn](#-các-lệnh-có-sẵn)
- [Công Nghệ Sử Dụng](#-công-nghệ-sử-dụng)
- [Hướng Dẫn Sử Dụng](#-hướng-dẫn-sử-dụng)

## ✨ Tính Năng

- 🏥 **Form Nhập Liệu Bệnh Nhân**: Nhập các thông tin về triệu chứng và tiền sử y tế
- 🤖 **Chẩn Đoán Thông Minh**: Sử dụng AI để tạo danh sách chẩn đoán khác biệt
- 💊 **Khuyến Nghị Điều Trị**: Đề xuất các giao thức điều trị phù hợp
- 🔬 **Khuyến Nghị Xét Nghiệm**: Gợi ý các xét nghiệm chẩn đoán cần thiết
- 📊 **Dashboard**: Giao diện quản lý trường hợp bệnh nhân
- 🎨 **UI Hiện Đại**: Giao diện người dùng đẹp mắt với Tailwind CSS

## 🖥️ Yêu Cầu Hệ Thống

- **Node.js**: Phiên bản 18.0 trở lên
- **npm** hoặc **yarn**: Trình quản lý gói
- **Git**: Để clone repository

## 📦 Cài Đặt

### 1. Clone Repository
```bash
git clone <repository-url>
cd STUDIO
```

### 2. Cài Đặt Dependencies
```bash
npm install
```

Hoặc với Yarn:
```bash
yarn install
```

### 3. Cấu Hình Biến Môi Trường
Tạo file `.env.local` trong thư mục gốc:
```env
# Firebase configuration
NEXT_PUBLIC_FIREBASE_API_KEY=your_api_key
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your_auth_domain
NEXT_PUBLIC_FIREBASE_PROJECT_ID=your_project_id
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your_storage_bucket
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
NEXT_PUBLIC_FIREBASE_APP_ID=your_app_id

# Firebase Genkit
GENKIT_API_KEY=your_genkit_api_key
```

## 🚀 Chạy Ứng Dụng

### Chế Độ Phát Triển
```bash
npm run dev
```

Ứng dụng sẽ chạy tại `http://localhost:3000`

### Build cho Production
```bash
npm run build
```

### Chạy ở Chế Độ Production
```bash
npm run start
```

### Kiểm Tra Linting
```bash
npm run lint
```

## 📂 Cấu Trúc Dự Án

```
STUDIO/
├── src/
│   ├── ai/                          # Cấu hình AI và Genkit flows
│   │   ├── dev.ts                   # Cấu hình phát triển
│   │   ├── genkit.ts                # Cấu hình Genkit chính
│   │   └── flows/                   # Các luồng AI
│   │       ├── generate-differential-diagnoses-flow.ts
│   │       ├── generate-treatment-protocols.ts
│   │       └── recommend-diagnostic-investigations.ts
│   │
│   ├── app/                         # Next.js App Router
│   │   ├── layout.tsx               # Layout chính
│   │   ├── page.tsx                 # Trang chủ
│   │   ├── actions.ts               # Server Actions
│   │   └── dashboard/               # Trang dashboard
│   │       ├── layout.tsx
│   │       └── page.tsx
│   │
│   ├── components/                  # React Components
│   │   ├── common/                  # Components dùng chung
│   │   │   └── logo.tsx
│   │   ├── dashboard/               # Dashboard components
│   │   │   ├── dashboard-sidebar.tsx
│   │   │   ├── diagnosis-results.tsx
│   │   │   ├── patient-form.tsx
│   │   │   ├── results-placeholder.tsx
│   │   │   └── results-skeleton.tsx
│   │   └── ui/                      # UI Components (từ shadcn/ui)
│   │       ├── button.tsx
│   │       ├── form.tsx
│   │       ├── input.tsx
│   │       └── ... (các components UI khác)
│   │
│   ├── hooks/                       # React Hooks tùy chỉnh
│   │   ├── use-mobile.tsx
│   │   └── use-toast.ts
│   │
│   ├── lib/                         # Utilities và helpers
│   │   ├── placeholder-images.ts
│   │   ├── placeholder-images.json
│   │   └── utils.ts
│   │
│   └── globals.css                  # Các kiểu CSS toàn cục
│
├── docs/                            # Tài liệu
├── public/                          # Tài nguyên tĩnh
├── package.json                     # Cấu hình npm
├── tsconfig.json                    # Cấu hình TypeScript
├── tailwind.config.ts               # Cấu hình Tailwind CSS
├── next.config.ts                   # Cấu hình Next.js
└── postcss.config.js                # Cấu hình PostCSS
```

## 🛠️ Các Lệnh Có Sẵn

| Lệnh | Mô Tả |
|------|-------|
| `npm run dev` | Chạy máy chủ phát triển |
| `npm run build` | Build ứng dụng cho production |
| `npm run start` | Chạy ứng dụng đã build |
| `npm run lint` | Kiểm tra code linting |

## 🔧 Công Nghệ Sử Dụng

- **[Next.js 15](https://nextjs.org/)** - React framework
- **[TypeScript](https://www.typescriptlang.org/)** - Ngôn ngữ lập trình có kiểu tĩnh
- **[React 18+](https://react.dev/)** - Thư viện UI
- **[Tailwind CSS](https://tailwindcss.com/)** - CSS framework
- **[Firebase Genkit](https://ai.google.dev/products/genkit)** - AI orchestration
- **[shadcn/ui](https://ui.shadcn.com/)** - Thư viện components UI
- **[React Hook Form](https://react-hook-form.com/)** - Form management
- **[Zod](https://zod.dev/)** - Schema validation

## 📖 Hướng Dẫn Sử Dụng

### Trang Chủ
1. Mở ứng dụng tại `http://localhost:3000`
2. Điền các thông tin về triệu chứng của bệnh nhân
3. Gửi biểu mẫu để xử lý

### Dashboard
1. Truy cập `/dashboard` để xem danh sách các trường hợp
2. Xem các chẩn đoán được đề xuất
3. Xem các khuyến nghị về điều trị
4. Xem các xét nghiệm được khuyên dùng

### Sử Dụng API AI

#### 1. Tạo Chẩn Đoán Khác Biệt
```typescript
import { generateDifferentialDiagnoses } from '@/ai/flows/generate-differential-diagnoses-flow';

const diagnoses = await generateDifferentialDiagnoses({
  symptoms: ['sốt cao', 'ho', 'khó thở'],
  medicalHistory: ['hen suyễn'],
  patientAge: 35,
  patientGender: 'male'
});
```

#### 2. Tạo Giao Thức Điều Trị
```typescript
import { generateTreatmentProtocols } from '@/ai/flows/generate-treatment-protocols';

const protocols = await generateTreatmentProtocols({
  diagnosis: 'Viêm phổi',
  patientCondition: 'Bệnh nhân khỏe mạnh'
});
```

#### 3. Khuyến Nghị Xét Nghiệm
```typescript
import { recommendDiagnosticInvestigations } from '@/ai/flows/recommend-diagnostic-investigations';

const investigations = await recommendDiagnosticInvestigations({
  symptoms: ['sốt', 'đau đầu', 'nôn'],
  suspectedDiagnosis: 'Cảm cúm'
});
```

### Tạo Form Custom
Được xây dựng với React Hook Form và Zod:

```typescript
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

const form = useForm({
  resolver: zodResolver(validationSchema)
});
```

## 📝 Các File Chính

- **[src/app/page.tsx](src/app/page.tsx)** - Trang chủ chính
- **[src/app/dashboard/page.tsx](src/app/dashboard/page.tsx)** - Trang dashboard
- **[src/components/dashboard/patient-form.tsx](src/components/dashboard/patient-form.tsx)** - Biểu mẫu nhập liệu
- **[src/ai/genkit.ts](src/ai/genkit.ts)** - Cấu hình Genkit
- **[src/ai/flows/](src/ai/flows/)** - Các luồng AI

## 🐛 Xử Lý Lỗi

Nếu gặp lỗi khi chạy `npm run dev`:

1. **Xóa node_modules và cài lại:**
   ```bash
   rm -r node_modules package-lock.json
   npm install
   ```

2. **Kiểm tra phiên bản Node.js:**
   ```bash
   node --version
   ```
   Phải là v18.0 trở lên

3. **Xóa cache Next.js:**
   ```bash
   rm -rf .next
   npm run dev
   ```

## 📧 Support

Nếu bạn gặp vấn đề hoặc có câu hỏi, vui lòng liên hệ với team phát triển.

## 📄 Giấy Phép

Dự án này được cấp phép dưới [MIT License](LICENSE).

---

**Phiên bản hiện tại:** 1.0.0  
**Cập nhật lần cuối:** 2026-02-25
