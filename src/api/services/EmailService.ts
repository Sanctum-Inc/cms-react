/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { AddEmailRequest } from '../models/AddEmailRequest';
import type { EmailResponse } from '../models/EmailResponse';
import type { EmailStatus } from '../models/EmailStatus';
import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';
export class EmailService {
    /**
     * @returns EmailResponse OK
     * @throws ApiError
     */
    public static getEmails(): CancelablePromise<Array<EmailResponse>> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/Email',
            errors: {
                404: `Not Found`,
            },
        });
    }
    /**
     * @param requestBody
     * @returns any Created
     * @throws ApiError
     */
    public static createEmail(
        requestBody: AddEmailRequest,
    ): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/Email',
            body: requestBody,
            mediaType: 'application/json',
            errors: {
                404: `Not Found`,
            },
        });
    }
    /**
     * @param id
     * @returns EmailResponse OK
     * @throws ApiError
     */
    public static getEmailById(
        id: string,
    ): CancelablePromise<EmailResponse> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/Email/{id}',
            path: {
                'id': id,
            },
            errors: {
                404: `Not Found`,
            },
        });
    }
    /**
     * @param id
     * @param status
     * @returns EmailResponse OK
     * @throws ApiError
     */
    public static updateEmail(
        id: string,
        status?: EmailStatus,
    ): CancelablePromise<Array<EmailResponse>> {
        return __request(OpenAPI, {
            method: 'PUT',
            url: '/api/Email/{id}',
            path: {
                'id': id,
            },
            query: {
                'status': status,
            },
            errors: {
                404: `Not Found`,
            },
        });
    }
}
