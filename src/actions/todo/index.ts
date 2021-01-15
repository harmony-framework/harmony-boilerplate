import { all, fork, takeLatest } from 'redux-saga/effects';
import { createSaga } from '@base/features/base-decorator';
import * as Sagas from 'actions/todo/sagas';
import { TodoTypes } from 'actions/todo';

/* ------------- Export Redux ------------- */
export * from 'actions/todo/redux';

/* ------------- Export Sagas ------------- */
function* watchMySaga() {
	yield takeLatest(TodoTypes.MY_SAGA, createSaga(Sagas.mySaga));
}

export function* todoSaga() {
	yield all([
		fork(watchMySaga)
	]);
}
