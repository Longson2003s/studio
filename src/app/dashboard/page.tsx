'use client';

import { useState } from 'react';
import type { GenerateDifferentialDiagnosesOutput, GenerateDifferentialDiagnosesInput } from '@/ai/flows/generate-differential-diagnoses-flow';
import { getAIDiagnosis } from '@/app/actions';
import { PatientForm } from '@/components/dashboard/patient-form';
import { DiagnosisResults } from '@/components/dashboard/diagnosis-results';
import { ResultsPlaceholder } from '@/components/dashboard/results-placeholder';
import { ResultsSkeleton } from '@/components/dashboard/results-skeleton';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Terminal } from 'lucide-react';

export default function DashboardPage() {
  const [result, setResult] = useState<GenerateDifferentialDiagnosesOutput | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleFormSubmit = async (data: GenerateDifferentialDiagnosesInput) => {
    setIsLoading(true);
    setError(null);
    setResult(null);
    
    const response = await getAIDiagnosis(data);

    if (response.success) {
      setResult(response.data);
    } else {
      setError(response.error);
    }
    
    setIsLoading(false);
  };

  return (
    <main>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
        <div className="md:sticky md:top-8">
          <PatientForm onSubmit={handleFormSubmit} isLoading={isLoading} />
        </div>
        <div className="min-h-[calc(100vh-10rem)] rounded-lg">
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
      </div>
    </main>
  );
}
