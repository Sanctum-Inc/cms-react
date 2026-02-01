/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
export type AddEmailRequest = {
    to: Array<string>;
    cc: Array<string> | null;
    bcc: Array<string> | null;
    subject: string;
    body: string;
    isHtml: boolean;
    attachmentIds: Array<string> | null;
};

