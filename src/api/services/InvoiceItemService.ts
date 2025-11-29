/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { AddInvoiceItemRequest } from '../models/AddInvoiceItemRequest';
import type { InvoiceItemResponse } from '../models/InvoiceItemResponse';
import type { UpdateInvoiceItemRequest } from '../models/UpdateInvoiceItemRequest';
import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';
export class InvoiceItemService {
    /**
     * @returns InvoiceItemResponse OK
     * @throws ApiError
     */
    public static getAllInvoiceItems(): CancelablePromise<Array<InvoiceItemResponse>> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/InvoiceItem',
        });
    }
    /**
     * @param requestBody
     * @returns boolean Created
     * @throws ApiError
     */
    public static createInvoiceItems(
        requestBody: AddInvoiceItemRequest,
    ): CancelablePromise<boolean> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/InvoiceItem',
            body: requestBody,
            mediaType: 'application/json',
            errors: {
                400: `Bad Request`,
            },
        });
    }
    /**
     * @param id
     * @returns InvoiceItemResponse OK
     * @throws ApiError
     */
    public static getInvoiceItemsById(
        id: string,
    ): CancelablePromise<InvoiceItemResponse> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/InvoiceItem/{id}',
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
    public static updateInvoiceItems(
        id: string,
        requestBody: UpdateInvoiceItemRequest,
    ): CancelablePromise<void> {
        return __request(OpenAPI, {
            method: 'PUT',
            url: '/api/InvoiceItem/{id}',
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
    public static deleteInvoiceItems(
        id: string,
    ): CancelablePromise<void> {
        return __request(OpenAPI, {
            method: 'DELETE',
            url: '/api/InvoiceItem/{id}',
            path: {
                'id': id,
            },
            errors: {
                404: `Not Found`,
            },
        });
    }
}
