'use client';

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { CheckCircle, AlertCircle, Clock } from "lucide-react";

const activities = [
  {
    id: 1,
    type: "complete",
    title: "Hoàn thành chẩn đoán",
    description: "Bệnh nhân Nguyễn Văn A - Đau ngực",
    time: "30 phút trước",
    icon: CheckCircle,
  },
  {
    id: 2,
    type: "warning",
    title: "Cảnh báo quan trọng",
    description: "Bệnh nhân Trần Thị B có dấu hiệu bất thường",
    time: "1 giờ trước",
    icon: AlertCircle,
  },
  {
    id: 3,
    type: "pending",
    title: "Chờ xét nghiệm",
    description: "Bệnh nhân Phạm Văn C - Chờ kết quả ECG",
    time: "2 giờ trước",
    icon: Clock,
  },
];

export function RecentActivity() {
  const getIconColor = (type: string) => {
    switch (type) {
      case "complete":
        return "text-green-600";
      case "warning":
        return "text-red-600";
      case "pending":
        return "text-blue-600";
      default:
        return "text-gray-600";
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg font-semibold">Hoạt động gần đây</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {activities.map((activity) => (
            <div key={activity.id} className="flex gap-3">
              <div className={`mt-1 ${getIconColor(activity.type)}`}>
                <activity.icon className="h-5 w-5" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium">{activity.title}</p>
                <p className="text-xs text-muted-foreground mt-0.5">{activity.description}</p>
                <p className="text-xs text-muted-foreground mt-1">{activity.time}</p>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
