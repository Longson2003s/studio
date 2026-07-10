'use client';

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { BarChart3, TrendingUp, Users, Brain } from "lucide-react";

export default function AnalyticsPage() {
  const metrics = [
    {
      title: "Bệnh nhân mới",
      value: "234",
      change: "+12.5%",
      icon: Users,
      color: "text-blue-600"
    },
    {
      title: "Chẩn đoán thành công",
      value: "1,450",
      change: "+8.2%",
      icon: Brain,
      color: "text-purple-600"
    },
    {
      title: "Độ chính xác trung bình",
      value: "93.4%",
      change: "+1.2%",
      icon: TrendingUp,
      color: "text-green-600"
    },
    {
      title: "Thời gian xử lý trung bình",
      value: "2.3s",
      change: "-0.5s",
      icon: BarChart3,
      color: "text-orange-600"
    },
  ];

  const topDiagnoses = [
    { diagnosis: "Bệnh tim mạch", count: 342, percentage: 24 },
    { diagnosis: "Tiểu đường", count: 298, percentage: 21 },
    { diagnosis: "Huyết áp cao", count: 256, percentage: 18 },
    { diagnosis: "Béo phì", count: 189, percentage: 13 },
    { diagnosis: "Bệnh hô hấp", count: 145, percentage: 10 },
  ];

  return (
    <main className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Thống kê & Phân tích</h1>
        <p className="text-muted-foreground mt-1">Tổng hợp dữ liệu và hiệu suất hệ thống</p>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {metrics.map((metric) => (
          <Card key={metric.title} className="overflow-hidden">
            <CardContent className="pt-6">
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">{metric.title}</p>
                  <p className="text-3xl font-bold mt-2">{metric.value}</p>
                  <p className="text-xs text-green-600 mt-2">{metric.change}</p>
                </div>
                <div className={`p-3 rounded-lg ${metric.color} text-white bg-opacity-10`}>
                  <metric.icon className={`h-6 w-6 ${metric.color}`} />
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Top Diagnoses */}
      <Card>
        <CardHeader>
          <CardTitle>Chẩn đoán phổ biến nhất</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            {topDiagnoses.map((item, i) => (
              <div key={i}>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium">{item.diagnosis}</span>
                  <span className="text-sm text-muted-foreground">{item.count} ca</span>
                </div>
                <div className="w-full bg-secondary rounded-full h-2">
                  <div
                    className="bg-primary h-2 rounded-full transition-all"
                    style={{ width: `${item.percentage}%` }}
                  />
                </div>
                <div className="text-xs text-muted-foreground mt-1">{item.percentage}%</div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Performance Overview */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Hiệu suất AI Flows</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-sm">Chẩn đoán bệnh tim</span>
                <span className="text-sm font-semibold">94.2%</span>
              </div>
              <div className="w-full bg-secondary rounded-full h-2">
                <div className="bg-green-500 h-2 rounded-full" style={{ width: "94.2%" }} />
              </div>

              <div className="flex items-center justify-between">
                <span className="text-sm">Phân tích hình ảnh CT</span>
                <span className="text-sm font-semibold">92.8%</span>
              </div>
              <div className="w-full bg-secondary rounded-full h-2">
                <div className="bg-green-500 h-2 rounded-full" style={{ width: "92.8%" }} />
              </div>

              <div className="flex items-center justify-between">
                <span className="text-sm">Đề xuất điều trị</span>
                <span className="text-sm font-semibold">89.5%</span>
              </div>
              <div className="w-full bg-secondary rounded-full h-2">
                <div className="bg-green-500 h-2 rounded-full" style={{ width: "89.5%" }} />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Thống kê hệ thống</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4 text-sm">
              <div className="flex items-center justify-between">
                <span className="text-muted-foreground">Uptime</span>
                <span className="font-semibold">99.9%</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-muted-foreground">API Response Time</span>
                <span className="font-semibold">145ms</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-muted-foreground">Active Users</span>
                <span className="font-semibold">127</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-muted-foreground">Storage Used</span>
                <span className="font-semibold">2.4TB / 5TB</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-muted-foreground">Database Queries/min</span>
                <span className="font-semibold">12,450</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </main>
  );
}
