/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { AddLawyerRequest } from '../models/AddLawyerRequest';
import type { LawyerResponse } from '../models/LawyerResponse';
import type { UpdateLawyerRequest } from '../models/UpdateLawyerRequest';
import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';
export class LawyerService {
    /**
     * @returns LawyerResponse OK
     * @throws ApiError
     */
    public static getAllLawyers(): CancelablePromise<Array<LawyerResponse>> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/Lawyer',
        });
    }
    /**
     * @param requestBody
     * @returns any Created
     * @throws ApiError
     */
    public static createLawyers(
        requestBody: AddLawyerRequest,
    ): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/Lawyer',
            body: requestBody,
            mediaType: 'application/json',
            errors: {
                400: `Bad Request`,
            },
        });
    }
    /**
     * @param id
     * @returns LawyerResponse OK
     * @throws ApiError
     */
    public static getLawyersById(
        id: string,
    ): CancelablePromise<LawyerResponse> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/Lawyer/{id}',
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
    public static updateLawyers(
        id: string,
        requestBody: UpdateLawyerRequest,
    ): CancelablePromise<void> {
        return __request(OpenAPI, {
            method: 'PUT',
            url: '/api/Lawyer/{id}',
            path: {
                'id': id,
            },
            body: requestBody,
            mediaType: 'application/json',
            errors: {
                400: `Bad Request`,
                404: `Not Found`,
            },
        });
    }
    /**
     * @param id
     * @returns void
     * @throws ApiError
     */
    public static deleteLawyers(
        id: string,
    ): CancelablePromise<void> {
        return __request(OpenAPI, {
            method: 'DELETE',
            url: '/api/Lawyer/{id}',
            path: {
                'id': id,
            },
            errors: {
                404: `Not Found`,
            },
        });
    }
}
