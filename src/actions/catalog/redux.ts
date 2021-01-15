import { createDraft, Draft } from 'immer';
import { createReducerCase } from '@base/features/base-decorator';
import { createReducer, createActions } from 'reduxsauce';
import { ApplicationState } from 'actions';
import {
	CatalogState, TypesNames, ActionCreator, SetDeviceListAction
} from './interface';

/* ------------- Types and Action Creators ------------- */

const { Creators } = createActions<TypesNames, ActionCreator>({
	getDeviceList: [],
	setDeviceList: ['deviceList']
});

export const CatalogTypes = TypesNames;
export const CatalogActions = Creators;

/* ------------- Initial State ------------- */

const INITIAL_STATE = createDraft<CatalogState>({
	deviceList: []
});
/* ------------- Selectors ------------- */

export const catalogSelector = {
	devices: (state: ApplicationState) => state.catalog.deviceList
};
/* ------------- Reducers ------------- */

const setDeviceListReducer = (draft: Draft<CatalogState>, action: SetDeviceListAction) => {
	const { deviceList } = action;
	draft.deviceList = deviceList;
};

/* ------------- Hookup Reducers To Types ------------- */

export const reducer = createReducer<any, any>(INITIAL_STATE, {
	[TypesNames.SET_DEVICE_LIST]: createReducerCase(setDeviceListReducer)
});
