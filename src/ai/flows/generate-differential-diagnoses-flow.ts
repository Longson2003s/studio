'use server';
/**
 * @fileOverview A Genkit flow for ClinicWise AI that processes patient data to generate
 * a ranked list of probable differential diagnoses, along with recommended next steps,
 * suggested treatment protocols, warnings, and guideline citations.
 *
 * - generateDifferentialDiagnoses - The main function to call the AI flow.
 * - GenerateDifferentialDiagnosesInput - The input type for patient data.
 * - GenerateDifferentialDiagnosesOutput - The output type for the AI's recommendations.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

// Input Schema
const GenerateDifferentialDiagnosesInputSchema = z.object({
  patientDemographics: z.string().describe('Thông tin nhân khẩu học của bệnh nhân (tuổi, giới tính, tiền sử liên quan).'),
  presentingSymptoms: z.string().describe('Các triệu chứng hiện tại của bệnh nhân (triệu chứng chính, thời gian khởi phát, tính chất, triệu chứng kèm theo).'),
  medicalHistory: z.string().describe('Tiền sử bệnh án (tiền sử bệnh tật, thuốc đang dùng, dị ứng, tiền sử gia đình).'),
  physicalExamination: z.string().describe('Kết quả khám thực thể (các phát hiện chính từ khám lâm sàng).'),
  labResults: z.string().describe('Tóm tắt kết quả xét nghiệm liên quan.'),
  imagingResults: z.string().describe('Tóm tắt kết quả hình ảnh học liên quan.'),
  otherRelevantData: z.string().describe('Các dữ liệu khác có liên quan quan trọng.'),
});
export type GenerateDifferentialDiagnosesInput = z.infer<typeof GenerateDifferentialDiagnosesInputSchema>;

// Output Schema
const DifferentialDiagnosisSchema = z.object({
  diagnosis: z.string().describe('Tên chẩn đoán phân biệt.'),
  probability: z.number().min(0).max(1).describe('Mức độ tin cậy/xác suất của chẩn đoán này (từ 0 đến 1).'),
  assumptions: z.array(z.string()).describe('Các giả định được đưa ra do dữ kiện thiếu hoặc không rõ ràng.'),
});

const SuggestedTreatmentProtocolSchema = z.object({
  protocolName: z.string().describe('Tên phác đồ điều trị gợi ý.'),
  details: z.string().describe('Chi tiết phác đồ (liều lượng, cách dùng, non-pharmacological interventions).'),
  contraindications: z.string().describe('Các chống chỉ định quan trọng cần lưu ý.'),
});

const GenerateDifferentialDiagnosesOutputSchema = z.object({
  patientSummary: z.string().describe('1) TÓM TẮT BỆNH NHÂN (đủ dữ kiện ra quyết định).'),
  differentialDiagnoses: z.array(DifferentialDiagnosisSchema).describe('2) CHẨN ĐOÁN PHÂN BIỆT (xác suất, giả định).'),
  nextSteps: z.array(z.string()).describe('3) CẦN LÀM GÌ TIẾP (xét nghiệm/hình ảnh bổ sung, theo guideline). Nếu dữ kiện thiếu, hãy yêu cầu bổ sung cụ thể tại đây.'),
  suggestedTreatmentProtocols: z.array(SuggestedTreatmentProtocolSchema).describe('4) PHÁC ĐỒ GỢI Ý (Class/Level, chống chỉ định).'),
  warnings: z.array(z.string()).describe('5) CẢNH BÁO (tương tác thuốc, yếu tố nguy cơ).'),
  citations: z.array(z.string()).describe('6) TRÍCH DẪN (liên kết guideline, phiên bản).'),
});
export type GenerateDifferentialDiagnosesOutput = z.infer<typeof GenerateDifferentialDiagnosesOutputSchema>;

// Prompt Definition
const differentialDiagnosisPrompt = ai.definePrompt({
  name: 'differentialDiagnosisPrompt',
  input: { schema: GenerateDifferentialDiagnosesInputSchema },
  output: { schema: GenerateDifferentialDiagnosesOutputSchema },
  prompt: `Bạn là một hệ thống hỗ trợ quyết định lâm sàng (CDSS) chuyên nghiệp, hỗ trợ bác sĩ trong quá trình chẩn đoán và điều trị. Bạn sẽ phân tích các dữ kiện bệnh nhân được cung cấp và đưa ra các đề xuất theo cấu trúc JSON được định nghĩa bởi schema đầu ra.

Quan trọng:
- Không khẳng định chẩn đoán cuối cùng; vai trò của bạn là hỗ trợ quyết định.
- Nếu dữ kiện thiếu, hãy yêu cầu bổ sung cụ thể trong phần 'CẦN LÀM GÌ TIẾP'.
- Luôn ghi rõ các giả định của bạn và mức độ tin cậy cho từng chẩn đoán phân biệt (từ 0 đến 1).
- Trả lời bằng tiếng Việt.

Dữ kiện bệnh nhân:
Thông tin nhân khẩu học: {{{patientDemographics}}}
Triệu chứng hiện tại: {{{presentingSymptoms}}}
Tiền sử bệnh án: {{{medicalHistory}}}
Khám thực thể: {{{physicalExamination}}}
Kết quả xét nghiệm: {{{labResults}}}
Kết quả hình ảnh học: {{{imagingResults}}}
Dữ liệu liên quan khác: {{{otherRelevantData}}}
`,
});

// Flow Definition
const generateDifferentialDiagnosesFlow = ai.defineFlow(
  {
    name: 'generateDifferentialDiagnosesFlow',
    inputSchema: GenerateDifferentialDiagnosesInputSchema,
    outputSchema: GenerateDifferentialDiagnosesOutputSchema,
  },
  async (input) => {
    const { output } = await differentialDiagnosisPrompt(input);
    return output!;
  }
);

// Wrapper function
export async function generateDifferentialDiagnoses(input: GenerateDifferentialDiagnosesInput): Promise<GenerateDifferentialDiagnosesOutput> {
  return generateDifferentialDiagnosesFlow(input);
}
