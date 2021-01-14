import { AxiosResponse } from 'axios';
import { call, put } from 'redux-saga/effects';
import { AppContextProps } from '@base/features/base-context';
import { CatalogActions } from 'actions/catalog';
import { startFlow } from '../sagas/flowManager';
import { TypesNames } from '../redux/flowManager/interfaces';
import { FlowTypes, StepTypes } from 'configurations/flows.steps.types';

export function* getDevices(action: any & AppContextProps) {
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
