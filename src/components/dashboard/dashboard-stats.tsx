'use client';

import { Card, CardContent } from "@/components/ui/card";
import { Users, FileText, Clock, AlertCircle } from "lucide-react";

export function DashboardStats() {
  const stats = [
    {
      title: "Tổng bệnh nhân",
      value: "24",
      description: "Tuần này",
      icon: Users,
      color: "text-blue-600",
      bgColor: "bg-blue-50"
    },
    {
      title: "Chẩn đoán",
      value: "18",
      description: "Hoàn thành",
      icon: FileText,
      color: "text-green-600",
      bgColor: "bg-green-50"
    },
    {
      title: "Đang xử lý",
      value: "6",
      description: "Chờ kết quả",
      icon: Clock,
      color: "text-orange-600",
      bgColor: "bg-orange-50"
    },
    {
      title: "Cảnh báo",
      value: "2",
      description: "Cần kiểm tra",
      icon: AlertCircle,
      color: "text-red-600",
      bgColor: "bg-red-50"
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      {stats.map((stat) => (
        <Card key={stat.title} className="overflow-hidden hover:shadow-md transition-shadow">
          <CardContent className="pt-6">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">{stat.title}</p>
                <p className="text-3xl font-bold mt-2">{stat.value}</p>
                <p className="text-xs text-muted-foreground mt-1">{stat.description}</p>
              </div>
              <div className={`p-3 rounded-lg ${stat.bgColor}`}>
                <stat.icon className={`h-6 w-6 ${stat.color}`} />
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
