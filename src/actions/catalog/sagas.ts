import { AxiosResponse } from 'axios';
import { call, put } from 'redux-saga/effects';
import { AppContextProps } from '@base/features/base-context';
import { CatalogActions } from 'actions/catalog';
import { startFlow } from 'actions/flowManager/sagas';
import { TypesNames } from 'actions/flowManager/interface';
import { flowTypes, stepTypes } from 'configurations/flow-manager/types.json';

export function* getDevices(action: any & AppContextProps) {
	try {
		yield call(startFlow, {
			type: TypesNames.START_FLOW,
			applicationDetails: action.applicationDetails,
			flowType: flowTypes.COP,
			currentStep: stepTypes.DEVICE_GALLERY.name,
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
