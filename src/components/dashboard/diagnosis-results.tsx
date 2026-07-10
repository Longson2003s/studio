'use client';

import type { GenerateDifferentialDiagnosesOutput } from "@/ai/flows/generate-differential-diagnoses-flow";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { formatProbability } from "@/lib/utils";
import { AlertTriangle, Book, FileText, FlaskConical, Link as LinkIcon, List, Stethoscope, CheckCircle, BarChart3 } from "lucide-react";

type DiagnosisResultsProps = {
  data: GenerateDifferentialDiagnosesOutput;
};

export function DiagnosisResults({ data }: DiagnosisResultsProps) {
  return (
    <div className="space-y-4">
      {/* Top Diagnosis - Highlighted */}
      <Card className="border-2 border-primary/20 bg-primary/5">
        <CardContent className="pt-6">
          <div className="flex items-start gap-4">
            <div className="p-3 rounded-lg bg-primary/10">
              <CheckCircle className="h-6 w-6 text-primary" />
            </div>
            <div className="flex-1">
              <p className="text-sm font-medium text-muted-foreground">Chẩn đoán hàng đầu</p>
              <p className="text-2xl font-bold mt-2">{data.differentialDiagnoses[0]?.diagnosis}</p>
              <div className="flex items-center gap-2 mt-3">
                <Badge className="bg-primary">Xác suất: {formatProbability(data.differentialDiagnoses[0]?.probability || 0)}</Badge>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Results Card */}
      <Card className="shadow-lg">
        <CardHeader>
          <CardTitle className="font-headline text-2xl flex items-center gap-2">
            <BarChart3 className="h-6 w-6 text-primary" />
            Kết quả Phân tích AI
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Accordion type="multiple" defaultValue={['item-1', 'item-2', 'item-3']} className="w-full">
            
            <AccordionItem value="item-1">
              <AccordionTrigger className="text-lg font-semibold hover:text-primary transition-colors">
                <FileText className="mr-2 text-primary h-5 w-5" />
                Tóm tắt bệnh nhân
              </AccordionTrigger>
              <AccordionContent className="text-base leading-relaxed px-2 pt-4">
                <div className="bg-muted/50 rounded-lg p-4 border border-muted">
                  {data.patientSummary}
                </div>
              </AccordionContent>
            </AccordionItem>
            
            <AccordionItem value="item-2">
              <AccordionTrigger className="text-lg font-semibold hover:text-primary transition-colors">
                <List className="mr-2 text-primary h-5 w-5" />
                Chẩn đoán phân biệt ({data.differentialDiagnoses.length})
              </AccordionTrigger>
              <AccordionContent className="pt-4">
                <div className="rounded-lg border overflow-hidden">
                  <Table>
                    <TableHeader>
                      <TableRow className="bg-muted/50">
                        <TableHead className="w-2/5 font-semibold">Chẩn đoán</TableHead>
                        <TableHead className="text-center font-semibold">Xác suất</TableHead>
                        <TableHead className="font-semibold">Giả định chính</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {data.differentialDiagnoses.map((dx, index) => (
                        <TableRow key={index} className={index === 0 ? "bg-primary/5" : ""}>
                          <TableCell className="font-semibold text-base">{dx.diagnosis}</TableCell>
                          <TableCell className="text-center">
                            <Badge 
                              variant={dx.probability > 0.5 ? "default" : "secondary"} 
                              className="text-sm font-semibold"
                            >
                              {formatProbability(dx.probability)}
                            </Badge>
                          </TableCell>
                          <TableCell className="text-muted-foreground text-sm">{dx.assumptions.join(', ')}</TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-3">
              <AccordionTrigger className="text-lg font-semibold hover:text-primary transition-colors">
                <FlaskConical className="mr-2 text-primary h-5 w-5" />
                Cần làm gì tiếp theo
              </AccordionTrigger>
              <AccordionContent className="px-2 pt-4">
                <ul className="space-y-3">
                  {data.nextSteps.map((step, index) => (
                    <li key={index} className="flex gap-3 items-start">
                      <span className="inline-flex items-center justify-center h-6 w-6 rounded-full bg-primary/10 text-primary text-sm font-semibold flex-shrink-0 mt-0.5">
                        {index + 1}
                      </span>
                      <span className="text-sm leading-relaxed">{step}</span>
                    </li>
                  ))}
                </ul>
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-4">
              <AccordionTrigger className="text-lg font-semibold hover:text-primary transition-colors">
                <Stethoscope className="mr-2 text-primary h-5 w-5" />
                Phác đồ gợi ý ({data.suggestedTreatmentProtocols.length})
              </AccordionTrigger>
              <AccordionContent className="space-y-4 px-2 pt-4">
                {data.suggestedTreatmentProtocols.map((protocol, index) => (
                  <div key={index} className="rounded-lg border border-primary/20 bg-primary/5 p-4 hover:border-primary/40 transition-colors">
                    <div className="flex items-start gap-3">
                      <div className="p-2 rounded bg-primary/10 mt-0.5">
                        <Stethoscope className="h-4 w-4 text-primary" />
                      </div>
                      <div className="flex-1">
                        <h4 className="font-bold text-base mb-1">{protocol.protocolName}</h4>
                        <p className="text-sm text-muted-foreground leading-relaxed">{protocol.details}</p>
                        {protocol.contraindications && (
                          <p className="text-sm mt-3 p-2 bg-destructive/10 text-destructive rounded">
                            <strong>⚠️ Chống chỉ định:</strong> {protocol.contraindications}
                          </p>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-5">
              <AccordionTrigger className="text-lg font-semibold hover:text-destructive transition-colors">
                <AlertTriangle className="mr-2 text-destructive h-5 w-5" />
                Cảnh báo
              </AccordionTrigger>
              <AccordionContent className="px-2 pt-4">
                {data.warnings.length > 0 ? (
                  <Alert variant="destructive" className="border-2">
                    <AlertTriangle className="h-5 w-5" />
                    <AlertTitle className="text-base font-semibold">Cảnh báo quan trọng</AlertTitle>
                    <AlertDescription className="mt-3">
                      <ul className="space-y-2">
                        {data.warnings.map((warning, index) => (
                          <li key={index} className="flex gap-2">
                            <span className="text-destructive">•</span>
                            <span>{warning}</span>
                          </li>
                        ))}
                      </ul>
                    </AlertDescription>
                  </Alert>
                ) : (
                  <div className="text-center py-6">
                    <CheckCircle className="h-8 w-8 text-green-600 mx-auto mb-2" />
                    <p className="text-muted-foreground">Không có cảnh báo đặc biệt.</p>
                  </div>
                )}
              </AccordionContent>
            </AccordionItem>
            
            <AccordionItem value="item-6">
              <AccordionTrigger className="text-lg font-semibold hover:text-primary transition-colors">
                <Book className="mr-2 text-primary h-5 w-5" />
                Trích dẫn tài liệu ({data.citations.length})
              </AccordionTrigger>
              <AccordionContent className="px-2 pt-4">
                <ul className="space-y-2">
                  {data.citations.map((citation, index) => (
                    <li key={index} className="flex items-start gap-2 p-2 hover:bg-muted rounded transition-colors cursor-pointer">
                      <LinkIcon className="h-4 w-4 text-primary flex-shrink-0 mt-0.5" />
                      <span className="text-sm text-blue-600 hover:underline flex-1">{citation}</span>
                    </li>
                  ))}
                </ul>
              </AccordionContent>
            </AccordionItem>

          </Accordion>
        </CardContent>
      </Card>
    </div>
  );
}
