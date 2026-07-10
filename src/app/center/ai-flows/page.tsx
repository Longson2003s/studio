'use client';

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Plus, Search, Play, MoreVertical } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const aiFlows = [
  {
    id: 1,
    name: "Chẩn đoán bệnh tim",
    description: "Phân tích dữ liệu ECG, xét nghiệm để chẩn đoán bệnh tim",
    status: "active",
    runs: 1240,
    accuracy: "94.2%"
  },
  {
    id: 2,
    name: "Phân tích hình ảnh CT",
    description: "Xử lý và phân tích hình ảnh CT quét",
    status: "active",
    runs: 856,
    accuracy: "92.8%"
  },
  {
    id: 3,
    name: "Đề xuất điều trị",
    description: "Gợi ý phác đồ điều trị dựa trên chẩn đoán",
    status: "active",
    runs: 734,
    accuracy: "89.5%"
  },
  {
    id: 4,
    name: "Phát hiện bất thường",
    description: "Phát hiện các bất thường trong kết quả xét nghiệm",
    status: "inactive",
    runs: 421,
    accuracy: "96.1%"
  },
];

export default function AIFlowsPage() {
  return (
    <main className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Quản lý AI Flows</h1>
          <p className="text-muted-foreground mt-1">Quản lý các quy trình AI tự động</p>
        </div>
        <Button className="gap-2">
          <Plus className="h-4 w-4" />
          Tạo Flow mới
        </Button>
      </div>

      {/* Search */}
      <div className="flex-1 relative max-w-md">
        <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
        <Input placeholder="Tìm kiếm AI Flows..." className="pl-10" />
      </div>

      {/* AI Flows Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {aiFlows.map((flow) => (
          <Card key={flow.id} className="overflow-hidden hover:shadow-lg transition-shadow">
            <CardHeader className="pb-3">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <CardTitle className="text-lg">{flow.name}</CardTitle>
                  <p className="text-sm text-muted-foreground mt-1">{flow.description}</p>
                </div>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="sm">
                      <MoreVertical className="h-4 w-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuItem className="gap-2 cursor-pointer">
                      <Play className="h-4 w-4" />
                      Chạy ngay
                    </DropdownMenuItem>
                    <DropdownMenuItem className="gap-2 cursor-pointer">
                      Xem chi tiết
                    </DropdownMenuItem>
                    <DropdownMenuItem className="gap-2 cursor-pointer">
                      Sửa
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground">Trạng thái</p>
                    <Badge className={flow.status === 'active' ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'} variant="outline">
                      {flow.status === 'active' ? 'Hoạt động' : 'Ngủ'}
                    </Badge>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Độ chính xác</p>
                    <p className="text-lg font-semibold">{flow.accuracy}</p>
                  </div>
                </div>
                <div className="pt-2 border-t">
                  <p className="text-xs text-muted-foreground">Lần chạy: <span className="font-semibold">{flow.runs.toLocaleString()}</span></p>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </main>
  );
}
