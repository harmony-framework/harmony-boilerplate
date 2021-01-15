import { createDraft, Draft } from 'immer';
import { createReducerCase } from '@base/features/base-decorator';
import { createReducer, createActions } from 'reduxsauce';
import { ApplicationState } from 'actions';
import {
	TodoState, TypesNames, ActionCreator, SetExampleAction
} from './interface';

/* ------------- Types and Action Creators ------------- */

const { Creators } = createActions<TypesNames, ActionCreator>({
	mySaga: ['someData'], // handle by saga
	setExample: ['exampleData']
});

export const TodoTypes = TypesNames;
export const TodoActions = Creators;

/* ------------- Initial State ------------- */

const INITIAL_STATE = createDraft<TodoState>({
	exampleData: 'Initial Data Example'
});

/* ------------- Selectors ------------- */

export const todoSelector = {
	getExampleData: (state: ApplicationState) => state.todo?.exampleData
};

/* ------------- Reducers ------------- */

const setExampleReducer = (draft: Draft<TodoState>, action: SetExampleAction) => {
	const { exampleData } = action;
	draft.exampleData = exampleData;
};

/* ------------- Hookup Reducers To Types ------------- */

export const reducer = createReducer<any, any>(INITIAL_STATE, {
	[TypesNames.SET_EXAMPLE]: createReducerCase(setExampleReducer)
});
