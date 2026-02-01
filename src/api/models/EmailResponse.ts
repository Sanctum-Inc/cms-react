/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { EmailStatus } from './EmailStatus';
export type EmailResponse = {
    toAddresses: string;
    ccAddresses: string | null;
    bccAddresses: string | null;
    subject: string;
    body: string;
    attachmentIds: string | null;
    status: EmailStatus;
    errorMessage: string | null;
    sentAt: string | null;
};

