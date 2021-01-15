import { createDraft, Draft } from 'immer';
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

const INITIAL_STATE = createDraft<LocalPersistDataState>({
	localDataExample: 'Initial Data Example'
});
/* ------------- Selectors ------------- */

export const localDataSelector = {
	localDataExample: (state: ApplicationState) => state.localPersistData.localDataExample
};

/* ------------- Reducers ------------- */

const setLocalDataExampleReducer = (draft: Draft<LocalPersistDataState>, action: SetLocalDataExampleAction) => {
	const { localDataExample } = action;

	draft.localDataExample = localDataExample;
};

/* ------------- Hookup Reducers To Types ------------- */

export const reducer = createReducer(INITIAL_STATE, {
	[TypesNames.SET_LOCAL_DATA_EXAMPLE]: createReducerCase(setLocalDataExampleReducer)
});
