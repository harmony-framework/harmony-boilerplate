import {
	all, call, fork, put, takeLatest
} from 'redux-saga/effects';
import CatalogActions, { CatalogTypes } from 'actions/redux/catalog';
import { startFlow } from '../flowManager';
import { TypesNames } from 'actions/redux/flowManager/interfaces';
import { FlowTypes, StepTypes } from 'configurations/flows.steps.types';
import { AxiosResponse } from 'axios';
import api from 'requests';
import { Device } from 'actions/redux/catalog/interfaces';

function* getDevices() {
	try {
		yield call(startFlow, {
			type: TypesNames.START_FLOW,
			flowType: FlowTypes.COP,
			currentStep: StepTypes.DEVICE_GALLERY.name,
		});

		// replace api with api.getDevices to point to server
		const response: AxiosResponse<Array<Device>> = yield call(api.getDevicesMock);

		yield put(CatalogActions.setDeviceList(response.data));
	} catch (e) {
		// eslint-disable-next-line no-console
		console.log(e, 'ref');
	}
}

function* watchGetDevices() {
	yield takeLatest(CatalogTypes.GET_DEVICE_LIST, getDevices);
}

function* catalogSaga() {
	yield all([fork(watchGetDevices)]);
}

export default catalogSaga;
