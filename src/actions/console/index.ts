import { all, fork, takeLatest } from 'redux-saga/effects';
import { createSaga } from '@base/features/base-decorator';
import * as Sagas from 'actions/console/sagas';
import { ConsoleTypes } from 'actions/console/redux';

/* ------------- Export Redux ------------- */
export * from 'actions/console/redux';

/* ------------- Export Sagas ------------- */
function* watchCreateApp() {
	yield takeLatest(ConsoleTypes.CREATE_APP, createSaga(Sagas.createApp));
}

function* watchCreateSubApp() {
	yield takeLatest(ConsoleTypes.CREATE_SUB_APP, createSaga(Sagas.createSubApp));
}

function* watchRemoveApp() {
	yield takeLatest(ConsoleTypes.REMOVE_APP, createSaga(Sagas.removeApp));
}

function* watchRemoveSubApp() {
	yield takeLatest(ConsoleTypes.REMOVE_SUB_APP, createSaga(Sagas.removeSubApp));
}

function* watchActiveApp() {
	yield takeLatest(ConsoleTypes.ACTIVE_APP, createSaga(Sagas.activeApp));
}

function* watchActiveSubApp() {
	yield takeLatest(ConsoleTypes.ACTIVE_SUB_APP, createSaga(Sagas.activeSubApp));
}

export function* consoleSaga() {
	yield all([
		fork(watchCreateApp),
		fork(watchCreateSubApp),
		fork(watchActiveApp),
		fork(watchActiveSubApp),
		fork(watchRemoveSubApp),
		fork(watchRemoveApp)
	]);
}
