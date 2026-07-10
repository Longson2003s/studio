/**
 * Excel Integration Module
 * Handles export/import of patient data and automated report generation
 */

import * as XLSX from 'xlsx';

interface PatientData {
  id: string;
  name: string;
  age: number;
  gender: string;
  diagnosis: string;
  status: string;
  date: string;
}

/**
 * Export patient data to Excel
 */
export function exportPatientsToExcel(patients: PatientData[], fileName: string = 'patients.xlsx') {
  const worksheet = XLSX.utils.json_to_sheet(patients);
  const workbook = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(workbook, worksheet, 'Patients');
  
  // Add formatting
  worksheet['!cols'] = [
    { wch: 12 },
    { wch: 20 },
    { wch: 8 },
    { wch: 10 },
    { wch: 25 },
    { wch: 12 },
    { wch: 12 },
  ];

  XLSX.writeFile(workbook, fileName);
}

/**
 * Export diagnosis results to Excel
 */
export function exportDiagnosisReport(
  diagnosis: any,
  patientName: string,
  fileName: string = 'diagnosis-report.xlsx'
) {
  const wb = XLSX.utils.book_new();

  // Summary sheet
  const summaryData = [
    ['Báo cáo chẩn đoán', ''],
    ['Bệnh nhân', patientName],
    ['Ngày', new Date().toLocaleDateString('vi-VN')],
    ['', ''],
    ['Chẩn đoán hàng đầu', diagnosis.differentialDiagnoses[0]?.diagnosis || 'N/A'],
    ['Xác suất', `${(diagnosis.differentialDiagnoses[0]?.probability || 0) * 100}%`],
  ];
  const summarySheet = XLSX.utils.aoa_to_sheet(summaryData);
  XLSX.utils.book_append_sheet(wb, summarySheet, 'Tóm tắt');

  // Diagnoses sheet
  const diagnosisData = diagnosis.differentialDiagnoses.map((d: any) => ({
    'Chẩn đoán': d.diagnosis,
    'Xác suất': `${(d.probability * 100).toFixed(1)}%`,
    'Giả định': d.assumptions.join(', '),
  }));
  const diagnosisSheet = XLSX.utils.json_to_sheet(diagnosisData);
  XLSX.utils.book_append_sheet(wb, diagnosisSheet, 'Chẩn đoán phân biệt');

  // Treatment protocols sheet
  const treatmentData = diagnosis.suggestedTreatmentProtocols.map((p: any) => ({
    'Tên phác đồ': p.protocolName,
    'Chi tiết': p.details,
    'Chống chỉ định': p.contraindications || 'Không có',
  }));
  const treatmentSheet = XLSX.utils.json_to_sheet(treatmentData);
  XLSX.utils.book_append_sheet(wb, treatmentSheet, 'Phác đồ điều trị');

  // Next steps sheet
  const nextStepsData = diagnosis.nextSteps.map((step: string, idx: number) => ({
    'Bước': idx + 1,
    'Hành động': step,
  }));
  const nextStepsSheet = XLSX.utils.json_to_sheet(nextStepsData);
  XLSX.utils.book_append_sheet(wb, nextStepsSheet, 'Bước tiếp theo');

  XLSX.writeFile(wb, fileName);
}

/**
 * Parse Excel file and return data
 */
export async function parseExcelFile(file: File): Promise<PatientData[]> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      try {
        const data = new Uint8Array(e.target?.result as ArrayBuffer);
        const workbook = XLSX.read(data, { type: 'array' });
        const worksheet = workbook.Sheets[workbook.SheetNames[0]];
        const jsonData = XLSX.utils.sheet_to_json(worksheet);
        resolve(jsonData as PatientData[]);
      } catch (error) {
        reject(error);
      }
    };
    reader.readAsArrayBuffer(file);
  });
}

/**
 * Generate analytics report
 */
export function generateAnalyticsReport(
  stats: any,
  fileName: string = 'analytics-report.xlsx'
) {
  const wb = XLSX.utils.book_new();

  // Summary
  const summaryData = [
    ['Báo cáo thống kê', ''],
    ['Ngày tạo', new Date().toLocaleDateString('vi-VN')],
    ['', ''],
  ];
  const summarySheet = XLSX.utils.aoa_to_sheet(summaryData);
  XLSX.utils.book_append_sheet(wb, summarySheet, 'Tóm tắt');

  XLSX.writeFile(wb, fileName);
}
