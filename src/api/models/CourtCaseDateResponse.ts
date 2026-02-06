/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { CourtCaseDateItemResponse } from './CourtCaseDateItemResponse';
export type CourtCaseDateResponse = {
    overdueItems: number;
    completionRate: number;
    upcomingEvents: number;
    changeFromLastMonth: number;
    deadlineCase: CourtCaseDateItemResponse;
    courtCaseDateItems: Array<CourtCaseDateItemResponse>;
};

