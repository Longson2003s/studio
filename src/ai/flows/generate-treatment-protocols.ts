'use server';
/**
 * @fileOverview A Genkit flow for recommending evidence-based treatment protocols.
 *
 * - generateTreatmentProtocols - A function that handles the generation of treatment protocols.
 * - GenerateTreatmentProtocolsInput - The input type for the generateTreatmentProtocols function.
 * - GenerateTreatmentProtocolsOutput - The return type for the generateTreatmentProtocols function.
 */

import { ai } from '@/ai/genkit';
import { z } from 'genkit';

const GenerateTreatmentProtocolsInputSchema = z.object({
  patientDemographics: z.object({
    age: z.number().int().min(0).describe("Tuổi của bệnh nhân."),
    gender: z.enum(['male', 'female', 'other']).optional().describe("Giới tính của bệnh nhân."),
    weightKg: z.number().positive().optional().describe("Cân nặng của bệnh nhân (kg)."),
    heightCm: z.number().positive().optional().describe("Chiều cao của bệnh nhân (cm)."),
  }).optional().describe("Thông tin nhân khẩu học của bệnh nhân."),
  medicalHistory: z.array(z.string()).optional().describe("Lịch sử bệnh lý của bệnh nhân (ví dụ: tiểu đường, tăng huyết áp, bệnh tim mạch)."),
  allergies: z.array(z.string()).optional().describe("Các dị ứng đã biết của bệnh nhân."),
  currentMedications: z.array(z.string()).optional().describe("Các thuốc bệnh nhân đang sử dụng."),
  presentingSymptoms: z.array(z.string()).describe("Các triệu chứng hiện tại của bệnh nhân."),
  examinationFindings: z.array(z.string()).optional().describe("Kết quả khám lâm sàng."),
  labResults: z.array(z.string()).optional().describe("Kết quả xét nghiệm và cận lâm sàng quan trọng."),
  confirmedDiagnosis: z.string().describe("Chẩn đoán đã được làm rõ hoặc ưu tiên nhất để lên phác đồ điều trị. VD: 'Viêm phổi cộng đồng mức độ trung bình'"),
});
export type GenerateTreatmentProtocolsInput = z.infer<typeof GenerateTreatmentProtocolsInputSchema>;

const GenerateTreatmentProtocolsOutputSchema = z.object({
  patientSummary: z.string().describe("TÓM TẮT BỆNH NHÂN: Tóm tắt các dữ kiện quan trọng về bệnh nhân (tuổi, giới tính, tiền sử, dị ứng, thuốc hiện dùng, triệu chứng chính, chẩn đoán xác định) cần thiết cho việc ra quyết định điều trị."),
  diagnosisContext: z.object({
    statement: z.string().describe("CHẨN ĐOÁN (đã rõ): Ghi nhận chẩn đoán chính đã được làm rõ hoặc ưu tiên nhất để lên phác đồ điều trị."),
    assumptions: z.array(z.string()).optional().describe("Các giả định được đưa ra do dữ kiện thiếu hoặc không rõ ràng, ảnh hưởng đến phác đồ điều trị."),
    confidenceLevel: z.number().min(0).max(1).optional().describe("Mức độ tin cậy của chẩn đoán (từ 0 đến 1) nếu có thông tin."),
  }).describe("Bối cảnh chẩn đoán, không khẳng định mà chỉ hỗ trợ quyết định dựa trên thông tin cung cấp."),
  suggestedFurtherInvestigations: z.array(z.object({
    type: z.enum(['lab_test', 'imaging', 'consultation', 'other']).describe("Loại xét nghiệm/chẩn đoán bổ sung (ví dụ: xét nghiệm, hình ảnh, hội chẩn)"),
    description: z.string().describe("Mô tả chi tiết về xét nghiệm hoặc hành động cần thực hiện."),
    rationale: z.string().optional().describe("Lý do cho khuyến nghị này, liên quan đến việc tối ưu hóa phác đồ điều trị."),
  })).optional().describe("CẦN LÀM GÌ TIẾP (nếu có): Các xét nghiệm/hình ảnh bổ sung hoặc hội chẩn cần thiết để hoàn thiện phác đồ điều trị hoặc theo dõi. Ghi rõ giả định và mức độ tin cậy (0-1)."),
  suggestedTreatmentProtocol: z.object({
    medicationSuggestions: z.array(z.object({
      name: z.string().describe("Tên thuốc."),
      dosage: z.string().describe("Liều lượng và tần suất (ví dụ: 500mg x 2 lần/ngày)."),
      administration: z.string().describe("Cách dùng (ví dụ: uống, tiêm tĩnh mạch, bôi ngoài da)."),
      classLevel: z.string().optional().describe("Phân loại hoặc mức độ khuyến nghị theo guideline (ví dụ: Class I, Level A)."),
      notes: z.string().optional().describe("Lưu ý đặc biệt khi sử dụng thuốc (ví dụ: cần theo dõi chức năng thận, uống sau ăn)."),
    })).describe("Đề xuất các loại thuốc bao gồm tên, liều lượng, cách dùng, và mức độ khuyến nghị."),
    nonPharmacologicalInterventions: z.array(z.object({
      type: z.string().describe("Loại can thiệp không dùng thuốc (ví dụ: thay đổi lối sống, vật lý trị liệu, tư vấn tâm lý)."),
      description: z.string().describe("Mô tả chi tiết can thiệp và mục tiêu."),
      rationale: z.string().optional().describe("Lý do cho can thiệp này và bằng chứng hỗ trợ."),
    })).describe("Đề xuất các can thiệp không dùng thuốc."),
    contraindications: z.array(z.object({
      item: z.string().describe("Yếu tố chống chỉ định (ví dụ: thuốc X, bệnh gan nặng)."),
      reason: z.string().describe("Lý do cụ thể chống chỉ định."),
    })).describe("Các chống chỉ định tiềm ẩn cần lưu ý đối với phác đồ điều trị này."),
  }).describe("PHÁC ĐỒ GỢI Ý: Đề xuất phác đồ điều trị dựa trên bằng chứng, bao gồm thuốc, can thiệp không dùng thuốc và chống chỉ định."),
  warnings: z.array(z.object({
    type: z.enum(['drugInteraction', 'riskFactor', 'allergyRisk', 'other']).describe("Loại cảnh báo (ví dụ: tương tác thuốc, yếu tố nguy cơ, nguy cơ dị ứng)"),
    description: z.string().describe("Mô tả chi tiết cảnh báo và mức độ nghiêm trọng."),
    associatedItems: z.array(z.string()).optional().describe("Các yếu tố liên quan đến cảnh báo (ví dụ: tên thuốc gây tương tác)."),
  })).describe("CẢNH BÁO: Tương tác thuốc tiềm ẩn, yếu tố nguy cơ, hoặc các cảnh báo quan trọng khác liên quan đến bệnh nhân và phác đồ điều trị."),
  citations: z.array(z.object({
    title: z.string().describe("Tên guideline hoặc tài liệu tham khảo."),
    version: z.string().optional().describe("Phiên bản hoặc ngày phát hành."),
    url: z.string().url().optional().describe("Liên kết (URL) đến guideline hoặc tài liệu tham khảo."),
  })).describe("TRÍCH DẪN: Các liên kết đến guideline hoặc tài liệu tham khảo đã sử dụng để đưa ra khuyến nghị."),
});
export type GenerateTreatmentProtocolsOutput = z.infer<typeof GenerateTreatmentProtocolsOutputSchema>;

export async function generateTreatmentProtocols(input: GenerateTreatmentProtocolsInput): Promise<GenerateTreatmentProtocolsOutput> {
  return generateTreatmentProtocolsFlow(input);
}

const prompt = ai.definePrompt({
  name: 'generateTreatmentProtocolsPrompt',
  input: { schema: GenerateTreatmentProtocolsInputSchema },
  output: { schema: GenerateTreatmentProtocolsOutputSchema },
  prompt: `Bạn là hệ thống hỗ trợ quyết định lâm sàng (CDSS) cho bác sĩ. Nhiệm vụ của bạn là phân tích dữ liệu bệnh nhân và chẩn đoán đã được cung cấp để đề xuất phác đồ điều trị dựa trên bằng chứng.
Đảm bảo đầu ra của bạn tuân thủ nghiêm ngặt các hướng dẫn sau:
-   **Ngôn ngữ**: Toàn bộ nội dung trả lời phải bằng tiếng Việt.
-   **Cấu trúc**: Phải tuân thủ cấu trúc nội dung đã được xác định rõ trong các trường JSON đầu ra, với mỗi trường tương ứng với một phần của báo cáo hỗ trợ quyết định.
-   **Độ chính xác và thận trọng**:
    *   Tuyệt đối không khẳng định chẩn đoán; đây là một công cụ hỗ trợ quyết định, không phải là một chẩn đoán y tế cuối cùng.
    *   Nếu có bất kỳ dữ kiện nào thiếu hoặc không rõ ràng, hãy ghi rõ các giả định được đưa ra và mức độ tin cậy của chẩn đoán hoặc khuyến nghị (từ 0 đến 1, nếu có thể ước tính). Nếu dữ liệu quá thiếu để đưa ra khuyến nghị hợp lý, hãy yêu cầu bổ sung dữ kiện cụ thể.
    *   Luôn tham chiếu các guideline và tài liệu y khoa có liên quan.

Dữ liệu bệnh nhân và chẩn đoán đã rõ:

**Thông tin nhân khẩu học:**
{{#if patientDemographics}}
  {{#if patientDemographics.age}}Tuổi: {{{patientDemographics.age}}} 
  {{/if}}
  {{#if patientDemographics.gender}}Giới tính: {{{patientDemographics.gender}}} 
  {{/if}}
  {{#if patientDemographics.weightKg}}Cân nặng: {{{patientDemographics.weightKg}}} kg 
  {{/if}}
  {{#if patientDemographics.heightCm}}Chiều cao: {{{patientDemographics.heightCm}}} cm 
  {{/if}}
{{else}}Không có thông tin nhân khẩu học chi tiết.{{/if}}

**Tiền sử bệnh lý:**
{{#if medicalHistory}}
  {{#each medicalHistory}}- {{{this}}} 
  {{/each}}
{{else}}Không có tiền sử bệnh lý.{{/if}}

**Dị ứng:**
{{#if allergies}}
  {{#each allergies}}- {{{this}}} 
  {{/each}}
{{else}}Không có thông tin dị ứng.{{/if}}

**Thuốc đang dùng:**
{{#if currentMedications}}
  {{#each currentMedications}}- {{{this}}} 
  {{/each}}
{{else}}Không có thông tin thuốc đang dùng.{{/if}}

**Triệu chứng hiện tại:**
{{#each presentingSymptoms}}- {{{this}}} 
{{/each}}

**Kết quả khám lâm sàng:**
{{#if examinationFindings}}
  {{#each examinationFindings}}- {{{this}}} 
  {{/each}}
{{else}}Không có kết quả khám lâm sàng.{{/if}}

**Kết quả xét nghiệm/cận lâm sàng:**
{{#if labResults}}
  {{#each labResults}}- {{{this}}} 
  {{/each}}
{{else}}Không có kết quả xét nghiệm/cận lâm sàng.{{/if}}

**Chẩn đoán đã rõ (hoặc ưu tiên):** {{{confirmedDiagnosis}}}

Dựa trên thông tin trên, hãy tạo một đối tượng JSON tuân thủ schema đầu ra đã được cung cấp, điền đầy đủ các trường bằng tiếng Việt. Đặc biệt chú ý đến các yêu cầu về tóm tắt bệnh nhân, bối cảnh chẩn đoán, các bước tiếp theo, phác đồ điều trị gợi ý, cảnh báo và trích dẫn.`,
});

const generateTreatmentProtocolsFlow = ai.defineFlow(
  {
    name: 'generateTreatmentProtocolsFlow',
    inputSchema: GenerateTreatmentProtocolsInputSchema,
    outputSchema: GenerateTreatmentProtocolsOutputSchema,
  },
  async (input) => {
    const { output } = await prompt(input);
    return output!;
  },
);
