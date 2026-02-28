import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Bot } from "lucide-react";

export function ResultsPlaceholder() {
  return (
    <Card className="h-full border-dashed border-2 flex flex-col items-center justify-center text-center">
      <CardHeader>
        <div className="mx-auto bg-secondary p-4 rounded-full mb-4">
          <Bot className="h-10 w-10 text-muted-foreground" />
        </div>
        <CardTitle className="font-headline text-2xl">AI sẵn sàng hỗ trợ</CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-muted-foreground">
          Vui lòng nhập thông tin bệnh nhân vào biểu mẫu bên trái và nhấn "Tạo chẩn đoán" để nhận phân tích và gợi ý từ AI.
        </p>
      </CardContent>
    </Card>
  );
}
