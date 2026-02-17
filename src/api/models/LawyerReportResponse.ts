/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { LawyerReportActivityLogResponse } from './LawyerReportActivityLogResponse';
import type { LawyerReportCardsResponse } from './LawyerReportCardsResponse';
import type { LawyerReportCaseDistributionResponse } from './LawyerReportCaseDistributionResponse';
import type { LawyerReportInvoicesResponse } from './LawyerReportInvoicesResponse';
import type { LawyerReportUpcomingDeadlinesResponse } from './LawyerReportUpcomingDeadlinesResponse';
import type { LawyerResponse } from './LawyerResponse';
export type LawyerReportResponse = {
    lawyerReportCards: Array<LawyerReportCardsResponse>;
    invoices: Array<LawyerReportInvoicesResponse>;
    caseDistributions: Array<LawyerReportCaseDistributionResponse>;
    upcomingDeadlines: Array<LawyerReportUpcomingDeadlinesResponse>;
    activityLog: Array<LawyerReportActivityLogResponse>;
    lawyer: LawyerResponse;
};

