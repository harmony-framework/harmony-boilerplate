/* eslint-disable no-console */
import { AxiosResponse } from 'axios';
import _ from 'lodash';
import Store from '@base/features/base-store';
import ErrorHandlerConfig from 'configurations/error.config.json';
import { config } from 'config';
import { TypesNames } from './reducer';

const { pathToErrorCode, handlers } = ErrorHandlerConfig;

export interface ErrorHandlerRequest<T> {
	component: string;
	payload: T;
	level?: string;
	errorCode?: string;
	status?: string;
	additionalParams?: any;
}

export enum ComponentLevels {
	COMPONENT = 'component'
}

export enum BaseComponentTypes {
	IGNORE = 'ignore',
	ERROR_PAGE = 'errorPage'
}

export const clearErrorHandler = () => {
	Store.dispatch({ type: TypesNames.ERROR_HANDLER_HANDLED });
};

export const dispatchErrorHandler = (response: AxiosResponse, generalErrorInfo?: { errorCode: string; status: number }) => {
	try {
		const { status } = response;
		let errorCode = _.get(response, pathToErrorCode);
		let errorData = handlers[`${errorCode}_${status}`];

		if (errorData?.component?.toLocaleLowerCase() === BaseComponentTypes.IGNORE) {
			return;
		}

		if (!errorData) {
			errorData = handlers[`${generalErrorInfo?.errorCode}_${generalErrorInfo?.status}`];
			errorCode = generalErrorInfo?.errorCode;
		}

		if (errorData) {
			Store.dispatch({
				payload: {
					...errorData,
					status,
					errorCode
				},
				type: TypesNames.ERROR_HANDLER_INVOKE
			});
		} else {
			Store.dispatch({
				payload: {
					component: BaseComponentTypes.ERROR_PAGE,
					status,
					errorCode
				},
				type: TypesNames.ERROR_HANDLER_INVOKE
			});
		}
	} catch (e) {
		// eslint-disable-next-line max-len,no-console
		console.error('There was an error with dispatch error handler, please make sure you define properly your error handler config', e);
		Store.dispatch({
			payload: { component: BaseComponentTypes.ERROR_PAGE },
			type: TypesNames.ERROR_HANDLER_INVOKE
		});
	}
};

const oldError = console.error;

console.error = (error: any, ...optional: any) => {
	// Print to console the original error message
	oldError(error, ...optional);

	if (config.STRICT_CONSOLE_ERROR) {
		const errorPayload = {
			data: { errorCode: 'clientConsoleError' },
			statusText: 'client console error'
		} as AxiosResponse;

		// Invoke Error Toaster
		setTimeout(() => {
			dispatchErrorHandler({ ...errorPayload, status: 400 });
			clearErrorHandler();
		});

		// Invoke Error Page
		setTimeout(() => {
			dispatchErrorHandler({ ...errorPayload, status: 500 });
			clearErrorHandler();
		});
	}
};
