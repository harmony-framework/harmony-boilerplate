import { put } from 'redux-saga/effects';

export default (originalSaga: Function, isDoneHandler = false) => {
	return function* (...args: any) {
		const type = args?.[0]?.type;
		const payload = { ...args?.[0] };

		const response = yield originalSaga(...args);

		if (type && !isDoneHandler) {
			yield put({ type: `${type}_DONE`, response, payload });
		}

		return response;
	};
};
