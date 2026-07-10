'use client';

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Users, Brain, FileText, TrendingUp, Clock, AlertCircle } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

export default function CenterPage() {
  const stats = [
    {
      title: "Tổng bệnh nhân",
      value: "1,284",
      change: "+12%",
      icon: Users,
      color: "text-blue-600",
      bgColor: "bg-blue-50"
    },
    {
      title: "AI Flows chạy",
      value: "328",
      change: "+8%",
      icon: Brain,
      color: "text-purple-600",
      bgColor: "bg-purple-50"
    },
    {
      title: "Báo cáo",
      value: "156",
      change: "+24%",
      icon: FileText,
      color: "text-green-600",
      bgColor: "bg-green-50"
    },
    {
      title: "Hiệu suất",
      value: "94.2%",
      change: "+2.3%",
      icon: TrendingUp,
      color: "text-orange-600",
      bgColor: "bg-orange-50"
    },
  ];

  const recentActivities = [
    { type: "diagnosis", message: "Hoàn thành chẩn đoán cho bệnh nhân Nguyễn Văn A", time: "30 phút trước", status: "success" },
    { type: "flow", message: "AI Flow phân tích hình ảnh CT hoàn thành", time: "1 giờ trước", status: "success" },
    { type: "alert", message: "Cảnh báo: 5 bệnh nhân cần kiểm tra lại", time: "2 giờ trước", status: "warning" },
    { type: "report", message: "Báo cáo tuần đã được tạo", time: "4 giờ trước", status: "success" },
  ];

  return (
    <main className="space-y-8">
      <div>
        <h1 className="text-4xl font-bold tracking-tight mb-2">MSG AI Center</h1>
        <p className="text-muted-foreground text-lg">Nền tảng quản lý y tế và AI tích hợp</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat) => (
          <Card key={stat.title} className="overflow-hidden hover:shadow-lg transition-shadow">
            <CardContent className="pt-6">
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">{stat.title}</p>
                  <p className="text-3xl font-bold mt-3">{stat.value}</p>
                  <Badge variant="secondary" className="mt-2">{stat.change}</Badge>
                </div>
                <div className={`p-3 rounded-lg ${stat.bgColor}`}>
                  <stat.icon className={`h-6 w-6 ${stat.color}`} />
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Recent Activities */}
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle className="flex items-center justify-between">
              <span>Hoạt động gần đây</span>
              <Button variant="outline" size="sm">Xem tất cả</Button>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentActivities.map((activity, i) => (
                <div key={i} className="flex items-start gap-4 p-3 border rounded-lg hover:bg-accent transition-colors">
                  <div className={`mt-1 p-2 rounded-full ${
                    activity.status === 'success' ? 'bg-green-100' : 'bg-yellow-100'
                  }`}>
                    {activity.type === 'diagnosis' && <FileText className="h-4 w-4 text-green-600" />}
                    {activity.type === 'flow' && <Brain className="h-4 w-4 text-purple-600" />}
                    {activity.type === 'alert' && <AlertCircle className="h-4 w-4 text-yellow-600" />}
                    {activity.type === 'report' && <TrendingUp className="h-4 w-4 text-blue-600" />}
                  </div>
                  <div className="flex-1">
                    <p className="text-sm font-medium">{activity.message}</p>
                    <p className="text-xs text-muted-foreground mt-1">{activity.time}</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Quick Access */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Truy cập nhanh</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <Button variant="outline" className="w-full justify-start" size="lg">
                <Users className="h-4 w-4 mr-2" />
                Quản lý bệnh nhân
              </Button>
              <Button variant="outline" className="w-full justify-start" size="lg">
                <Brain className="h-4 w-4 mr-2" />
                AI Flows
              </Button>
              <Button variant="outline" className="w-full justify-start" size="lg">
                <FileText className="h-4 w-4 mr-2" />
                Báo cáo
              </Button>
              <Button variant="outline" className="w-full justify-start" size="lg">
                <TrendingUp className="h-4 w-4 mr-2" />
                Thống kê
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </main>
  );
}
