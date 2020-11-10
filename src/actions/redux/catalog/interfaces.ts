import { Action } from 'redux';

export interface CatalogState {
	deviceList: Device[];
}

export enum TypesNames {
	GET_DEVICE_LIST = 'GET_DEVICE_LIST',
	SET_DEVICE_LIST = 'SET_DEVICE_LIST'
}

export interface ActionCreator {
	getDeviceList: () => Action<TypesNames.GET_DEVICE_LIST>;
	setDeviceList: (deviceList: Device[]) => SetDeviceListAction;
}

export interface SetDeviceListAction extends Action<TypesNames.SET_DEVICE_LIST> {
	deviceList: Device[];
}

export interface Device {
	id: number;
	name: string;
	price: number;
	description: string;
	image: string;
	brand: string;
}
