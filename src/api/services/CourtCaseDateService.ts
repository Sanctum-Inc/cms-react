/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { AddCourtCaseDateRequest } from '../models/AddCourtCaseDateRequest';
import type { CourtCaseDateResponse } from '../models/CourtCaseDateResponse';
import type { UpdateCourtCaseDateRequest } from '../models/UpdateCourtCaseDateRequest';
import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';
export class CourtCaseDateService {
    /**
     * @returns CourtCaseDateResponse OK
     * @throws ApiError
     */
    public static getAllCourtCaseDates(): CancelablePromise<CourtCaseDateResponse> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/CourtCaseDate',
        });
    }
    /**
     * @param requestBody
     * @returns boolean Created
     * @throws ApiError
     */
    public static createCourtCaseDates(
        requestBody: AddCourtCaseDateRequest,
    ): CancelablePromise<boolean> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/CourtCaseDate',
            body: requestBody,
            mediaType: 'application/json',
            errors: {
                400: `Bad Request`,
            },
        });
    }
    /**
     * @param id
     * @returns CourtCaseDateResponse OK
     * @throws ApiError
     */
    public static getCourtCaseDatesById(
        id: string,
    ): CancelablePromise<CourtCaseDateResponse> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/CourtCaseDate/{id}',
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
    public static updateCourtCaseDates(
        id: string,
        requestBody: UpdateCourtCaseDateRequest,
    ): CancelablePromise<void> {
        return __request(OpenAPI, {
            method: 'PUT',
            url: '/api/CourtCaseDate/{id}',
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
    public static deleteCourtCaseDates(
        id: string,
    ): CancelablePromise<void> {
        return __request(OpenAPI, {
            method: 'DELETE',
            url: '/api/CourtCaseDate/{id}',
            path: {
                'id': id,
            },
            errors: {
                404: `Not Found`,
            },
        });
    }
}
