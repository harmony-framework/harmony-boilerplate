import { v4 as uuidv4 } from 'uuid';
import _ from 'lodash';
import axios, { AxiosRequestConfig, AxiosResponse } from 'axios';
import { config as appConfig } from 'config';
import * as errorHandlerConfig from 'configurations/error.config.json';
import { dispatchErrorHandler } from '@base/features/base-error-handler';
import { endSpinner, startSpinner } from '@base/features/base-global-spinner';

class Request {
	constructor() {
		if (appConfig.COMMON_URL_PARAMS) {
			this.setCommonParams(appConfig.COMMON_URL_PARAMS);
		}
	}

	setCommonHeader(key: string, value: string) {
		axios.defaults.headers.common[key] = value;
	}

	setCommonParams(commonParams: Array<{key: string; value: string}>) {
		axios.defaults.params = {};

		commonParams.forEach((param) => {
			axios.defaults.params[param.key] = param.value;
		});
	}

	broadcastAction(action: any): any {
		if (!action) return null;

		const callConfig = {
			method: 'post',
			baseURL: appConfig.ROOT_SERVER_URL,
			url: '/users/broadcastAction',
			data: {
				action,
				token: typeof sessionStorage !== 'undefined' ? sessionStorage.getItem('wsa_token') : {}
			}
		};

		return this.call(callConfig);
	}

	async call(config: AxiosRequestConfig) {
		let response: AxiosResponse;
		const uuid = uuidv4();

		try {
			const commonAuthHeader = appConfig.COMMON_AUTHORIZATION_HEADER;
			const { pathToErrorCode } = errorHandlerConfig;

			startSpinner(config.url, uuid);
			response = await axios(config);
			endSpinner(config.url, uuid);

			if (commonAuthHeader && response?.headers && response.headers[commonAuthHeader]) {
				this.setCommonHeader(commonAuthHeader, response.headers[commonAuthHeader]);
			}

			const errorCode = _.get(response, pathToErrorCode);

			if (errorCode && response.status !== 200) {
				dispatchErrorHandler({ ...response });
			}

			return response;
		} catch (e) {
			const error = e.response || {};

			endSpinner(config.url, uuid);
			dispatchErrorHandler(error);

			throw new Error(e);
		}
	}
}

const request = new Request();

export default request;
