import { AxiosResponse } from 'axios';
import { call, put } from 'redux-saga/effects';
import api from 'requests';
import { CatalogActions } from 'actions/catalog';
import { Device } from 'actions/catalog/interface';
import { startFlow } from 'actions/flowManager/sagas';
import { TypesNames } from 'actions/flowManager/interface';
import FlowManagerConfig from 'public/config/flow-manager/types.json';

const { flowTypes, stepTypes } = FlowManagerConfig;

export function* getDevices() {
	yield call(startFlow, {
		type: TypesNames.START_FLOW,
		flowType: flowTypes.COP,
		currentStep: stepTypes.DEVICE_GALLERY.name,
	});

	// replace api with api.getDevices to point to server
	const response: AxiosResponse<Array<Device>> = yield call(api.getDevices);

	if (response.status === 200) {
		yield put(CatalogActions.setDeviceList(response.data));
	}
}
