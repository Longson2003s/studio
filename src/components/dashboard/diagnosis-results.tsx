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
import { AlertTriangle, Book, FileText, FlaskConical, Link as LinkIcon, List, Stethoscope } from "lucide-react";

type DiagnosisResultsProps = {
  data: GenerateDifferentialDiagnosesOutput;
};

export function DiagnosisResults({ data }: DiagnosisResultsProps) {
  return (
    <Card className="h-full">
      <CardHeader>
        <CardTitle className="font-headline text-2xl">Kết quả Phân tích AI</CardTitle>
      </CardHeader>
      <CardContent>
        <Accordion type="multiple" defaultValue={['item-1', 'item-2', 'item-3']} className="w-full">
          
          <AccordionItem value="item-1">
            <AccordionTrigger className="text-lg font-semibold">
              <FileText className="mr-2 text-primary" /> Tóm tắt bệnh nhân
            </AccordionTrigger>
            <AccordionContent className="text-base leading-relaxed px-2">
              {data.patientSummary}
            </AccordionContent>
          </AccordionItem>
          
          <AccordionItem value="item-2">
            <AccordionTrigger className="text-lg font-semibold">
              <List className="mr-2 text-primary" /> Chẩn đoán phân biệt
            </AccordionTrigger>
            <AccordionContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="w-2/5">Chẩn đoán</TableHead>
                    <TableHead className="text-center">Xác suất</TableHead>
                    <TableHead>Giả định</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {data.differentialDiagnoses.map((dx, index) => (
                    <TableRow key={index}>
                      <TableCell className="font-medium">{dx.diagnosis}</TableCell>
                      <TableCell className="text-center">
                        <Badge variant={dx.probability > 0.5 ? "default" : "secondary"} className="text-sm">{formatProbability(dx.probability)}</Badge>
                      </TableCell>
                      <TableCell className="text-muted-foreground text-xs">{dx.assumptions.join(', ')}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="item-3">
            <AccordionTrigger className="text-lg font-semibold">
              <FlaskConical className="mr-2 text-primary" /> Cần làm gì tiếp theo
            </AccordionTrigger>
            <AccordionContent className="px-2">
              <ul className="list-disc space-y-2 pl-6">
                {data.nextSteps.map((step, index) => (
                  <li key={index}>{step}</li>
                ))}
              </ul>
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="item-4">
            <AccordionTrigger className="text-lg font-semibold">
              <Stethoscope className="mr-2 text-primary" /> Phác đồ gợi ý
            </AccordionTrigger>
            <AccordionContent className="space-y-4 px-2">
              {data.suggestedTreatmentProtocols.map((protocol, index) => (
                <div key={index} className="rounded-md border p-4">
                  <h4 className="font-bold">{protocol.protocolName}</h4>
                  <p className="text-sm text-muted-foreground mt-1">{protocol.details}</p>
                  {protocol.contraindications && (
                    <p className="text-sm mt-2"><strong className="text-destructive">Chống chỉ định:</strong> {protocol.contraindications}</p>
                  )}
                </div>
              ))}
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="item-5">
            <AccordionTrigger className="text-lg font-semibold">
              <AlertTriangle className="mr-2 text-destructive" /> Cảnh báo
            </AccordionTrigger>
            <AccordionContent className="px-2">
              {data.warnings.length > 0 ? (
                <Alert variant="destructive">
                  <AlertTriangle className="h-4 w-4" />
                  <AlertTitle>Cảnh báo quan trọng</AlertTitle>
                  <AlertDescription>
                    <ul className="list-disc space-y-1 pl-5">
                      {data.warnings.map((warning, index) => (
                        <li key={index}>{warning}</li>
                      ))}
                    </ul>
                  </AlertDescription>
                </Alert>
              ) : (
                <p className="text-muted-foreground">Không có cảnh báo đặc biệt.</p>
              )}
            </AccordionContent>
          </AccordionItem>
          
          <AccordionItem value="item-6">
            <AccordionTrigger className="text-lg font-semibold">
             <Book className="mr-2 text-primary" /> Trích dẫn
            </AccordionTrigger>
            <AccordionContent className="px-2">
              <ul className="space-y-2">
                {data.citations.map((citation, index) => (
                  <li key={index} className="flex items-center text-sm">
                    <LinkIcon className="h-4 w-4 mr-2 shrink-0 text-muted-foreground"/>
                    <span className="text-blue-600 hover:underline cursor-pointer">{citation}</span>
                  </li>
                ))}
              </ul>
            </AccordionContent>
          </AccordionItem>

        </Accordion>
      </CardContent>
    </Card>
  );
}
