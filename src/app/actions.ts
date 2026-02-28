
'use server';

import { 
  generateDifferentialDiagnoses, 
  type GenerateDifferentialDiagnosesInput, 
  type GenerateDifferentialDiagnosesOutput 
} from '@/ai/flows/generate-differential-diagnoses-flow';
import { z } from 'zod';

const inputSchema = z.object({
  patientDemographics: z.string().min(1, "Thông tin nhân khẩu học là bắt buộc."),
  presentingSymptoms: z.string().min(1, "Triệu chứng hiện tại là bắt buộc."),
  medicalHistory: z.string(),
  physicalExamination: z.string(),
  labResults: z.string(),
  imagingResults: z.string(),
  otherRelevantData: z.string(),
});

export async function getAIDiagnosis(input: GenerateDifferentialDiagnosesInput): Promise<{ success: true; data: GenerateDifferentialDiagnosesOutput } | { success: false; error: string }> {
  const parsedInput = inputSchema.safeParse(input);

  if (!parsedInput.success) {
    const errorMessage = parsedInput.error.issues.map(e => e.message).join('\n');
    return { success: false, error: errorMessage };
  }

  try {
    const result = await generateDifferentialDiagnoses(parsedInput.data);
    return { success: true, data: result };
  } catch (error) {
    console.error("Error in getAIDiagnosis server action:", error);
    return { success: false, error: "Đã xảy ra lỗi khi tạo chẩn đoán. Vui lòng thử lại." };
  }
}
