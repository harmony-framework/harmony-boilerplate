import { Action } from 'redux';

/* ------------- Define Actions and State ------------- */
export interface SessionPersistDataState {
	sessionDataExample: string;
}

export enum TypesNames {
	SET_SESSION_DATA_EXAMPLE = 'SET_SESSION_DATA_EXAMPLE'
}

export interface ActionCreator {
	setSessionDataExample: (SessionDataExample: string) => any;
}

export interface SetSessionDataExampleAction extends Action<TypesNames.SET_SESSION_DATA_EXAMPLE> {
	sessionDataExample: string;
}

/* ------------- Define Any Interfaces ------------- */
export interface ResponseExample {
	name: string;
}
