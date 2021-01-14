import { all, fork, takeLatest } from 'redux-saga/effects';
import * as Sagas from './sagas';
import { CartTypes } from 'actions/cart/redux';

/* ------------- Export Redux ------------- */
export * from 'actions/cart/redux';

/* ------------- Export Sagas ------------- */
function* watchMySaga() {
	yield takeLatest(CartTypes.MY_SAGA, Sagas.mySaga);
}

// TODO: Do Not Forget to Add your new saga to index file
export function* cartSaga() {
	yield all([
		fork(watchMySaga)
	]);
}
