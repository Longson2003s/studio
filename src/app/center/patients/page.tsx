'use client';

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Plus, Search, MoreVertical, Eye } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

const patients = [
  { id: 1, name: "Nguyễn Văn A", age: 58, gender: "Nam", status: "Đang điều trị", condition: "Đau ngực", lastVisit: "10/07/2026" },
  { id: 2, name: "Trần Thị B", age: 45, gender: "Nữ", status: "Hồi phục", condition: "Sốt cao", lastVisit: "09/07/2026" },
  { id: 3, name: "Phạm Văn C", age: 72, gender: "Nam", status: "Đang điều trị", condition: "Khó thở", lastVisit: "08/07/2026" },
  { id: 4, name: "Hoàng Thị D", age: 35, gender: "Nữ", status: "Khám bệnh", condition: "Đau đầu", lastVisit: "10/07/2026" },
  { id: 5, name: "Lê Văn E", age: 62, gender: "Nam", status: "Hồi phục", condition: "Tiểu đường", lastVisit: "07/07/2026" },
];

const getStatusColor = (status: string) => {
  switch (status) {
    case "Đang điều trị":
      return "bg-yellow-100 text-yellow-800";
    case "Hồi phục":
      return "bg-green-100 text-green-800";
    case "Khám bệnh":
      return "bg-blue-100 text-blue-800";
    default:
      return "bg-gray-100 text-gray-800";
  }
};

export default function PatientsPage() {
  return (
    <main className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Quản lý bệnh nhân</h1>
          <p className="text-muted-foreground mt-1">Quản lý thông tin bệnh nhân và hồ sơ bệnh án</p>
        </div>
        <Button className="gap-2">
          <Plus className="h-4 w-4" />
          Thêm bệnh nhân
        </Button>
      </div>

      {/* Search and Filter */}
      <div className="flex gap-4">
        <div className="flex-1 relative">
          <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
          <Input placeholder="Tìm kiếm bệnh nhân..." className="pl-10" />
        </div>
      </div>

      {/* Patients Table */}
      <Card>
        <CardHeader>
          <CardTitle>Danh sách bệnh nhân</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="rounded-lg border overflow-hidden">
            <Table>
              <TableHeader>
                <TableRow className="bg-muted/50">
                  <TableHead className="w-32">Bệnh nhân</TableHead>
                  <TableHead className="text-center">Tuổi</TableHead>
                  <TableHead>Tình trạng</TableHead>
                  <TableHead>Chẩn đoán</TableHead>
                  <TableHead>Lần khám cuối</TableHead>
                  <TableHead className="text-right">Hành động</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {patients.map((patient) => (
                  <TableRow key={patient.id}>
                    <TableCell>
                      <div className="flex items-center gap-3">
                        <Avatar className="h-8 w-8">
                          <AvatarImage src={`https://picsum.photos/seed/patient${patient.id}/100/100`} />
                          <AvatarFallback>{patient.name.slice(0, 2).toUpperCase()}</AvatarFallback>
                        </Avatar>
                        <div>
                          <p className="font-medium text-sm">{patient.name}</p>
                          <p className="text-xs text-muted-foreground">{patient.gender}</p>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell className="text-center">{patient.age}</TableCell>
                    <TableCell>
                      <Badge className={getStatusColor(patient.status)}>{patient.status}</Badge>
                    </TableCell>
                    <TableCell className="text-sm">{patient.condition}</TableCell>
                    <TableCell className="text-sm text-muted-foreground">{patient.lastVisit}</TableCell>
                    <TableCell className="text-right">
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="sm">
                            <MoreVertical className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem className="gap-2 cursor-pointer">
                            <Eye className="h-4 w-4" />
                            Xem chi tiết
                          </DropdownMenuItem>
                          <DropdownMenuItem className="gap-2 cursor-pointer">
                            Sửa hồ sơ
                          </DropdownMenuItem>
                          <DropdownMenuItem className="gap-2 cursor-pointer">
                            Lịch sử chẩn đoán
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </main>
  );
}
