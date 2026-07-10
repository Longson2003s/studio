'use client';

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Plus, Download, FileText, Calendar, User } from "lucide-react";

const reports = [
  {
    id: 1,
    title: "Báo cáo tuần",
    description: "Tổng hợp các chẩn đoán và AI Flows tuần 28/2026",
    date: "10/07/2026",
    author: "Admin",
    status: "completed",
    patients: 284,
    diagnoses: 328
  },
  {
    id: 2,
    title: "Báo cáo hiệu suất hệ thống",
    description: "Phân tích hiệu suất của các AI Flows trong tháng",
    date: "09/07/2026",
    author: "System",
    status: "completed",
    patients: 0,
    diagnoses: 0
  },
  {
    id: 3,
    title: "Báo cáo bệnh nhân cao tuổi",
    description: "Phân tích các trường hợp bệnh nhân trên 60 tuổi",
    date: "08/07/2026",
    author: "Dr. Minh",
    status: "processing",
    patients: 156,
    diagnoses: 89
  },
];

export default function ReportsPage() {
  return (
    <main className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Báo cáo</h1>
          <p className="text-muted-foreground mt-1">Xem, tạo và tải xuống các báo cáo</p>
        </div>
        <Button className="gap-2">
          <Plus className="h-4 w-4" />
          Tạo báo cáo
        </Button>
      </div>

      {/* Reports Grid */}
      <div className="grid grid-cols-1 gap-4">
        {reports.map((report) => (
          <Card key={report.id} className="hover:shadow-lg transition-shadow">
            <CardContent className="pt-6">
              <div className="flex items-start justify-between">
                <div className="flex items-start gap-4 flex-1">
                  <div className="p-3 rounded-lg bg-primary/10">
                    <FileText className="h-5 w-5 text-primary" />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-semibold text-lg">{report.title}</h3>
                    <p className="text-sm text-muted-foreground mt-1">{report.description}</p>
                    <div className="flex items-center gap-4 mt-3 text-sm">
                      <div className="flex items-center gap-1 text-muted-foreground">
                        <Calendar className="h-4 w-4" />
                        {report.date}
                      </div>
                      <div className="flex items-center gap-1 text-muted-foreground">
                        <User className="h-4 w-4" />
                        {report.author}
                      </div>
                      {report.patients > 0 && (
                        <Badge variant="secondary">{report.patients} bệnh nhân</Badge>
                      )}
                      {report.diagnoses > 0 && (
                        <Badge variant="secondary">{report.diagnoses} chẩn đoán</Badge>
                      )}
                    </div>
                  </div>
                </div>
                <div className="flex flex-col gap-2 ml-4">
                  <Badge className={
                    report.status === 'completed' 
                      ? 'bg-green-100 text-green-800' 
                      : 'bg-yellow-100 text-yellow-800'
                  }>
                    {report.status === 'completed' ? 'Hoàn thành' : 'Đang xử lý'}
                  </Badge>
                  <Button size="sm" variant="outline" className="gap-2">
                    <Download className="h-4 w-4" />
                    Tải
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </main>
  );
}
