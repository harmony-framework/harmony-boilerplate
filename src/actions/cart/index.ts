import { all, fork, takeLatest } from 'redux-saga/effects';
import { createSaga } from '@base/features/base-decorator';
import * as Sagas from 'actions/cart/sagas';
import { CartTypes } from 'actions/cart';

/* ------------- Export Redux ------------- */
export * from 'actions/cart/redux';

/* ------------- Export Sagas ------------- */
function* watchAddSaga() {
	yield takeLatest(CartTypes.ADD_TO_CART, createSaga(Sagas.addSaga));
}

function* watchRemoveSaga() {
	yield takeLatest(CartTypes.REMOVE_FROM_CART, createSaga(Sagas.removeSaga));
}

function* watchClearCartSaga() {
	yield takeLatest(CartTypes.CLEAR_CART, createSaga(Sagas.clearSaga));
}
export function* cartSaga() {
	yield all([
		fork(watchAddSaga),
		fork(watchRemoveSaga),
		fork(watchClearCartSaga)
	]);
}
