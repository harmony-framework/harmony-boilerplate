import { all, fork, takeLatest } from 'redux-saga/effects';
import { createSaga } from '@base/features/base-decorator';
import * as Sagas from 'actions/catalog/sagas';
import { CatalogTypes } from 'actions/catalog';

/* ------------- Export Redux ------------- */
export * from 'actions/catalog/redux';

/* ------------- Export Sagas ------------- */
function* watchGetDevices() {
	yield takeLatest(CatalogTypes.GET_DEVICE_LIST, createSaga(Sagas.getDevices));
}

export function* catalogSaga() {
	yield all([
		fork(watchGetDevices)
	]);
}
