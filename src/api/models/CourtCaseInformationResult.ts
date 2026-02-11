/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { CourtCaseInformationQueryDatesResult } from './CourtCaseInformationQueryDatesResult';
import type { CourtCaseInformationQueryDocumentsResult } from './CourtCaseInformationQueryDocumentsResult';
import type { CourtCaseInformationQueryInvoicesResult } from './CourtCaseInformationQueryInvoicesResult';
import type { CourtCaseInformationQueryLawyersResult } from './CourtCaseInformationQueryLawyersResult';
import type { CourtCaseOutcomes } from './CourtCaseOutcomes';
import type { CourtCaseTypes } from './CourtCaseTypes';
export type CourtCaseInformationResult = {
    caseId: string;
    location: string;
    plaintiff: string;
    defendant: string;
    caseType: CourtCaseTypes;
    caseOutcomes: CourtCaseOutcomes;
    createdAt: string;
    lastModified: string;
    dates: Array<CourtCaseInformationQueryDatesResult>;
    documents: Array<CourtCaseInformationQueryDocumentsResult>;
    invoices: Array<CourtCaseInformationQueryInvoicesResult>;
    lawyers: Array<CourtCaseInformationQueryLawyersResult>;
};

