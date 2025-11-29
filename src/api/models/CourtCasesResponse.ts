/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { CourtCaseDatesResponse } from './CourtCaseDatesResponse';
import type { DocumentResponse } from './DocumentResponse';
import type { InvoiceItemResponse } from './InvoiceItemResponse';
import type { LawyerResponse } from './LawyerResponse';
export type CourtCasesResponse = {
    id?: string;
    caseNumber: string;
    location: string;
    plaintiff: string;
    defendant: string;
    status: string;
    type?: string | null;
    outcome?: string | null;
    created?: string;
    courtCaseDates?: Array<CourtCaseDatesResponse>;
    documents?: Array<DocumentResponse>;
    invoiceItems?: Array<InvoiceItemResponse>;
    lawyers?: Array<LawyerResponse>;
};

