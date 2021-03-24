import { AxiosResponse } from 'axios';
import _ from 'lodash';
import { getStore } from '@base/features/base-store';
import ErrorHandlerConfig from 'configurations/error.config.json';
import { TypesNames } from './reducer';

const { pathToErrorCode, handlers } = ErrorHandlerConfig;

export interface ErrorHandlerRequest<T> {
	component: string;
	payload: T;
}

export enum BaseComponentTypes {
	IGNORE = 'ignore',
	ERROR_PAGE = 'errorPage'
}

export const clearErrorHandler = (appId: string, subAppId: string) => {
	getStore(appId).dispatch({
		type: TypesNames.ERROR_HANDLER_HANDLED,
		appId,
		subAppId
	});
};

export const dispatchErrorHandler = (response: AxiosResponse & { appId: string; subAppId: string }) => {
	const { status, appId, subAppId } = response;

	try {
		const errorCode = _.get(response, pathToErrorCode);
		const errorData = handlers[`${errorCode}_${status}`];

		if (errorCode && errorData?.component && errorData?.component?.toLocaleLowerCase() !== BaseComponentTypes.IGNORE) {
			getStore(appId).dispatch({
				payload: errorData,
				appId,
				subAppId,
				type: TypesNames.ERROR_HANDLER_INVOKE
			});
		} else {
			getStore(appId).dispatch({
				payload: { component: BaseComponentTypes.ERROR_PAGE },
				appId,
				subAppId,
				type: TypesNames.ERROR_HANDLER_INVOKE
			});
		}
	} catch (e) {
		// eslint-disable-next-line max-len,no-console
		console.error('There was an error with dispatch error handler, please make sure you define properly your error handler config', e);
		getStore(appId).dispatch({
			payload: { component: BaseComponentTypes.ERROR_PAGE },
			appId,
			subAppId,
			type: TypesNames.ERROR_HANDLER_INVOKE
		});
	}
};
