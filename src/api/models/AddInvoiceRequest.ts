/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { InvoiceStatus } from './InvoiceStatus';
export type AddInvoiceRequest = {
    invoiceNumber: string;
    invoiceDate: string;
    clientName: string;
    reference: string;
    caseName: string;
    accountName: string;
    bank: string;
    branchCode: string;
    accountNumber: string;
    status: InvoiceStatus;
};

