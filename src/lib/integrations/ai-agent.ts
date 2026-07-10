/**
 * AI Agent Module
 * Handles AI-powered chatbot and interactive analysis
 */

import { genkit, defineFlow, defineStreamingFlow } from 'genkit';
import { googleAI } from '@genkit-ai/google-genai';

interface Message {
  role: 'user' | 'assistant';
  content: string;
}

interface AgentContext {
  conversationHistory: Message[];
  patientData?: any;
  systemPrompt: string;
}

class AIAgent {
  private context: AgentContext;
  private model: string = 'gemini-1.5-pro';

  constructor(patientData?: any) {
    this.context = {
      conversationHistory: [],
      patientData,
      systemPrompt: `Bạn là một trợ lý AI chuyên về y tế, giúp bác sĩ phân tích dữ liệu bệnh nhân và đưa ra những gợi ý chuyên môn.
      
Bạn có các khả năng:
1. Trả lời câu hỏi về triệu chứng và bệnh
2. Phân tích dữ liệu bệnh nhân
3. Đề xuất các xét nghiệm cần thiết
4. Giới thiệu các phác đồ điều trị
5. Cập nhật thông tin y tế mới nhất

Luôn nhớ:
- Không thay thế quyết định của bác sĩ
- Luôn khuyến khích bác sĩ tham khảo chuyên gia
- Giữ bí mật thông tin bệnh nhân
- Tuân theo các tiêu chuẩn y tế quốc tế`,
    };
  }

  /**
   * Send message to AI Agent
   */
  async chat(userMessage: string): Promise<string> {
    this.context.conversationHistory.push({
      role: 'user',
      content: userMessage,
    });

    const messages = this.context.conversationHistory.map((msg) => ({
      role: msg.role,
      content: msg.content,
    }));

    try {
      const response = await fetch('/api/ai/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          messages,
          systemPrompt: this.context.systemPrompt,
          model: this.model,
        }),
      });

      const data = await response.json();
      const assistantMessage = data.message;

      this.context.conversationHistory.push({
        role: 'assistant',
        content: assistantMessage,
      });

      return assistantMessage;
    } catch (error) {
      console.error('AI Agent error:', error);
      throw error;
    }
  }

  /**
   * Analyze patient data with AI
   */
  async analyzePatient(patientData: any): Promise<string> {
    const analysisPrompt = `Phân tích dữ liệu bệnh nhân sau:
    
${JSON.stringify(patientData, null, 2)}

Cung cấp một phân tích chi tiết bao gồm:
1. Tóm tắt tình trạng hiện tại
2. Các yếu tố nguy hiểm
3. Các khuyến nghị về xét nghiệm
4. Các phác đồ điều trị có thể`;

    return this.chat(analysisPrompt);
  }

  /**
   * Medical question answering
   */
  async answerMedicalQuestion(question: string): Promise<string> {
    const medicalPrompt = `Trả lời câu hỏi y tế sau đây: ${question}
    
Cung cấp câu trả lời chính xác, chi tiết và dễ hiểu cho các bác sĩ.`;

    return this.chat(medicalPrompt);
  }

  /**
   * Smart patient search suggestions
   */
  async suggestPatientSearch(searchTerm: string): Promise<string[]> {
    const suggestionPrompt = `Đưa ra gợi ý tìm kiếm bệnh nhân dựa trên: "${searchTerm}"
    
Trả về các gợi ý bằng JSON array format: ["suggestion1", "suggestion2", ...]`;

    const response = await this.chat(suggestionPrompt);
    
    try {
      const suggestions = JSON.parse(response);
      return suggestions;
    } catch {
      return [searchTerm];
    }
  }

  /**
   * Get conversation history
   */
  getHistory(): Message[] {
    return this.context.conversationHistory;
  }

  /**
   * Clear conversation history
   */
  clearHistory(): void {
    this.context.conversationHistory = [];
  }

  /**
   * Set patient data for context
   */
  setPatientData(patientData: any): void {
    this.context.patientData = patientData;
  }

  /**
   * Get conversation context
   */
  getContext(): AgentContext {
    return this.context;
  }
}

export default AIAgent;
