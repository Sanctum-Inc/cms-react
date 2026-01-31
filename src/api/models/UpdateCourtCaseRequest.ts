/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { CourtCaseOutcomes } from './CourtCaseOutcomes';
import type { CourtCaseStatus } from './CourtCaseStatus';
import type { CourtCaseTypes } from './CourtCaseTypes';
export type UpdateCourtCaseRequest = {
    caseNumber: string;
    location: string;
    plaintiff: string;
    defendant: string;
    status: CourtCaseStatus;
    type: CourtCaseTypes;
    outcome: CourtCaseOutcomes;
};

