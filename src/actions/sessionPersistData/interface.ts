import { Action } from 'redux';

/* ------------- Define Actions and State ------------- */
export interface SessionPersistDataState {
	sessionDataExample: string;
}

export enum TypesNames {
	SET_SESSION_DATA_EXAMPLE = 'SET_SESSION_DATA_EXAMPLE'
}

declare function SetSessionDataExampleFunction(SessionDataExample: string): SetSessionDataExampleAction;

export interface ActionCreator {
	setSessionDataExample: typeof SetSessionDataExampleFunction;
}

export interface SetSessionDataExampleAction extends Action<TypesNames.SET_SESSION_DATA_EXAMPLE> {
	sessionDataExample: string;
}

/* ------------- Define Any Interfaces ------------- */
