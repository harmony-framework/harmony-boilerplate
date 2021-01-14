/**
 * Here you add all the apis urls defenition
 */
import { AxiosResponse } from 'axios';
import { Request } from '@base/features/base-api';
import { config } from 'config';
import GenericMobileImage from 'public/assets/images/generic-mobile.jpg';
import responseExample from './mocks/response_example.json';
import { Device } from 'actions/catalog/interface';

export interface Api {
	getDevices: () => Promise<AxiosResponse>;
	getDevicesMock: () => any;
}

export const createApi = (request = new Request(), baseURL = config.ROOT_SERVER_URL): Api => ({
	getDevices: () => request.call({
		baseURL,
		method: 'get',
		url: '/getlatest',
		params: {
			token: '9800fd0895059fe458971473945a28a1fe2433b6035cf675',
			limit: 50
		}
	}),
	getDevicesMock: () => {
		const genericImage = GenericMobileImage;

		const mock = (responseExample as Device[]).map((item) => {
			const temp = { ...item };
			temp.image = genericImage;
			return temp;
		});

		return {
			data: mock
		};
	}
});
