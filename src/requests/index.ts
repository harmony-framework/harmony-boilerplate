/**
 * Here you add all the apis urls defenition
 */

import request from '@base/features/base-api';
import { AxiosResponse } from 'axios';
import { config } from 'config';

export interface Api {
	getDevices: () => Promise<AxiosResponse>;
}

export const createApi = (baseURL = config.ROOT_SERVER_URL): Api => ({
	getDevices: () => request.call({
		baseURL: 'http://6ew7g.mocklab.io/' || baseURL,
		method: 'get',
		url: '/getlatestWithCustomResponseCode'
	})
});

export default createApi();
