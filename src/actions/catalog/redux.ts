import Immutable, { ImmutableObject } from 'seamless-immutable';
import { createReducer, createActions } from 'reduxsauce';
import { ApplicationState } from 'actions';
import {
	CatalogState, TypesNames, ActionCreator, SetExampleAction
} from './interface';

// TODO: Do not for get add your reducer to index file

/* ------------- Types and Action Creators ------------- */

const { Creators } = createActions<TypesNames, ActionCreator>({
	mySaga: ['someData'], // handle by saga
	setExample: ['exampleData']
});

export const CatalogTypes = TypesNames;
export const CatalogActions = Creators;

/* ------------- Initial State ------------- */

const INITIAL_STATE = Immutable<CatalogState>({
	exampleData: 'Initial Data Example'
});

/* ------------- Selectors ------------- */

export const catalogSelector = {
	getExampleData: (state: ApplicationState) => state.catalog?.exampleData
};

/* ------------- Reducers ------------- */

const setExampleReducer = (state: ImmutableObject<CatalogState>, action: SetExampleAction) => {
	const { exampleData } = action;
	return state.merge({ exampleData });
};

/* ------------- Hookup Reducers To Types ------------- */

export const reducer = createReducer<any, any>(INITIAL_STATE, {
	[CatalogTypes.SET_EXAMPLE]: setExampleReducer
});
