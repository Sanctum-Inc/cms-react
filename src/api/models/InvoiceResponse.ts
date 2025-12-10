/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { InvoiceItemResponse } from './InvoiceItemResponse';
export type InvoiceResponse = {
    id: string;
    invoiceNumber: string;
    invoiceDate: string;
    clientName: string;
    reference: string;
    totalAmount: number;
    accountName: string;
    bank: string;
    branchCode: string;
    accountNumber: string;
    isPaid: boolean;
    caseNumber: string;
    plaintiff: string;
    defendant: string;
    caseId: string;
    items: Array<InvoiceItemResponse>;
};

