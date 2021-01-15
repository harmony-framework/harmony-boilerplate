import { all, fork, takeLatest } from 'redux-saga/effects';
import { createSaga } from '@base/features/base-decorator';
import * as Sagas from 'actions/flowManager/sagas';
import { FlowManagerTypes } from 'actions/flowManager';

/* ------------- Export Redux ------------- */
export * from 'actions/flowManager/redux';

/* ------------- Export Sagas ------------- */
function* watchStartFlow() {
	yield takeLatest(FlowManagerTypes.START_FLOW, createSaga(Sagas.startFlow));
}

function* watchMoveToNextStep() {
	yield takeLatest(FlowManagerTypes.MOVE_TO_NEXT_STEP, createSaga(Sagas.moveToNextStep));
}

export function* flowManagerSaga() {
	yield all([
		fork(watchStartFlow),
		fork(watchMoveToNextStep)
	]);
}
