import { Action } from 'redux';

/* ------------- Define Actions and State ------------- */
export interface LocalPersistDataState {
	localDataExample: string;
}

export enum TypesNames {
	SET_LOCAL_DATA_EXAMPLE = 'SET_LOCAL_DATA_EXAMPLE'
}

export declare function SetLocalDataExampleFunction(localDataExample: string): SetLocalDataExampleAction;

export interface ActionCreator {
	setLocalDataExample: typeof SetLocalDataExampleFunction;
}

export interface SetLocalDataExampleAction extends Action<TypesNames.SET_LOCAL_DATA_EXAMPLE> {
	localDataExample: string;
}

/* ------------- Define Any Interfaces ------------- */
