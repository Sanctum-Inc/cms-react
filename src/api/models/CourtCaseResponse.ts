/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { CourtCaseStatus } from './CourtCaseStatus';
import type { CourtCaseTypes } from './CourtCaseTypes';
export type CourtCaseResponse = {
    id: string;
    caseNumber: string;
    status: CourtCaseStatus;
    location: string;
    nextDate: string;
    plaintiff: string;
    type: CourtCaseTypes;
};

