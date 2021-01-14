import { all, fork, takeLatest } from 'redux-saga/effects';
import * as Sagas from './sagas';
import { CatalogTypes } from 'actions/catalog/redux';

/* ------------- Export Redux ------------- */
export * from 'actions/catalog/redux';

/* ------------- Export Sagas ------------- */
function* watchMySaga() {
	yield takeLatest(CatalogTypes.MY_SAGA, Sagas.mySaga);
}

// TODO: Do Not Forget to Add your new saga to index file
export function* catalogSaga() {
	yield all([
		fork(watchMySaga)
	]);
}
