import { AxiosResponse } from 'axios';
import { call, put } from 'redux-saga/effects';
import api from 'requests';
import { CatalogActions } from 'actions/catalog';
import { Device } from 'actions/catalog/interface';
import { startFlow } from 'actions/flowManager/sagas';
import { TypesNames } from 'actions/flowManager/interface';
import { flowTypes, stepTypes } from 'public/config/flow-manager/types.json';

export function* getDevices() {
	try {
		yield call(startFlow, {
			type: TypesNames.START_FLOW,
			flowType: flowTypes.COP,
			currentStep: stepTypes.DEVICE_GALLERY.name,
		});

		// replace api with api.getDevices to point to server
		const response: AxiosResponse<Array<Device>> = yield call(api.getDevicesMock);

		yield put(CatalogActions.setDeviceList(response.data));
	} catch (e) {
		// eslint-disable-next-line no-console
		console.log(e, 'ref');
	}
}
