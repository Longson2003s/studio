import { config } from 'dotenv';
config();

import '@/ai/flows/generate-differential-diagnoses-flow.ts';
import '@/ai/flows/generate-treatment-protocols.ts';
import '@/ai/flows/recommend-diagnostic-investigations.ts';