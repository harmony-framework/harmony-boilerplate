import { AxiosResponse } from 'axios';
import { config } from 'config';
import { getStore } from '@base/features/base-store';
import request from '@base/features/base-api';
import { TypesNames } from './reducer';

const transformRbaData = (result: any) => {
	const {
		data
	} = result;

	if (!data) {
		return null;
	}

	const payload = data.reduce((updatedValues: any, currentValue: any) => {
		// eslint-disable-next-line no-param-reassign
		updatedValues[currentValue.id] = currentValue.value;
		return updatedValues;
	}, {});
	return payload;
};

export const loadRBAData = async (appId: string) => {
	try {
		const response: AxiosResponse = await request.call({
			baseURL: config.ROOT_SERVER_URL,
			method: 'get',
			url: '/authentication/v1/user/policy'
		});

		const data = transformRbaData(response.data);

		getStore(appId).dispatch({ type: TypesNames.SET_RBA_DATA, payload: data });
		// SIMULATE
		// const p = { rba: { permissions: { shippment: 'hidden', searchInput: 'disabled', addToCart: 'disabled' } } };
		// Store.dispatch({ type: TypesNames.SET_RBA_DATA, payload: p.rba.permissions });
	} catch (e) {
		// eslint-disable-next-line no-console
		console.log('Rba call failed');
	}
};

export const cleanRBAData = async (appId: string) => {
	getStore(appId).dispatch({ type: TypesNames.LOGOUT });
};

export const getPermissions = (appId: string) => {
	const state = getStore(appId).getState();

	return state?.rba?.permissions;
};
