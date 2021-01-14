import Immutable, { ImmutableObject } from 'seamless-immutable';
import { createReducer, createActions } from 'reduxsauce';
import { ApplicationState } from 'actions';
import {
	CartState, TypesNames, ActionCreator, SetExampleAction
} from './interface';

// TODO: Do not for get add your reducer to index file

/* ------------- Types and Action Creators ------------- */

const { Creators } = createActions<TypesNames, ActionCreator>({
	mySaga: ['someData'], // handle by saga
	setExample: ['exampleData']
});

export const CartTypes = TypesNames;
export const CartActions = Creators;

/* ------------- Initial State ------------- */

const INITIAL_STATE = Immutable<CartState>({
	exampleData: 'Initial Data Example'
});

/* ------------- Selectors ------------- */

export const cartSelector = {
	getExampleData: (state: ApplicationState) => state.cart?.exampleData
};

/* ------------- Reducers ------------- */

const setExampleReducer = (state: ImmutableObject<CartState>, action: SetExampleAction) => {
	const { exampleData } = action;
	return state.merge({ exampleData });
};

/* ------------- Hookup Reducers To Types ------------- */

export const reducer = createReducer<any, any>(INITIAL_STATE, {
	[TypesNames.SET_EXAMPLE]: setExampleReducer
});
