import { AxiosResponse } from 'axios';
import { call, put } from 'redux-saga/effects';
import { AppContextProps } from '@base/features/base-context';
import { CartActions } from 'actions/cart';
import { MySagaAction, ResponseExample } from 'actions/cart/interface';

export function* mySaga(action: MySagaAction & AppContextProps) {
	const { someData, applicationDetails } = action;
	const { api } = applicationDetails;
	const response: AxiosResponse<ResponseExample> = yield call(api.someApi, someData);

	yield put(CartActions.setExample(response.data.name));
}
