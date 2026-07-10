'use client';

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Plus, FileText, Download, Settings } from "lucide-react";

export function QuickActions() {
  const actions = [
    {
      label: "Bệnh nhân mới",
      icon: Plus,
      description: "Thêm bệnh nhân mới",
      variant: "default" as const,
    },
    {
      label: "Xuất báo cáo",
      icon: Download,
      description: "Tải xuống kết quả",
      variant: "outline" as const,
    },
    {
      label: "Mẫu chẩn đoán",
      icon: FileText,
      description: "Xem mẫu",
      variant: "outline" as const,
    },
    {
      label: "Cài đặt",
      icon: Settings,
      description: "Tùy chỉnh",
      variant: "outline" as const,
    },
  ];

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg font-semibold">Hành động nhanh</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-2 gap-3">
          {actions.map((action) => (
            <Button
              key={action.label}
              variant={action.variant}
              className="h-auto flex flex-col items-center justify-center py-4 gap-2"
            >
              <action.icon className="h-5 w-5" />
              <div className="text-center">
                <p className="text-xs font-semibold">{action.label}</p>
                <p className="text-xs text-muted-foreground">{action.description}</p>
              </div>
            </Button>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
