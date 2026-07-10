'use client';

import { useState } from 'react';
import type { GenerateDifferentialDiagnosesOutput, GenerateDifferentialDiagnosesInput } from '@/ai/flows/generate-differential-diagnoses-flow';
import { getAIDiagnosis } from '@/app/actions';
import { PatientForm } from '@/components/dashboard/patient-form';
import { DiagnosisResults } from '@/components/dashboard/diagnosis-results';
import { ResultsPlaceholder } from '@/components/dashboard/results-placeholder';
import { ResultsSkeleton } from '@/components/dashboard/results-skeleton';
import { DashboardStats } from '@/components/dashboard/dashboard-stats';
import { RecentPatients } from '@/components/dashboard/recent-patients';
import { QuickActions } from '@/components/dashboard/quick-actions';
import { RecentActivity } from '@/components/dashboard/recent-activity';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Terminal } from 'lucide-react';

export default function DashboardPage() {
  const [result, setResult] = useState<GenerateDifferentialDiagnosesOutput | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [showDiagnosis, setShowDiagnosis] = useState(false);

  const handleFormSubmit = async (data: GenerateDifferentialDiagnosesInput) => {
    setIsLoading(true);
    setError(null);
    setResult(null);
    setShowDiagnosis(true);
    
    const response = await getAIDiagnosis(data);

    if (response.success) {
      setResult(response.data);
    } else {
      setError(response.error);
    }
    
    setIsLoading(false);
  };

  return (
    <main className="space-y-8">
      {/* Header Stats */}
      <div>
        <h1 className="text-3xl font-bold tracking-tight mb-6">Bảng điều khiển</h1>
        <DashboardStats />
      </div>

      {/* Main Content */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left Column - Diagnosis Form */}
        <div className="lg:col-span-2 space-y-6">
          <PatientForm onSubmit={handleFormSubmit} isLoading={isLoading} />
          
          {/* Diagnosis Results */}
          {showDiagnosis && (
            <div className="rounded-lg">
              {isLoading && <ResultsSkeleton />}
              {error && (
                <Alert variant="destructive" className="h-full">
                  <Terminal className="h-4 w-4" />
                  <AlertTitle>Đã xảy ra lỗi</AlertTitle>
                  <AlertDescription>{error}</AlertDescription>
                </Alert>
              )}
              {!isLoading && !error && result && <DiagnosisResults data={result} />}
              {!isLoading && !error && !result && <ResultsPlaceholder />}
            </div>
          )}
        </div>

        {/* Right Column - Sidebar */}
        <div className="space-y-6">
          <QuickActions />
          <RecentPatients />
          <RecentActivity />
        </div>
      </div>
        </div>
      </div>
    </main>
  );
}
