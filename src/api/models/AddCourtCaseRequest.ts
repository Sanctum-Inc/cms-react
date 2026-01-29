/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { CourtCaseStatus } from './CourtCaseStatus';
export type AddCourtCaseRequest = {
    caseNumber: string;
    location: string;
    plaintiff: string;
    defendant: string;
    status: CourtCaseStatus;
    type: string | null;
    outcome: string | null;
};

