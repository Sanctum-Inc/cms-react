/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { CourtCaseDatesResponse } from './CourtCaseDatesResponse';
import type { DocumentResponse } from './DocumentResponse';
import type { InvoiceResponse } from './InvoiceResponse';
import type { InvoiceStatus } from './InvoiceStatus';
import type { LawyerResponse } from './LawyerResponse';
export type CourtCasesResponse = {
    id: string;
    caseNumber: string;
    location: string;
    plaintiff: string;
    defendant: string;
    status: InvoiceStatus;
    type: string | null;
    outcome?: string | null;
    created?: string;
    lastModified?: string;
    courtCaseDates?: Array<CourtCaseDatesResponse>;
    documents?: Array<DocumentResponse>;
    invoices?: Array<InvoiceResponse>;
    lawyers?: Array<LawyerResponse>;
};

