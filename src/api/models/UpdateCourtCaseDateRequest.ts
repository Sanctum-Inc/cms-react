/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { CourtCaseDateTypes } from './CourtCaseDateTypes';
export type UpdateCourtCaseDateRequest = {
    date: string;
    title: string;
    description: string;
    type: CourtCaseDateTypes;
    isComplete: boolean;
    isCancelled: boolean;
    caseId: string;
};

