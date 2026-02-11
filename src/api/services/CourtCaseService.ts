/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { AddCourtCaseRequest } from '../models/AddCourtCaseRequest';
import type { CourtCaseInformationResult } from '../models/CourtCaseInformationResult';
import type { CourtCaseNumberResponse } from '../models/CourtCaseNumberResponse';
import type { CourtCaseResponse } from '../models/CourtCaseResponse';
import type { UpdateCourtCaseRequest } from '../models/UpdateCourtCaseRequest';
import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';
export class CourtCaseService {
    /**
     * @returns CourtCaseResponse OK
     * @throws ApiError
     */
    public static getAllCourtCases(): CancelablePromise<Array<CourtCaseResponse>> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/CourtCase',
        });
    }
    /**
     * @param requestBody
     * @returns string Created
     * @throws ApiError
     */
    public static createCourtCases(
        requestBody: AddCourtCaseRequest,
    ): CancelablePromise<string> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/CourtCase',
            body: requestBody,
            mediaType: 'application/json',
            errors: {
                400: `Bad Request`,
            },
        });
    }
    /**
     * @returns CourtCaseNumberResponse OK
     * @throws ApiError
     */
    public static getAllCaseNumbers(): CancelablePromise<Array<CourtCaseNumberResponse>> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/CourtCase/case-numbers',
        });
    }
    /**
     * @param id
     * @returns CourtCaseResponse OK
     * @throws ApiError
     */
    public static getCourtCasesById(
        id: string,
    ): CancelablePromise<CourtCaseResponse> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/CourtCase/{id}',
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
    public static updateCourtCases(
        id: string,
        requestBody: UpdateCourtCaseRequest,
    ): CancelablePromise<void> {
        return __request(OpenAPI, {
            method: 'PUT',
            url: '/api/CourtCase/{id}',
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
    public static deleteCourtCases(
        id: string,
    ): CancelablePromise<void> {
        return __request(OpenAPI, {
            method: 'DELETE',
            url: '/api/CourtCase/{id}',
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
     * @returns CourtCaseInformationResult OK
     * @throws ApiError
     */
    public static getCourtCaseInformation(
        id: string,
    ): CancelablePromise<CourtCaseInformationResult> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/CourtCase/court-case-information/{id}',
            path: {
                'id': id,
            },
            errors: {
                404: `Not Found`,
            },
        });
    }
}
