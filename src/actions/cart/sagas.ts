import { AxiosResponse } from 'axios';
import { call, put } from 'redux-saga/effects';
import api from 'requests';
import { CartActions } from 'actions/cart';
import { MySagaAction, ResponseExample } from 'actions/cart/interface';

export function* mySaga(action: MySagaAction) {
	const { someData } = action;
	const response: AxiosResponse<ResponseExample> = yield call(api.someApi, someData);

	yield put(CartActions.setExample(response.data.name));
}
