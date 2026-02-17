/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { AddInvoiceRequest } from '../models/AddInvoiceRequest';
import type { FileContentResult } from '../models/FileContentResult';
import type { InvoiceNumberResponse } from '../models/InvoiceNumberResponse';
import type { InvoiceResponse } from '../models/InvoiceResponse';
import type { UpdateInvoiceRequest } from '../models/UpdateInvoiceRequest';
import type { UpdateInvoiceStatusRequest } from '../models/UpdateInvoiceStatusRequest';
import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';
export class InvoiceService {
    /**
     * @returns InvoiceResponse OK
     * @throws ApiError
     */
    public static getAllInvoices(): CancelablePromise<Array<InvoiceResponse>> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/Invoice',
        });
    }
    /**
     * @param requestBody
     * @returns boolean Created
     * @throws ApiError
     */
    public static createInvoices(
        requestBody: AddInvoiceRequest,
    ): CancelablePromise<boolean> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/Invoice',
            body: requestBody,
            mediaType: 'application/json',
            errors: {
                400: `Bad Request`,
            },
        });
    }
    /**
     * @returns InvoiceNumberResponse OK
     * @throws ApiError
     */
    public static getAllInvoiceNumbers(): CancelablePromise<Array<InvoiceNumberResponse>> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/Invoice/invoice-numbers',
        });
    }
    /**
     * @param id
     * @returns InvoiceResponse OK
     * @throws ApiError
     */
    public static getInvoicesById(
        id: string,
    ): CancelablePromise<InvoiceResponse> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/Invoice/{id}',
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
     * @param requestBody
     * @returns void
     * @throws ApiError
     */
    public static updateInvoices(
        id: string,
        requestBody: UpdateInvoiceRequest,
    ): CancelablePromise<void> {
        return __request(OpenAPI, {
            method: 'PUT',
            url: '/api/Invoice/{id}',
            path: {
                'id': id,
            },
            body: requestBody,
            mediaType: 'application/json',
            errors: {
                404: `Not Found`,
            },
        });
    }
    /**
     * @param id
     * @returns void
     * @throws ApiError
     */
    public static deleteInvoices(
        id: string,
    ): CancelablePromise<void> {
        return __request(OpenAPI, {
            method: 'DELETE',
            url: '/api/Invoice/{id}',
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
     * @returns FileContentResult OK
     * @throws ApiError
     */
    public static generatePdf(
        id: string,
    ): CancelablePromise<FileContentResult> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/Invoice/pdf/download/{id}',
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
     * @returns string OK
     * @throws ApiError
     */
    public static createLink(
        id: string,
    ): CancelablePromise<string> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/Invoice/pdf/{id}',
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
     * @param exp
     * @param sig
     * @param firmId
     * @returns any OK
     * @throws ApiError
     */
    public static getApiInvoicePdfView(
        id: string,
        exp?: number,
        sig?: string,
        firmId?: string,
    ): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/Invoice/pdf/view/{id}',
            path: {
                'id': id,
            },
            query: {
                'exp': exp,
                'sig': sig,
                'firmId': firmId,
            },
        });
    }
    /**
     * @param id
     * @param requestBody
     * @returns void
     * @throws ApiError
     */
    public static updateInvoicesStatus(
        id: string,
        requestBody: UpdateInvoiceStatusRequest,
    ): CancelablePromise<void> {
        return __request(OpenAPI, {
            method: 'PUT',
            url: '/api/Invoice/status/{id}',
            path: {
                'id': id,
            },
            body: requestBody,
            mediaType: 'application/json',
            errors: {
                404: `Not Found`,
            },
        });
    }
}
