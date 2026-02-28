'use server';

/**
 * @fileOverview A Genkit flow for the ClinicWise AI application that recommends diagnostic investigations.
 * This flow processes patient data and differential diagnoses to suggest relevant follow-up investigations
 * (laboratory tests, imaging studies, specialist consultations) based on clinical guidelines.
 *
 * - recommendDiagnosticInvestigations - The wrapper function to call the Genkit flow.
 * - RecommendDiagnosticInvestigationsInput - The input type for the flow.
 * - RecommendDiagnosticInvestigationsOutput - The return type for the flow.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

// Input Schema
const RecommendDiagnosticInvestigationsInputSchema = z.object({
  patientContext: z.string().describe(`A comprehensive summary of the patient's current situation,
  including demographics, presenting symptoms, relevant medical history, key examination findings,
  and any initial lab results. Crucially, this also includes the previously generated
  differential diagnoses with their estimated probabilities and underlying assumptions.

  Example of patientContext content:
  "Bệnh nhân nữ, 45 tuổi, vào viện vì đau ngực trái khởi phát 2 giờ, đau kiểu đè ép, lan lên vai trái, kèm khó thở, vã mồ hôi.
  Tiền sử tăng huyết áp 5 năm, không điều trị thường xuyên, hút thuốc lá 10 gói-năm.
  Khám: Huyết áp 150/90 mmHg, nhịp tim 95 lần/phút, phổi trong, tim đều, T1T2 rõ.
  ECG: ST chênh lên V2-V5. Men tim (Troponin I) ban đầu tăng nhẹ (0.1 ng/mL, ngưỡng bình thường <0.04 ng/mL).
  Chẩn đoán phân biệt:
  1. Nhồi máu cơ tim cấp (xác suất 0.9, giả định: đau ngực điển hình, thay đổi ECG, men tim tăng, tiền sử yếu tố nguy cơ tim mạch)
  2. Viêm màng ngoài tim cấp (xác suất 0.05, giả định: loại trừ do ECG không có ST chênh lên lan tỏa, không có tiếng cọ màng ngoài tim)
  3. Đau thần kinh liên sườn (xác suất 0.03, giả định: loại trừ do có biến đổi trên ECG và men tim đặc hiệu)"`),
});
export type RecommendDiagnosticInvestigationsInput = z.infer<typeof RecommendDiagnosticInvestigationsInputSchema>;

// Output Schema
const RecommendDiagnosticInvestigationsOutputSchema = z.object({
  patientSummary: z.string().describe('TÓM TẮT BỆNH NHÂN (đủ dữ kiện ra quyết định). Tóm tắt ngắn gọn các dữ kiện quan trọng nhất từ patientContext.'),
  differentialDiagnosesSummary: z.string().describe('CHẨN ĐOÁN PHÂN BIỆT (xác suất, giả định). Liệt kê lại các chẩn đoán phân biệt đã được xác định, cùng với xác suất và giả định được sử dụng.'),
  investigations: z.object({
    recommendations: z.array(z.object({
      type: z.enum(['Xét nghiệm', 'Chẩn đoán hình ảnh', 'Thăm vấn chuyên khoa', 'Thủ thuật', 'Khác']).describe('Loại hình khuyến nghị: Xét nghiệm, Chẩn đoán hình ảnh, Thăm vấn chuyên khoa, Thủ thuật hoặc Khác.'),
      name: z.string().describe('Tên cụ thể của xét nghiệm, kỹ thuật chẩn đoán hình ảnh, tên chuyên khoa cần tham vấn hoặc thủ thuật đề xuất.'),
      justification: z.string().describe('Lý do cụ thể cho việc đề xuất khuyến nghị này, liên quan trực tiếp đến các chẩn đoán phân biệt hoặc để thu thập thêm dữ liệu quan trọng.'),
      certainty: z.number().min(0).max(1).describe('Mức độ tin cậy (0-1) của khuyến nghị này. 1 là rất tin cậy, 0 là ít tin cậy.'),
      assumptions: z.string().optional().describe('Các giả định được đưa ra nếu có dữ kiện còn thiếu hoặc không rõ ràng, ảnh hưởng đến khuyến nghị.'),
      guidelineReferences: z.array(z.string()).optional().describe('Danh sách các liên kết hoặc mã định danh của các guideline y khoa quốc tế hoặc quốc gia hỗ trợ cho khuyến nghị này.')
    })).describe('Các đề xuất xét nghiệm/hình ảnh bổ sung, thăm vấn chuyên khoa hoặc thủ thuật cần thiết, được xây dựng dựa trên clinical guideline hiện hành.'),
    missingDataRequest: z.string().optional().describe('Nếu dữ kiện bệnh nhân thiếu để đưa ra khuyến nghị đầy đủ hoặc tối ưu, hãy nêu cụ thể những dữ kiện cần bổ sung để cải thiện độ chính xác và tin cậy của các khuyến nghị.'),
  }).describe('CẦN LÀM GÌ TIẾP (xét nghiệm/hình ảnh bổ sung, theo guideline). Phần này tập trung vào các bước tiếp theo để làm rõ chẩn đoán và hướng điều trị.'),
  suggestedTreatmentProtocols: z.string().describe('PHÁC ĐỒ GỢI Ý (Class/Level, chống chỉ định). Gợi ý sơ bộ các phác đồ điều trị có thể áp dụng dựa trên dữ liệu hiện có và chẩn đoán phân biệt. Nêu rõ Class/Level của khuyến nghị (nếu có) và các chống chỉ định tiềm năng. Nếu không đủ dữ liệu để gợi ý, nêu rõ "Cần thêm dữ liệu để đưa ra phác đồ gợi ý cụ thể."'),
  warnings: z.string().describe('CẢNH BÁO (tương tác thuốc, yếu tố nguy cơ). Các cảnh báo quan trọng về tương tác thuốc tiềm ẩn, các yếu tố nguy cơ đặc biệt của bệnh nhân hoặc các điểm cần lưu ý khác. Nếu không có cảnh báo nào đáng kể dựa trên dữ liệu hiện tại, ghi rõ "Không có cảnh báo đặc biệt."'),
  citations: z.array(z.string()).describe('TRÍCH DẪN (liên kết guideline, phiên bản). Các liên kết hoặc tên đầy đủ và phiên bản của các guideline, tài liệu y khoa đã được tham khảo để đưa ra các khuyến nghị và thông tin trong phản hồi. Ví dụ: ["ESC Guidelines for Myocardial Revascularization 2018 (phiên bản cập nhật)", "AHA/ACC Guideline for the Management of Patients With Acute Coronary Syndromes 2014 (phiên bản cập nhật)"].'),
});
export type RecommendDiagnosticInvestigationsOutput = z.infer<typeof RecommendDiagnosticInvestigationsOutputSchema>;


// Prompt Definition
const recommendDiagnosticInvestigationsPrompt = ai.definePrompt({
  name: 'recommendDiagnosticInvestigationsPrompt',
  input: { schema: RecommendDiagnosticInvestigationsInputSchema },
  output: { schema: RecommendDiagnosticInvestigationsOutputSchema },
  prompt: `Bạn là Hệ thống Hỗ trợ Quyết định Lâm sàng (CDSS) hỗ trợ bác sĩ. Nhiệm vụ của bạn là đưa ra các khuyến nghị về xét nghiệm, chẩn đoán hình ảnh, thăm vấn chuyên khoa và thủ thuật dựa trên dữ liệu bệnh nhân và các chẩn đoán phân biệt đã có.
Trả lời bằng tiếng Việt, theo cấu trúc JSON đã được mô tả trong schema đầu ra. Đảm bảo điền đầy đủ và chính xác tất cả các trường.

**Hướng dẫn quan trọng:**
1.  **Không khẳng định chẩn đoán:** Chức năng của bạn là hỗ trợ quyết định, không phải đưa ra chẩn đoán cuối cùng.
2.  **Yêu cầu dữ kiện bổ sung:** Nếu thông tin trong 'patientContext' không đủ để đưa ra khuyến nghị rõ ràng hoặc tối ưu, hãy nêu cụ thể những dữ kiện cần bổ sung trong trường 'missingDataRequest' trong phần 'investigations'.
3.  **Ghi rõ giả định và mức độ tin cậy:** Đối với mỗi khuyến nghị hoặc phần thông tin quan trọng, luôn ghi rõ các giả định bạn đã đưa ra (nếu có) và mức độ tin cậy (0–1) của khuyến nghị đó.
4.  **Tuân thủ Guideline:** Các khuyến nghị phải dựa trên các guideline y khoa hiện hành. Cung cấp trích dẫn cụ thể (liên kết hoặc tên guideline đầy đủ) khi thích hợp.

**Dữ kiện bệnh nhân và các chẩn đoán phân biệt đã có:**
\`\`\`
{{{patientContext}}}
\`\`\`

Dựa trên những thông tin trên, hãy phân tích và đưa ra phản hồi theo cấu trúc JSON yêu cầu. Tập trung đặc biệt vào phần "CẦN LÀM GÌ TIẾP" (investigations) để đề xuất các bước chẩn đoán tiếp theo.`
});

// Flow Definition
const recommendDiagnosticInvestigationsFlow = ai.defineFlow(
  {
    name: 'recommendDiagnosticInvestigationsFlow',
    inputSchema: RecommendDiagnosticInvestigationsInputSchema,
    outputSchema: RecommendDiagnosticInvestigationsOutputSchema,
  },
  async (input) => {
    const { output } = await recommendDiagnosticInvestigationsPrompt(input);
    if (!output) {
      throw new Error('Failed to generate diagnostic investigations recommendations.');
    }
    return output;
  }
);

// Wrapper function
export async function recommendDiagnosticInvestigations(
  input: RecommendDiagnosticInvestigationsInput
): Promise<RecommendDiagnosticInvestigationsOutput> {
  return recommendDiagnosticInvestigationsFlow(input);
}
