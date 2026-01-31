/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { CourtCaseDatesResponse } from './CourtCaseDatesResponse';
import type { CourtCaseOutcomes } from './CourtCaseOutcomes';
import type { CourtCaseStatus } from './CourtCaseStatus';
import type { CourtCaseTypes } from './CourtCaseTypes';
import type { DocumentResponse } from './DocumentResponse';
import type { InvoiceResponse } from './InvoiceResponse';
import type { LawyerResponse } from './LawyerResponse';
export type CourtCasesResponse = {
    id: string;
    caseNumber: string;
    location: string;
    plaintiff: string;
    defendant: string;
    status: CourtCaseStatus;
    type: CourtCaseTypes;
    outcome?: CourtCaseOutcomes;
    created?: string;
    lastModified?: string;
    courtCaseDates?: Array<CourtCaseDatesResponse>;
    documents?: Array<DocumentResponse>;
    invoices?: Array<InvoiceResponse>;
    lawyers?: Array<LawyerResponse>;
};

