import { Action } from 'redux';

/* ------------- Define Actions and State ------------- */
export interface CatalogState {
	deviceList: Device[];
}

export enum TypesNames {
	GET_DEVICE_LIST = 'GET_DEVICE_LIST',
	SET_DEVICE_LIST = 'SET_DEVICE_LIST'
}

export declare function GetDeviceListFunction(): GetDeviceListAction;
export declare function SetDeviceListFunction(deviceList: Device[]): SetDeviceListAction;

export interface ActionCreator {
	getDeviceList: typeof GetDeviceListFunction;
	setDeviceList: typeof SetDeviceListFunction;
}

export interface SetDeviceListAction extends Action<TypesNames.SET_DEVICE_LIST> {
	deviceList: Device[];
}

export type GetDeviceListAction = Action<TypesNames.GET_DEVICE_LIST>;

/* ------------- Define Any Interfaces ------------- */
export interface Device {
	id: number;
	name: string;
	price: number;
	description: string;
	image: string;
	brand: string;
}
