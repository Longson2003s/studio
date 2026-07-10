/**
 * Power Automate Integration Module
 * Handles automated workflows and notifications
 */

interface WebhookPayload {
  [key: string]: any;
}

interface AutomationTrigger {
  type: 'email' | 'ticket' | 'teams' | 'slack' | 'calendar';
  payload: WebhookPayload;
}

class PowerAutomateIntegration {
  private webhookUrl: string;

  constructor(webhookUrl: string) {
    this.webhookUrl = webhookUrl;
  }

  /**
   * Send diagnosis alert via email
   */
  async sendDiagnosisAlert(
    email: string,
    patientName: string,
    diagnosis: string,
    urgency: 'low' | 'medium' | 'high'
  ): Promise<void> {
    const payload: AutomationTrigger = {
      type: 'email',
      payload: {
        to: email,
        subject: `[${urgency.toUpperCase()}] Chẩn đoán mới: ${diagnosis}`,
        body: `Bệnh nhân: ${patientName}\nChẩn đoán: ${diagnosis}\nMức độ: ${urgency}`,
        timestamp: new Date().toISOString(),
      },
    };

    await this.triggerWorkflow(payload);
  }

  /**
   * Create support ticket
   */
  async createSupportTicket(
    title: string,
    description: string,
    priority: 'low' | 'medium' | 'high' | 'critical',
    assignee?: string
  ): Promise<void> {
    const payload: AutomationTrigger = {
      type: 'ticket',
      payload: {
        title,
        description,
        priority,
        assignee,
        createdAt: new Date().toISOString(),
      },
    };

    await this.triggerWorkflow(payload);
  }

  /**
   * Send Teams notification
   */
  async sendTeamsNotification(
    channelId: string,
    title: string,
    message: string,
    color: string = '#0078D4'
  ): Promise<void> {
    const payload: AutomationTrigger = {
      type: 'teams',
      payload: {
        channelId,
        title,
        message,
        color,
        timestamp: new Date().toISOString(),
      },
    };

    await this.triggerWorkflow(payload);
  }

  /**
   * Send Slack notification
   */
  async sendSlackNotification(
    channel: string,
    text: string,
    blocks?: any[]
  ): Promise<void> {
    const payload: AutomationTrigger = {
      type: 'slack',
      payload: {
        channel,
        text,
        blocks: blocks || [],
        timestamp: new Date().toISOString(),
      },
    };

    await this.triggerWorkflow(payload);
  }

  /**
   * Schedule appointment
   */
  async scheduleAppointment(
    patientEmail: string,
    patientName: string,
    doctorName: string,
    appointmentDateTime: Date,
    reason: string
  ): Promise<void> {
    const payload: AutomationTrigger = {
      type: 'calendar',
      payload: {
        patientEmail,
        patientName,
        doctorName,
        appointmentDateTime: appointmentDateTime.toISOString(),
        reason,
      },
    };

    await this.triggerWorkflow(payload);
  }

  /**
   * Trigger Power Automate workflow via webhook
   */
  private async triggerWorkflow(trigger: AutomationTrigger): Promise<void> {
    try {
      const response = await fetch(this.webhookUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(trigger),
      });

      if (!response.ok) {
        throw new Error(`Webhook error: ${response.statusText}`);
      }

      console.log(`Power Automate workflow triggered: ${trigger.type}`);
    } catch (error) {
      console.error('Failed to trigger Power Automate workflow:', error);
      throw error;
    }
  }

  /**
   * Generate report and send via email
   */
  async generateAndSendReport(
    email: string,
    reportType: string,
    data: any
  ): Promise<void> {
    const payload: AutomationTrigger = {
      type: 'email',
      payload: {
        to: email,
        subject: `Báo cáo ${reportType} - ${new Date().toLocaleDateString('vi-VN')}`,
        reportType,
        data,
        timestamp: new Date().toISOString(),
      },
    };

    await this.triggerWorkflow(payload);
  }
}

export default PowerAutomateIntegration;
