import { all, fork, takeLatest } from 'redux-saga/effects';
import { ConsoleTypes } from 'actions/redux/console';
import * as Sagas from './sagas';

function* watchCreateApp() {
	yield takeLatest(ConsoleTypes.CREATE_APP, Sagas.createApp);
}

function* watchCreateSubApp() {
	yield takeLatest(ConsoleTypes.CREATE_SUB_APP, Sagas.createSubApp);
}

function* watchRemoveApp() {
	yield takeLatest(ConsoleTypes.REMOVE_APP, Sagas.removeApp);
}

function* watchRemoveSubApp() {
	yield takeLatest(ConsoleTypes.REMOVE_SUB_APP, Sagas.removeSubApp);
}

function* watchActiveApp() {
	yield takeLatest(ConsoleTypes.ACTIVE_APP, Sagas.activeApp);
}

function* watchActiveSubApp() {
	yield takeLatest(ConsoleTypes.ACTIVE_SUB_APP, Sagas.activeSubApp);
}

function* consoleSaga() {
	yield all([
		fork(watchCreateApp),
		fork(watchCreateSubApp),
		fork(watchActiveApp),
		fork(watchActiveSubApp),
		fork(watchRemoveSubApp),
		fork(watchRemoveApp)
	]);
}

export default consoleSaga;
