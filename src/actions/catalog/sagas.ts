import { AxiosResponse } from 'axios';
import { call, put } from 'redux-saga/effects';
import api from 'requests';
import { CatalogActions } from 'actions/catalog';
import { MySagaAction, ResponseExample } from 'actions/catalog/interface';

export function* mySaga(action: MySagaAction) {
	const { someData } = action;
	const response: AxiosResponse<ResponseExample> = yield call(api.someApi, someData);

	yield put(CatalogActions.setExample(response.data.name));
}
