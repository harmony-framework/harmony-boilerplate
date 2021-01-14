import { Action } from 'redux';

/* ------------- Define Actions and State ------------- */
export interface LocalPersistDataState {
	localDataExample: string;
}

export enum TypesNames {
	SET_LOCAL_DATA_EXAMPLE = 'SET_LOCAL_DATA_EXAMPLE'
}

export interface ActionCreator {
	setLocalDataExample: (localDataExample: string) => any;
}

export interface SetLocalDataExampleAction extends Action<TypesNames.SET_LOCAL_DATA_EXAMPLE> {
	localDataExample: string;
}

/* ------------- Define Any Interfaces ------------- */
