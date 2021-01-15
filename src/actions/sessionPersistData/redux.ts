import { createDraft, Draft } from 'immer';
import { createReducerCase } from '@base/features/base-decorator';
import { createReducer, createActions } from 'reduxsauce';
import { ApplicationState } from 'actions';
import {
	SessionPersistDataState, TypesNames, ActionCreator, SetSessionDataExampleAction
} from './interface';

/* ------------- Types and Action Creators ------------- */

const { Creators } = createActions<TypesNames, ActionCreator>({
	setSessionDataExample: ['sessionDataExample']
});

export const SessionPersistDataTypes = TypesNames;
export const SessionPersistDataActions = Creators;

/* ------------- Initial State ------------- */

const INITIAL_STATE = createDraft<SessionPersistDataState>({
	sessionDataExample: 'Initial Data Example'
});
/* ------------- Selectors ------------- */

export const sessionDataSelector = {
	sessionDataExample: (state: ApplicationState) => state.sessionPersistData.sessionDataExample
};

/* ------------- Reducers ------------- */

const setSessionDataExampleReducer = (draft: Draft<SessionPersistDataState>, action: SetSessionDataExampleAction) => {
	const { sessionDataExample } = action;

	draft.sessionDataExample = sessionDataExample;
};

/* ------------- Hookup Reducers To Types ------------- */

export const reducer = createReducer(INITIAL_STATE, {
	[TypesNames.SET_SESSION_DATA_EXAMPLE]: createReducerCase(setSessionDataExampleReducer)
});
