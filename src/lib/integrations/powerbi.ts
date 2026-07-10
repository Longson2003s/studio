/**
 * Power BI Integration Module
 * Handles Power BI connections and dashboard configuration
 */

interface PowerBIConfig {
  tenantId: string;
  clientId: string;
  clientSecret: string;
  workspaceId: string;
  datasetId: string;
}

interface DatasetRow {
  [key: string]: any;
}

class PowerBIIntegration {
  private config: PowerBIConfig;
  private accessToken: string | null = null;

  constructor(config: PowerBIConfig) {
    this.config = config;
  }

  /**
   * Get Power BI access token
   */
  async getAccessToken(): Promise<string> {
    if (this.accessToken) return this.accessToken;

    const url = `https://login.microsoftonline.com/${this.config.tenantId}/oauth2/v2.0/token`;
    const body = new URLSearchParams({
      client_id: this.config.clientId,
      client_secret: this.config.clientSecret,
      scope: 'https://analysis.windows.net/powerbi/api/.default',
      grant_type: 'client_credentials',
    });

    try {
      const response = await fetch(url, {
        method: 'POST',
        body: body.toString(),
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      });

      const data = await response.json();
      this.accessToken = data.access_token;
      return this.accessToken;
    } catch (error) {
      console.error('Failed to get Power BI access token:', error);
      throw error;
    }
  }

  /**
   * Push data to Power BI dataset
   */
  async pushDataToDataset(tableName: string, data: DatasetRow[]): Promise<void> {
    const token = await this.getAccessToken();
    const url = `https://api.powerbi.com/v1.0/myorg/groups/${this.config.workspaceId}/datasets/${this.config.datasetId}/tables/${tableName}/rows`;

    const payload = {
      rows: data,
    };

    try {
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        throw new Error(`Power BI API error: ${response.statusText}`);
      }
    } catch (error) {
      console.error('Failed to push data to Power BI:', error);
      throw error;
    }
  }

  /**
   * Refresh Power BI dataset
   */
  async refreshDataset(): Promise<void> {
    const token = await this.getAccessToken();
    const url = `https://api.powerbi.com/v1.0/myorg/groups/${this.config.workspaceId}/datasets/${this.config.datasetId}/refreshes`;

    try {
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({}),
      });

      if (!response.ok) {
        throw new Error(`Failed to refresh dataset: ${response.statusText}`);
      }
    } catch (error) {
      console.error('Failed to refresh Power BI dataset:', error);
      throw error;
    }
  }

  /**
   * Generate Power BI embed URL for reports
   */
  async generateEmbedUrl(reportId: string): Promise<string> {
    const token = await this.getAccessToken();
    const url = `https://api.powerbi.com/v1.0/myorg/groups/${this.config.workspaceId}/reports/${reportId}/GenerateToken`;

    try {
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          accessLevel: 'View',
          allowSaveAs: false,
        }),
      });

      const data = await response.json();
      return data.token;
    } catch (error) {
      console.error('Failed to generate embed URL:', error);
      throw error;
    }
  }
}

export default PowerBIIntegration;
