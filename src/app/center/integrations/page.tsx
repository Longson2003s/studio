'use client';

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Upload, Download, FileUp, BarChart3 } from "lucide-react";
import { useState } from "react";
import { parseExcelFile, exportPatientsToExcel } from "@/lib/integrations/excel";

export default function IntegrationsPage() {
  const [excelFile, setExcelFile] = useState<File | null>(null);

  const handleExcelUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      try {
        const data = await parseExcelFile(file);
        console.log('Parsed data:', data);
        // TODO: Save to database
      } catch (error) {
        console.error('Error parsing Excel:', error);
      }
    }
  };

  const handleExcelExport = () => {
    const sampleData = [
      { id: '1', name: 'Nguyễn Văn A', age: 58, gender: 'Nam', diagnosis: 'Đau ngực', status: 'Đang điều trị', date: '10/07/2026' },
      { id: '2', name: 'Trần Thị B', age: 45, gender: 'Nữ', diagnosis: 'Sốt cao', status: 'Hồi phục', date: '09/07/2026' },
    ];
    exportPatientsToExcel(sampleData);
  };

  return (
    <main className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Tích hợp & Công cụ</h1>
        <p className="text-muted-foreground mt-1">Kết nối với Excel, Power BI, Power Automate và AI Agent</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Excel Integration */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <FileUp className="h-5 w-5" />
              Excel
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <p className="text-sm text-muted-foreground">Tải file Excel để nhập bệnh nhân</p>
              <input
                type="file"
                accept=".xlsx,.xls"
                onChange={handleExcelUpload}
                className="block w-full text-sm text-muted-foreground
                  file:mr-4 file:py-2 file:px-4
                  file:rounded-md file:border-0
                  file:text-sm file:font-semibold
                  file:bg-primary file:text-primary-foreground
                  hover:file:bg-primary/90"
              />
            </div>
            <Button onClick={handleExcelExport} variant="outline" className="w-full gap-2">
              <Download className="h-4 w-4" />
              Xuất dữ liệu
            </Button>
          </CardContent>
        </Card>

        {/* Power BI */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <BarChart3 className="h-5 w-5" />
              Power BI
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <label className="text-sm font-medium">Workspace ID</label>
              <Input placeholder="Nhập workspace ID" />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">Dataset ID</label>
              <Input placeholder="Nhập dataset ID" />
            </div>
            <Button className="w-full gap-2">
              <BarChart3 className="h-4 w-4" />
              Kết nối Power BI
            </Button>
          </CardContent>
        </Card>

        {/* Power Automate */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Upload className="h-5 w-5" />
              Power Automate
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <label className="text-sm font-medium">Webhook URL</label>
              <Input placeholder="https://prod-xx.xx.logic.azure.com..." type="password" />
            </div>
            <div className="space-y-2 text-sm">
              <p className="font-semibold">Tính năng:</p>
              <ul className="list-disc list-inside space-y-1 text-muted-foreground">
                <li>Gửi báo cáo qua email</li>
                <li>Tạo ticket tự động</li>
                <li>Thông báo Teams/Slack</li>
                <li>Lên lịch hẹn</li>
              </ul>
            </div>
            <Button className="w-full gap-2">
              <Upload className="h-4 w-4" />
              Cấu hình Workflow
            </Button>
          </CardContent>
        </Card>

        {/* AI Agent */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              🤖 AI Agent
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2 text-sm">
              <p className="font-semibold">Các tính năng:</p>
              <ul className="list-disc list-inside space-y-1 text-muted-foreground">
                <li>Chatbot hỗ trợ bác sĩ</li>
                <li>Phân tích tương tác</li>
                <li>Trả lời câu hỏi y tế</li>
                <li>Tìm kiếm bệnh nhân thông minh</li>
              </ul>
            </div>
            <Button className="w-full gap-2">
              Mở AI Agent
            </Button>
          </CardContent>
        </Card>
      </div>

      {/* Integration Status */}
      <Card>
        <CardHeader>
          <CardTitle>Trạng thái tích hợp</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            <div className="flex items-center justify-between p-3 border rounded-lg">
              <span className="text-sm">Excel Integration</span>
              <span className="text-xs font-semibold px-2 py-1 rounded bg-green-100 text-green-800">Kết nối</span>
            </div>
            <div className="flex items-center justify-between p-3 border rounded-lg">
              <span className="text-sm">Power BI</span>
              <span className="text-xs font-semibold px-2 py-1 rounded bg-yellow-100 text-yellow-800">Chờ cấu hình</span>
            </div>
            <div className="flex items-center justify-between p-3 border rounded-lg">
              <span className="text-sm">Power Automate</span>
              <span className="text-xs font-semibold px-2 py-1 rounded bg-yellow-100 text-yellow-800">Chờ cấu hình</span>
            </div>
            <div className="flex items-center justify-between p-3 border rounded-lg">
              <span className="text-sm">AI Agent</span>
              <span className="text-xs font-semibold px-2 py-1 rounded bg-green-100 text-green-800">Kết nối</span>
            </div>
          </div>
        </CardContent>
      </Card>
    </main>
  );
}
