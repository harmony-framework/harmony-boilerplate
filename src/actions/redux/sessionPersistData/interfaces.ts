import { Action } from 'redux';

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
