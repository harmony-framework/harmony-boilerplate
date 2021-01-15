import Immutable, { from } from 'seamless-immutable';
import { createReducerCase } from '@base/features/base-decorator';
import { createReducer, createActions } from 'reduxsauce';
import { ApplicationState } from 'actions';
import {
	LocalPersistDataState, TypesNames, ActionCreator, SetLocalDataExampleAction
} from './interface';

/* ------------- Types and Action Creators ------------- */

const { Creators } = createActions<TypesNames, ActionCreator>({
	setLocalDataExample: ['localDataExample']
});

export const LocalPersistDataTypes = TypesNames;
export const LocalPersistDataActions = Creators;

/* ------------- Initial State ------------- */

const INITIAL_STATE = Immutable<LocalPersistDataState>({
	localDataExample: 'Initial Data Example'
});
/* ------------- Selectors ------------- */

export const localDataSelector = {
	localDataExample: (state: ApplicationState) => state.localPersistData.localDataExample
};

/* ------------- Reducers ------------- */

const setLocalDataExampleReducer = (state: any, action: SetLocalDataExampleAction) => {
	// persistence provide us state without Immutable functionality
	// therefor we convert state to use Immutable in that case
	const newState = from(state);
	const { localDataExample } = action;
	return newState.merge({ localDataExample });
};

/* ------------- Hookup Reducers To Types ------------- */

export const reducer = createReducer(INITIAL_STATE, {
	[TypesNames.SET_LOCAL_DATA_EXAMPLE]: createReducerCase(setLocalDataExampleReducer)
});
