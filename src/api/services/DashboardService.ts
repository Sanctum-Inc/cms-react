/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { DashBoardResult } from '../models/DashBoardResult';
import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';
export class DashboardService {
    /**
     * @returns DashBoardResult OK
     * @throws ApiError
     */
    public static getDashboardInformation(): CancelablePromise<DashBoardResult> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/Dashboard',
        });
    }
}
