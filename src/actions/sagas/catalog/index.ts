import {
	all, call, fork, put, takeLatest
} from 'redux-saga/effects';
import responseExample from './response_example.json';
import CatalogActions, { CatalogTypes } from 'actions/redux/catalog';
import { Device } from 'actions/redux/catalog/interfaces';
import GenericMobileImage from './generic-mobile.jpg';
import { startFlow } from '../flowManager';
import { TypesNames } from 'actions/redux/flowManager/interfaces';
import { FlowTypes, StepTypes } from 'configurations/flows.steps.types';

/* Remove Comment for Full API Integration
import { AxiosResponse } from 'axios';
import api from 'requests';

const getDevicePrice = (device: any): number => {
	if (device.price && device.price.includes('&#36;')) {
		return parseFloat(device.price.split('/')[0].split(';')[2].replace(',', ''));
	}

	return Math.floor((Math.random() * 1000) + 1);
};
 */

const getDevicesMock = () => {
	const genericImage = GenericMobileImage;

	return (responseExample as Device[]).map((item) => {
		const temp = { ...item };
		temp.image = genericImage;
		return temp;
	});
};

function* getDevices() {
	try {
		yield call(startFlow, {
			type: TypesNames.START_FLOW,
			flowType: FlowTypes.COP,
			currentStep: StepTypes.DEVICE_GALLERY.name,
		});

		/* Remove Comment for Full API Integration
		const response: AxiosResponse = yield call(api.getDevices);
		const genericImage = GenericMobileImage;

		const deviceList: Device[] = response.data.map((device: any): Device => {
			const newDevice: Device = {
				id: device.DeviceName,
				name: device.DeviceName,
				price: getDevicePrice(device),
				description: `${device.type} ${device.status}`,
				brand: device.Brand,
				image: genericImage
			};

			return newDevice;
		});
		 */

		const deviceList = getDevicesMock();

		yield put(CatalogActions.setDeviceList(deviceList));
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
