import { all, fork, takeLatest } from 'redux-saga/effects';
import * as Sagas from './sagas';
import { TypesNames } from './interface';

/* ------------- Export Redux ------------- */
export * from 'actions/flowManager/redux';

/* ------------- Export Sagas ------------- */
function* watchStartFlow() {
	yield takeLatest(TypesNames.START_FLOW, Sagas.startFlow);
}

function* watchMoveToNextStep() {
	yield takeLatest(TypesNames.MOVE_TO_NEXT_STEP, Sagas.moveToNextStep);
}
export function* flowManagerSaga() {
	yield all([
		fork(watchStartFlow),
		fork(watchMoveToNextStep)
	]);
}
