import { all, fork, takeLatest } from 'redux-saga/effects';
import * as Sagas from './sagas';
import { CatalogTypes } from 'actions/catalog/redux';

/* ------------- Export Redux ------------- */
export * from 'actions/catalog/redux';

/* ------------- Export Sagas ------------- */
function* watchGetDevices() {
	yield takeLatest(CatalogTypes.GET_DEVICE_LIST, Sagas.getDevices);
}

export function* catalogSaga() {
	yield all([
		fork(watchGetDevices)
	]);
}
