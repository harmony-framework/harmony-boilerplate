import Immutable, { from } from 'seamless-immutable';
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

const INITIAL_STATE = Immutable<SessionPersistDataState>({
	sessionDataExample: 'Initial Data Example'
});
/* ------------- Selectors ------------- */

export const sessionDataSelector = {
	sessionDataExample: (state: ApplicationState) => state.sessionPersistData.sessionDataExample
};

/* ------------- Reducers ------------- */

const setSessionDataExampleReducer = (state: any, action: SetSessionDataExampleAction) => {
	// persistence provide us state without Immutable functionality
	// therefor we convert state to use Immutable in that case
	const newState = from(state);
	const { sessionDataExample } = action;
	return newState.merge({ sessionDataExample });
};

/* ------------- Hookup Reducers To Types ------------- */

export const reducer = createReducer(INITIAL_STATE, {
	[TypesNames.SET_SESSION_DATA_EXAMPLE]: createReducerCase(setSessionDataExampleReducer)
});
