import {
	all, call, fork, put, takeLatest
} from 'redux-saga/effects';
import { AxiosResponse } from 'axios';
import CatalogActions, { CatalogTypes } from 'actions/redux/catalog';
import { startFlow } from '../flowManager';
import { TypesNames } from 'actions/redux/flowManager/interfaces';
import { FlowTypes, StepTypes } from 'configurations/flows.steps.types';
import { AppContextProps } from '@base/features/base-context';

function* getDevices(action: any & AppContextProps) {
	try {
		yield call(startFlow, {
			type: TypesNames.START_FLOW,
			applicationDetails: action.applicationDetails,
			flowType: FlowTypes.COP,
			currentStep: StepTypes.DEVICE_GALLERY.name,
		});

		const { api } = action.applicationDetails;
		const response: AxiosResponse = yield call(api.getDevicesMock);

		if (response?.data) {
			yield put(CatalogActions.setDeviceList(response.data));
		}
	} catch (e) {
		// eslint-disable-next-line no-console
		console.log(e);
	}
}

function* watchGetDevices() {
	yield takeLatest(CatalogTypes.GET_DEVICE_LIST, getDevices);
}

function* catalogSaga() {
	yield all([fork(watchGetDevices)]);
}

export default catalogSaga;
