/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { DocumentResponse } from '../models/DocumentResponse';
import type { FileStreamResult } from '../models/FileStreamResult';
import type { UpdateDocumentRequest } from '../models/UpdateDocumentRequest';
import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';
export class DocumentService {
    /**
     * @param formData
     * @returns boolean Created
     * @throws ApiError
     */
    public static uploadDocument(
        formData: ({
            ContentType?: string;
            ContentDisposition?: string;
            Headers?: Record<string, Array<string>>;
            Length?: number;
            Name?: string;
            FileName?: string;
        } & {
            name?: string;
        } & {
            caseId?: string;
        } & {
            name: string;
            caseId: string;
        }),
    ): CancelablePromise<boolean> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/Document/upload',
            formData: formData,
            mediaType: 'application/x-www-form-urlencoded',
            errors: {
                400: `Bad Request`,
            },
        });
    }
    /**
     * @param id
     * @returns FileStreamResult OK
     * @throws ApiError
     */
    public static downloadDocument(
        id: string,
    ): CancelablePromise<FileStreamResult> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/Document/{id}/download',
            path: {
                'id': id,
            },
            errors: {
                404: `Not Found`,
            },
        });
    }
    /**
     * @returns DocumentResponse OK
     * @throws ApiError
     */
    public static getAllDocument(): CancelablePromise<Array<DocumentResponse>> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/Document',
        });
    }
    /**
     * @param id
     * @returns DocumentResponse OK
     * @throws ApiError
     */
    public static getDocumentById(
        id: string,
    ): CancelablePromise<DocumentResponse> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/Document/{id}',
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
    public static updateDocument(
        id: string,
        requestBody: UpdateDocumentRequest,
    ): CancelablePromise<void> {
        return __request(OpenAPI, {
            method: 'PUT',
            url: '/api/Document/{id}',
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
    public static deleteDocument(
        id: string,
    ): CancelablePromise<void> {
        return __request(OpenAPI, {
            method: 'DELETE',
            url: '/api/Document/{id}',
            path: {
                'id': id,
            },
            errors: {
                404: `Not Found`,
            },
        });
    }
}
