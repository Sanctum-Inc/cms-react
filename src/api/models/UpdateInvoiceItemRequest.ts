/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
export type UpdateInvoiceItemRequest = {
    id: string;
    invoiceId: string;
    name: string;
    hours: number;
    costPerHour: number | null;
    dayFeeAmount: number | null;
    caseId: string;
    isDayFee: boolean;
};

