'use client';

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Settings, Shield, Bell, Database } from "lucide-react";

export default function SettingsPage() {
  return (
    <main className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Cài đặt</h1>
        <p className="text-muted-foreground mt-1">Quản lý cấu hình và tùy chọn hệ thống</p>
      </div>

      <Tabs defaultValue="general" className="w-full">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="general">Chung</TabsTrigger>
          <TabsTrigger value="security">Bảo mật</TabsTrigger>
          <TabsTrigger value="notifications">Thông báo</TabsTrigger>
          <TabsTrigger value="database">Cơ sở dữ liệu</TabsTrigger>
        </TabsList>

        {/* General Settings */}
        <TabsContent value="general" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Settings className="h-5 w-5" />
                Cài đặt chung
              </CardTitle>
              <CardDescription>Cấu hình cơ bản của hệ thống</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-2">
                <Label>Tên hệ thống</Label>
                <Input defaultValue="MSG AI Center" />
              </div>
              <div className="space-y-2">
                <Label>Email hỗ trợ</Label>
                <Input type="email" defaultValue="support@medicalsaigon.vn" />
              </div>
              <div className="space-y-2">
                <Label>URL hệ thống</Label>
                <Input type="url" defaultValue="https://msg-ai.medicalsaigon.vn" />
              </div>
              <div className="space-y-2">
                <Label>Múi giờ</Label>
                <Input defaultValue="Asia/Ho_Chi_Minh (UTC+7)" />
              </div>
              <Button>Lưu thay đổi</Button>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Security Settings */}
        <TabsContent value="security" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Shield className="h-5 w-5" />
                Bảo mật
              </CardTitle>
              <CardDescription>Quản lý bảo mật và quyền truy cập</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <Label className="text-base font-semibold">Xác thực hai yếu tố (2FA)</Label>
                    <p className="text-sm text-muted-foreground mt-1">Bắt buộc 2FA cho tất cả người dùng</p>
                  </div>
                  <Switch defaultChecked />
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <Label className="text-base font-semibold">HTTPS bắt buộc</Label>
                    <p className="text-sm text-muted-foreground mt-1">Chuyển hướng HTTP tới HTTPS</p>
                  </div>
                  <Switch defaultChecked />
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <Label className="text-base font-semibold">Khóa phiên</Label>
                    <p className="text-sm text-muted-foreground mt-1">Tự động khóa phiên sau 30 phút không hoạt động</p>
                  </div>
                  <Switch defaultChecked />
                </div>
              </div>
              <Button>Cập nhật bảo mật</Button>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Notifications */}
        <TabsContent value="notifications" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Bell className="h-5 w-5" />
                Thông báo
              </CardTitle>
              <CardDescription>Quản lý cảnh báo và thông báo</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <Label className="text-base font-semibold">Email thông báo</Label>
                    <p className="text-sm text-muted-foreground mt-1">Gửi email khi có cảnh báo quan trọng</p>
                  </div>
                  <Switch defaultChecked />
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <Label className="text-base font-semibold">SMS cảnh báo</Label>
                    <p className="text-sm text-muted-foreground mt-1">Gửi SMS cho các cảnh báo khẩn cấp</p>
                  </div>
                  <Switch />
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <Label className="text-base font-semibold">Thông báo hệ thống</Label>
                    <p className="text-sm text-muted-foreground mt-1">Hiển thị thông báo trong ứng dụng</p>
                  </div>
                  <Switch defaultChecked />
                </div>
              </div>
              <Button>Lưu cài đặt</Button>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Database */}
        <TabsContent value="database" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Database className="h-5 w-5" />
                Cơ sở dữ liệu
              </CardTitle>
              <CardDescription>Quản lý cơ sở dữ liệu và sao lưu</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-2">
                <Label>Máy chủ MongoDB</Label>
                <Input defaultValue="mongodb+srv://..." disabled />
              </div>
              <div className="space-y-2">
                <Label>Dung lượng sử dụng</Label>
                <div className="w-full bg-secondary rounded-full h-3">
                  <div className="bg-primary h-3 rounded-full" style={{ width: "48%" }} />
                </div>
                <p className="text-xs text-muted-foreground mt-1">2.4TB / 5TB (48%)</p>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <Button variant="outline">Sao lưu ngay</Button>
                <Button variant="outline">Xem chi tiết</Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </main>
  );
}
