import Immutable, { ImmutableObject } from 'seamless-immutable';
import { createReducer, createActions } from 'reduxsauce';
import { ApplicationState } from 'actions';
import {
	TypesNames, ActionCreator, CatalogState, SetDeviceListAction
} from './interface';

/* ------------- Types and Action Creators ------------- */

const { Creators } = createActions<TypesNames, ActionCreator>({
	getDeviceList: [],
	setDeviceList: ['deviceList']
});

export const CatalogTypes = TypesNames;
export const CatalogActions = Creators;

/* ------------- Initial State ------------- */

const INITIAL_STATE = Immutable<CatalogState>({
	deviceList: []
});
/* ------------- Selectors ------------- */

export const catalogSelector = {
	devices: (state: ApplicationState) => state.catalog.deviceList
};
/* ------------- Reducers ------------- */

const setDeviceListReducer = (state: ImmutableObject<CatalogState>, action: SetDeviceListAction) => {
	const { deviceList } = action;
	return state.merge({ deviceList });
};

/* ------------- Hookup Reducers To Types ------------- */

export const reducer = createReducer(INITIAL_STATE, {
	[CatalogTypes.SET_DEVICE_LIST]: setDeviceListReducer
});
