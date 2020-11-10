import { fork, all } from 'redux-saga/effects';

/* ------------- Sagas ------------- */
import catalogSaga from './catalog';
import cartSaga from './cart';
import flowManagerSaga from './flowManager';

export default function* () {
	yield all([fork(flowManagerSaga)]);
	yield all([fork(cartSaga)]);
	yield all([fork(catalogSaga)]);
}
