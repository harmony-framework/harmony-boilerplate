/**
 * Here you add all the apis urls defenition
 */

import request from '@base/features/base-api';
import { config } from 'config';
import GenericMobileImage from '../actions/sagas/catalog/generic-mobile.jpg';
import responseExample from '../actions/sagas/catalog/response_example.json';
import { Device } from '../actions/redux/catalog/interfaces';

export const createApi = (baseURL = config.ROOT_SERVER_URL) => ({
	getDevices: () => request.call({
		baseURL: 'http://6ew7g.mocklab.io/',
		method: 'get',
		url: '/getlatestWithCustomResponseCode'
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

export default createApi();
