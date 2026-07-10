'use client';

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ChevronRight } from "lucide-react";

const recentPatients = [
  {
    id: 1,
    name: "Nguyễn Văn A",
    age: 58,
    gender: "Nam",
    diagnosis: "Đau ngực",
    status: "Hoàn thành",
    time: "30 phút trước",
    avatar: "https://picsum.photos/seed/patient1/100/100"
  },
  {
    id: 2,
    name: "Trần Thị B",
    age: 45,
    gender: "Nữ",
    diagnosis: "Sốt cao",
    status: "Đang xử lý",
    time: "1 giờ trước",
    avatar: "https://picsum.photos/seed/patient2/100/100"
  },
  {
    id: 3,
    name: "Phạm Văn C",
    age: 72,
    gender: "Nam",
    diagnosis: "Khó thở",
    status: "Hoàn thành",
    time: "2 giờ trước",
    avatar: "https://picsum.photos/seed/patient3/100/100"
  },
];

export function RecentPatients() {
  const getStatusColor = (status: string) => {
    switch (status) {
      case "Hoàn thành":
        return "bg-green-100 text-green-800";
      case "Đang xử lý":
        return "bg-yellow-100 text-yellow-800";
      case "Chờ":
        return "bg-blue-100 text-blue-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4">
        <CardTitle className="text-xl font-semibold">Bệnh nhân gần đây</CardTitle>
        <Button variant="outline" size="sm">Xem tất cả</Button>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {recentPatients.map((patient) => (
            <div key={patient.id} className="flex items-center justify-between p-3 rounded-lg border hover:bg-accent cursor-pointer transition-colors">
              <div className="flex items-center gap-3 flex-1">
                <Avatar className="h-10 w-10">
                  <AvatarImage src={patient.avatar} alt={patient.name} />
                  <AvatarFallback>{patient.name.slice(0, 2).toUpperCase()}</AvatarFallback>
                </Avatar>
                <div className="flex-1">
                  <p className="font-medium text-sm">{patient.name}</p>
                  <p className="text-xs text-muted-foreground">{patient.age} tuổi • {patient.gender}</p>
                  <p className="text-xs text-muted-foreground mt-1">{patient.diagnosis}</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="text-right">
                  <Badge variant="outline" className={`text-xs mb-1 ${getStatusColor(patient.status)}`}>
                    {patient.status}
                  </Badge>
                  <p className="text-xs text-muted-foreground">{patient.time}</p>
                </div>
                <ChevronRight className="h-4 w-4 text-muted-foreground" />
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
