import { AxiosResponse } from 'axios';
import { call, put } from 'redux-saga/effects';
import api from 'requests';
import { TodoActions } from 'actions/todo';
import { MySagaAction, ResponseExample } from 'actions/todo/interface';

export function* mySaga(action: MySagaAction) {
	const { someData } = action;
	const response: AxiosResponse<ResponseExample> = yield call(api.someApi, someData);

	yield put(TodoActions.setExample(response.data.name));
}
