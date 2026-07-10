'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import type { GenerateDifferentialDiagnosesInput } from '@/ai/flows/generate-differential-diagnoses-flow';

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Loader2, Wand2 } from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const formSchema = z.object({
  patientDemographics: z.string().min(5, { message: "Vui lòng nhập ít nhất 5 ký tự." }),
  presentingSymptoms: z.string().min(5, { message: "Vui lòng nhập ít nhất 5 ký tự." }),
  medicalHistory: z.string().default(""),
  physicalExamination: z.string().default(""),
  labResults: z.string().default(""),
  imagingResults: z.string().default(""),
  otherRelevantData: z.string().default(""),
});

type PatientFormProps = {
  onSubmit: (data: GenerateDifferentialDiagnosesInput) => void;
  isLoading: boolean;
};

export function PatientForm({ onSubmit, isLoading }: PatientFormProps) {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      patientDemographics: "",
      presentingSymptoms: "",
      medicalHistory: "",
      physicalExamination: "",
      labResults: "",
      imagingResults: "",
      otherRelevantData: "",
    },
  });

  const requiredFields = [
    { name: 'patientDemographics', label: 'Thông tin nhân khẩu học', placeholder: 'VD: Bệnh nhân nam, 58 tuổi, tiền sử tăng huyết áp...', description: 'Tuổi, giới tính, dân tộc, tiền sử bệnh...' },
    { name: 'presentingSymptoms', label: 'Triệu chứng hiện tại', placeholder: 'VD: Đau ngực trái sau xương ức, kéo dài 30 phút...', description: 'Triệu chứng chính, mức độ, thời gian bắt đầu...' },
  ] as const;

  const clinicalFields = [
    { name: 'medicalHistory', label: 'Tiền sử bệnh án', placeholder: 'VD: Tăng huyết áp 10 năm, đái tháo đường type 2...', description: 'Bệnh mãn tính, phẫu thuật, dị ứng...' },
    { name: 'physicalExamination', label: 'Khám thực thể', placeholder: 'VD: Mạch 100 l/p, HA 160/90 mmHg, phổi thông khí rõ...', description: 'Vital signs, phương pháp khám...' },
  ] as const;

  const investigationFields = [
    { name: 'labResults', label: 'Kết quả xét nghiệm', placeholder: 'VD: Troponin T tăng, CK-MB tăng...', description: 'Huyết học, sinh hóa, miễn dịch...' },
    { name: 'imagingResults', label: 'Kết quả hình ảnh học', placeholder: 'VD: X-quang ngực thẳng: bóng tim to...', description: 'X-quang, CT, MRI, siêu âm...' },
    { name: 'otherRelevantData', label: 'Dữ liệu liên quan khác', placeholder: 'VD: ECG: ST chênh lên ở V1-V4...', description: 'ECG, EEG, hoặc thông tin khác...' },
  ] as const;

  const renderFormFields = (fields: typeof requiredFields | typeof clinicalFields | typeof investigationFields) => {
    return fields.map((fieldInfo) => (
      <FormField
        key={fieldInfo.name}
        control={form.control}
        name={fieldInfo.name as any}
        render={({ field }) => (
          <FormItem>
            <FormLabel className="text-base">
              {fieldInfo.label}
              {requiredFields.some(f => f.name === fieldInfo.name) && <span className="text-red-500 ml-1">*</span>}
            </FormLabel>
            <FormControl>
              <Textarea
                placeholder={fieldInfo.placeholder}
                rows={2}
                className="resize-none"
                {...field}
              />
            </FormControl>
            <FormDescription className="text-xs">{fieldInfo.description}</FormDescription>
            <FormMessage />
          </FormItem>
        )}
      />
    ));
  };

  return (
    <Card className="shadow-lg">
      <CardHeader>
        <CardTitle className="font-headline text-2xl">Nhập thông tin bệnh nhân</CardTitle>
        <CardDescription>AI sẽ phân tích dữ liệu lâm sàng để đưa ra gợi ý chẩn đoán.</CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <Tabs defaultValue="basic" className="w-full">
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="basic">Cơ bản</TabsTrigger>
                <TabsTrigger value="clinical">Lâm sàng</TabsTrigger>
                <TabsTrigger value="investigation">Cận lâm sàng</TabsTrigger>
              </TabsList>

              <TabsContent value="basic" className="space-y-4 mt-6">
                <div className="space-y-2 mb-4">
                  <h3 className="font-semibold text-sm text-muted-foreground">Thông tin bắt buộc</h3>
                  <p className="text-xs text-muted-foreground">Các trường này bắt buộc để AI có thể phân tích</p>
                </div>
                {renderFormFields(requiredFields)}
              </TabsContent>

              <TabsContent value="clinical" className="space-y-4 mt-6">
                <div className="space-y-2 mb-4">
                  <h3 className="font-semibold text-sm text-muted-foreground">Thông tin lâm sàng</h3>
                  <p className="text-xs text-muted-foreground">Thêm chi tiết để kết quả chính xác hơn</p>
                </div>
                {renderFormFields(clinicalFields)}
              </TabsContent>

              <TabsContent value="investigation" className="space-y-4 mt-6">
                <div className="space-y-2 mb-4">
                  <h3 className="font-semibold text-sm text-muted-foreground">Kết quả cận lâm sàng</h3>
                  <p className="text-xs text-muted-foreground">Xét nghiệm, hình ảnh, và dữ liệu khác</p>
                </div>
                {renderFormFields(investigationFields)}
              </TabsContent>
            </Tabs>

            <Button type="submit" disabled={isLoading} className="w-full h-12 text-base font-semibold gap-2">
              {isLoading ? (
                <>
                  <Loader2 className="h-5 w-5 animate-spin" />
                  Đang phân tích...
                </>
              ) : (
                <>
                  <Wand2 className="h-5 w-5" />
                  Phân tích bằng AI
                </>
              )}
            </Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}
