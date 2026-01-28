/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { InvoiceStatus } from './InvoiceStatus';
export type AddCourtCaseRequest = {
    caseNumber: string;
    location: string;
    plaintiff: string;
    defendant: string;
    status: InvoiceStatus;
    type: string | null;
    outcome: string | null;
};

