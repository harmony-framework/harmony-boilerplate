import { all, fork, takeLatest } from 'redux-saga/effects';
import * as Sagas from './sagas';
import { CartTypes } from 'actions/cart';

/* ------------- Export Redux ------------- */
export * from 'actions/cart/redux';

/* ------------- Export Sagas ------------- */
function* watchAddSaga() {
	yield takeLatest(CartTypes.ADD_TO_CART, Sagas.addSaga);
}

function* watchRemoveSaga() {
	yield takeLatest(CartTypes.REMOVE_FROM_CART, Sagas.removeSaga);
}

function* watchClearCartSaga() {
	yield takeLatest(CartTypes.CLEAR_CART, Sagas.clearSaga);
}
export function* cartSaga() {
	yield all([
		fork(watchAddSaga),
		fork(watchRemoveSaga),
		fork(watchClearCartSaga)
	]);
}
