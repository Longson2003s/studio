# MSG AI Center - Medical Diagnosis & Analytics Platform

Nền tảng tổng hợp quản lý y tế và AI - Trung tâm dữ liệu và phân tích cho các hệ thống chẩn đoán AI.

Ứng dụng được xây dựng với Next.js, TypeScript, Tailwind CSS, và Firebase Genkit.

## 📋 Mục Lục

- [Tính Năng](#-tính-năng)
- [Cấu Trúc Dự Án](#-cấu-trúc-dự-án)
- [Các Module Chính](#-các-module-chính)
- [Yêu Cầu Hệ Thống](#-yêu-cầu-hệ-thống)
- [Cài Đặt](#-cài-đặt)
- [Chạy Ứng Dụng](#-chạy-ứng-dụng)
- [Công Nghệ Sử Dụng](#-công-nghệ-sử-dụng)

## ✨ Tính Năng

### 🏥 Quản Lý Bệnh Nhân
- Quản lý danh sách bệnh nhân toàn bộ hệ thống
- Tạo và cập nhật hồ sơ bệnh án
- Lịch sử chẩn đoán và điều trị
- Theo dõi tình trạng bệnh nhân

### 🤖 Quản Lý AI Flows
- Quản lý các quy trình AI tự động
- Chẩn đoán bệnh tim mạch
- Phân tích hình ảnh CT/MRI
- Đề xuất phác đồ điều trị
- Phát hiện các bất thường trong xét nghiệm
- Theo dõi hiệu suất và độ chính xác

### 📊 Báo Cáo & Thống Kê
- Báo cáo tuần kỳ và hàng tháng
- Phân tích hiệu suất AI Flows
- Thống kê bệnh nhân và chẩn đoán
- Xuất báo cáo PDF/Excel

### ⚙️ Quản Lý Hệ Thống
- Quản lý người dùng (Bác sĩ, Admin, Chuyên gia)
- Cấu hình hệ thống
- Quản lý bảo mật và phân quyền
- Cài đặt thông báo
- Quản lý cơ sở dữ liệu

### 👨‍⚕️ Vai Trò Người Dùng
- **Bác sĩ**: Nhập liệu bệnh nhân, xem chẩn đoán, quản lý bệnh nhân
- **Admin**: Quản lý toàn bộ hệ thống, người dùng, AI Flows
- **Chuyên gia**: Phân tích dữ liệu, tối ưu AI Flows
- **Ban lãnh đạo**: Xem báo cáo tổng hợp, thống kê

## 🏗️ Cấu Trúc Dự Án

```
src/
├── app/
│   ├── center/                    # MSG AI Center - Module chính
│   │   ├── page.tsx              # Dashboard tổng quan
│   │   ├── layout.tsx            # Layout chính
│   │   ├── patients/             # Quản lý bệnh nhân
│   │   ├── ai-flows/             # Quản lý AI Flows
│   │   ├── reports/              # Báo cáo
│   │   ├── analytics/            # Thống kê & Phân tích
│   │   ├── ai-agent/             # AI Medical Assistant (Chatbot)
│   │   ├── integrations/         # Tích hợp Excel, Power BI, Power Automate
│   │   └── settings/             # Cài đặt
│   │
│   ├── api/                       # Next.js API Routes
│   │   └── ai/chat/route.ts      # AI Chat endpoint
│   │
│   ├── dashboard/                 # Dashboard bác sĩ (cũ)
│   ├── layout.tsx                # Root layout
│   └── page.tsx                  # Home page
│
├── components/
│   ├── center/                   # Components cho MSG AI Center
│   │   └── center-sidebar.tsx    # Sidebar navigation
│   ├── dashboard/                # Components dashboard
│   ├── ui/                       # UI components (Radix)
│   └── common/                   # Shared components
│
├── ai/                           # AI Flows & Genkit integration
│   ├── flows/
│   ├── genkit.ts
│   └── dev.ts
│
├── hooks/                        # Custom React hooks
├── lib/                          # Utilities & helpers
│   └── integrations/             # Integration modules
│       ├── excel.ts              # Excel export/import
│       ├── powerbi.ts            # Power BI integration
│       ├── powerautomate.ts      # Power Automate workflows
│       ├── ai-agent.ts           # AI Agent chatbot
│       └── index.ts              # Module exports
│
└── app/actions.ts               # Server actions
```

## 📦 Các Module Chính

### 1. **Dashboard Tổng Quan** (`/center`)
- Thống kê nhanh (KPI)
- Hoạt động gần đây
- Truy cập nhanh các module

### 2. **Quản Lý Bệnh Nhân** (`/center/patients`)
- Danh sách bệnh nhân
- Tìm kiếm và lọc
- Xem chi tiết
- Sửa hồ sơ
- Lịch sử chẩn đoán

### 3. **Quản Lý AI Flows** (`/center/ai-flows`)
- Danh sách AI Flows
- Chạy Flow
- Theo dõi hiệu suất
- Xem chi tiết

### 4. **Báo Cáo** (`/center/reports`)
- Danh sách báo cáo
- Tạo báo cáo mới
- Tải xuống
- Tình trạng xử lý

### 5. **Thống Kê** (`/center/analytics`)
- KPI và Metrics
- Chẩn đoán phổ biến
- Hiệu suất AI Flows
- Thống kê hệ thống

### 6. **AI Medical Assistant** (`/center/ai-agent`)
- Chatbot hỗ trợ bác sĩ
- Phân tích dữ liệu bệnh nhân
- Trả lời câu hỏi y tế
- Gợi ý xét nghiệm thông minh
- Lịch sử trò chuyện

### 7. **Tích Hợp Công Cụ** (`/center/integrations`)
- **Excel**: Nhập/xuất dữ liệu bệnh nhân
- **Power BI**: Đồng bộ dữ liệu và tạo báo cáo
- **Power Automate**: Tự động hoá quy trình làm việc
- **AI Agent**: Quản lý chatbot AI
- Trạng thái tích hợp theo thời gian thực

### 8. **Cài Đặt** (`/center/settings`)
- Cài đặt chung
- Bảo mật
- Thông báo
- Cơ sở dữ liệu
- Quản lý tích hợp

## 🖥️ Yêu Cầu Hệ Thống

- **Node.js**: Phiên bản 18.0 trở lên
- **npm** hoặc **yarn**: Trình quản lý gói
- **MongoDB**: Cơ sở dữ liệu (tùy chọn)
- **Git**: Để clone repository

## 📦 Cài Đặt

### 1. Clone Repository
```bash
git clone https://github.com/Longson2003s/studio.git
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
# AI & Genkit Configuration
GOOGLE_GENAI_API_KEY=your_google_genai_api_key

# Power BI Integration (Optional)
POWER_BI_TENANT_ID=your_tenant_id
POWER_BI_CLIENT_ID=your_client_id
POWER_BI_CLIENT_SECRET=your_client_secret
POWER_BI_WORKSPACE_ID=your_workspace_id
POWER_BI_DATASET_ID=your_dataset_id

# Power Automate Integration (Optional)
POWER_AUTOMATE_WEBHOOK_URL=your_webhook_url

# Firebase configuration (If using Firebase)
NEXT_PUBLIC_FIREBASE_API_KEY=your_api_key
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your_auth_domain
NEXT_PUBLIC_FIREBASE_PROJECT_ID=your_project_id
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your_storage_bucket
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
NEXT_PUBLIC_FIREBASE_APP_ID=your_app_id
```

#### Hướng Dẫn Lấy API Key:

**Google Genkit API Key:**
1. Truy cập [Google AI Studio](https://aistudio.google.com)
2. Tạo API Key mới
3. Sao chép vào `GOOGLE_GENAI_API_KEY`

**Power BI Credentials:**
1. Truy cập [Azure Portal](https://portal.azure.com)
2. Đăng ký ứng dụng Azure AD
3. Lấy Tenant ID, Client ID, Client Secret
4. Tạo Workspace và Dataset trong Power BI
5. Điền vào các biến tương ứng

**Power Automate Webhook:**
1. Tạo Cloud Flow trong Power Automate
2. Sử dụng HTTP trigger
3. Sao chép Webhook URL

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

### Sử Dụng AI Medical Assistant
```typescript
import AIAgent from '@/lib/integrations/ai-agent';

const agent = new AIAgent();

// Chat với AI
const response = await agent.chat('Bệnh nhân có triệu chứng gì?');

// Phân tích bệnh nhân
const analysis = await agent.analyzePatient({
  name: 'Nguyễn Văn A',
  age: 58,
  symptoms: ['Đau ngực', 'Khó thở']
});

// Trả lời câu hỏi y tế
const answer = await agent.answerMedicalQuestion('Bệnh tim có triệu chứng nào?');
```

### Xuất Dữ Liệu Excel
```typescript
import { exportPatientsToExcel, exportDiagnosisReport } from '@/lib/integrations/excel';

// Xuất danh sách bệnh nhân
exportPatientsToExcel(patients, 'patients.xlsx');

// Xuất báo cáo chẩn đoán
exportDiagnosisReport(diagnosis, 'Nguyễn Văn A', 'diagnosis.xlsx');
```

### Tích Hợp Power BI
```typescript
import PowerBIIntegration from '@/lib/integrations/powerbi';

const pbi = new PowerBIIntegration();

// Đẩy dữ liệu lên Power BI
await pbi.pushDataToDataset('Patients', patientData);

// Làm mới dataset
await pbi.refreshDataset();

// Lấy URL embed cho báo cáo
const embedUrl = await pbi.generateEmbedUrl(reportId);
```

### Tự Động Hoá Workflow với Power Automate
```typescript
import PowerAutomateIntegration from '@/lib/integrations/powerautomate';

const automate = new PowerAutomateIntegration();

// Gửi cảnh báo chẩn đoán
await automate.sendDiagnosisAlert(
  'doctor@hospital.com',
  'Nguyễn Văn A',
  'Bệnh tim mạch',
  'Cao'
);

// Gửi thông báo Teams
await automate.sendTeamsNotification(
  'channel-id',
  'Chẩn đoán Mới',
  'Bệnh nhân Nguyễn Văn A có chẩn đoán mới'
);

// Lên lịch cuộc hẹn
await automate.scheduleAppointment(
  'patient@email.com',
  'Nguyễn Văn A',
  'BS. Trần Văn B',
  new Date('2026-07-15 09:00')
);
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
