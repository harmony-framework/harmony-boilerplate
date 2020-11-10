/**
 * Here you add all the apis urls defenition
 */

import request from '@base/features/base-api';
import { config } from 'config';

export const createApi = (baseURL = config.ROOT_SERVER_URL) => ({
	getDevices: () => request.call({
		baseURL,
		method: 'get',
		url: '/getlatest',
		params: {
			token: '9800fd0895059fe458971473945a28a1fe2433b6035cf675',
			limit: 50
		}
	})
});

export default createApi();
