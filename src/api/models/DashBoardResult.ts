/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { RecentCaseActivityResult } from './RecentCaseActivityResult';
import type { UpcomingCourtCaseActivityResult } from './UpcomingCourtCaseActivityResult';
export type DashBoardResult = {
    totalCases: number;
    totalInvoices: number;
    upcomingDates: number;
    documentsStored: number;
    recentCases: Array<RecentCaseActivityResult>;
    upcomingCases: Array<UpcomingCourtCaseActivityResult>;
};

