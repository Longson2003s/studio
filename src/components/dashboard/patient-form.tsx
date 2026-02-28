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

  const fields = [
    { name: 'patientDemographics', label: 'Thông tin nhân khẩu học', placeholder: 'VD: Bệnh nhân nam, 58 tuổi, tiền sử tăng huyết áp...' },
    { name: 'presentingSymptoms', label: 'Triệu chứng hiện tại', placeholder: 'VD: Đau ngực trái sau xương ức, kéo dài 30 phút...' },
    { name: 'medicalHistory', label: 'Tiền sử bệnh án', placeholder: 'VD: Tăng huyết áp 10 năm, đái tháo đường type 2...' },
    { name: 'physicalExamination', label: 'Khám thực thể', placeholder: 'VD: Mạch 100 l/p, HA 160/90 mmHg, phổi thông khí rõ...' },
    { name: 'labResults', label: 'Kết quả xét nghiệm', placeholder: 'VD: Troponin T tăng, CK-MB tăng...' },
    { name: 'imagingResults', label: 'Kết quả hình ảnh học', placeholder: 'VD: X-quang ngực thẳng: bóng tim to...' },
    { name: 'otherRelevantData', label: 'Dữ liệu liên quan khác', placeholder: 'VD: ECG: ST chênh lên ở V1-V4...' },
  ] as const;

  return (
    <Card>
      <CardHeader>
        <CardTitle className="font-headline text-2xl">Thông tin bệnh nhân</CardTitle>
        <CardDescription>Nhập dữ liệu lâm sàng để AI phân tích và đưa ra gợi ý.</CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            {fields.map((fieldInfo) => (
              <FormField
                key={fieldInfo.name}
                control={form.control}
                name={fieldInfo.name}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>{fieldInfo.label}</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder={fieldInfo.placeholder}
                        rows={fieldInfo.name === 'presentingSymptoms' || fieldInfo.name === 'patientDemographics' ? 3 : 2}
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            ))}
            <Button type="submit" disabled={isLoading} className="w-full">
              {isLoading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Đang phân tích...
                </>
              ) : (
                <>
                  <Wand2 className="mr-2 h-4 w-4" />
                  Tạo chẩn đoán
                </>
              )}
            </Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}
