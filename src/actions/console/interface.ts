import { Action } from 'redux';
import { Location } from 'history';

/* ------------- Define Actions and State ------------- */
export interface ConsoleState {
	currentAppId: string;
	currentSubAppId: string;
	currentLocation?: Location;
	apps: Array<App>;
}

export enum TypesNames {
	UPDATE_APPS = 'UPDATE_APPS',
	UPDATE_LOCATION = 'UPDATE_LOCATION',
	ACTIVE_APP = 'ACTIVE_APP',
	ACTIVE_SUB_APP = 'ACTIVE_SUB_APP',
	SET_CURRENT_LOCATION_ID = 'SET_CURRENT_LOCATION_ID',
	CREATE_APP = 'CREATE_APP',
	ADD_APP = 'ADD_APP',
	REMOVE_APP = 'REMOVE_APP',
	CREATE_SUB_APP = 'CREATE_SUB_APP',
	ADD_SUB_APP = 'ADD_SUB_APP',
	REMOVE_SUB_APP = 'REMOVE_SUB_APP'
}

export declare function UpdateAppsFunction(apps: Array<App>, currentAppId?: string, currentSubAppId?: string, currentLocation?: Location): UpdateAppsAction;
export declare function UpdateLocationFunction(location: Location, appId: string, subAppId: string): UpdateLocationAction;
export declare function ActiveAppFunction(appId: string): ActiveAppAction;
export declare function ActiveSubAppFunction(subAppId: string): ActiveSubAppAction;
export declare function SetCurrentLocationFunction(location: string): SetCurrentLocationAction;
export declare function CreateAppFunction(appId: string, title: TabAppTitle): CreateAppAction;
export declare function AddAppActionFunction(appId: string, title: TabAppTitle): AddAppAction;
export declare function RemoveAppFunction(appId: string): RemoveAppAction;
export declare function CreateSubAppFunction(subAppId: string, title: TabAppTitle, location?: OptionalLocation): CreateSubAppAction;
export declare function AddSubAppFunction(appId: string, subAppId: string, title: TabAppTitle, location?: OptionalLocation): AddSubAppAction;
export declare function RemoveSubAppFunction(subAppId: string): RemoveSubAppAction;

export interface ActionCreator {
	updateApps: typeof UpdateAppsFunction;
	updateLocation: typeof UpdateLocationFunction;
	activeApp: typeof ActiveAppFunction;
	activeSubApp: typeof ActiveSubAppFunction;
	setCurrentLocationId: typeof SetCurrentLocationFunction;
	createApp: typeof CreateAppFunction;
	addApp: typeof AddAppActionFunction;
	removeApp: typeof RemoveAppFunction;
	createSubApp: typeof CreateSubAppFunction;
	addSubApp: typeof AddSubAppFunction;
	removeSubApp: typeof RemoveSubAppFunction;
}

export interface UpdateAppsAction extends Action<TypesNames.UPDATE_APPS> {
	apps: Array<App>;
	currentAppId?: string;
	currentSubAppId?: string;
	currentLocation?: Location;
}

export interface UpdateLocationAction extends Action<TypesNames.UPDATE_LOCATION> {
	location: Location;
	appId: string;
	subAppId: string;
}

export interface ActiveAppAction extends Action<TypesNames.ACTIVE_APP> {
	appId: string;
}

export interface ActiveSubAppAction extends Action<TypesNames.ACTIVE_SUB_APP> {
	subAppId: string;
}

export interface SetCurrentLocationAction extends Action<TypesNames.SET_CURRENT_LOCATION_ID> {
	location: string;
}

export interface CreateAppAction extends Action<TypesNames.CREATE_APP> {
	appId: string;
	title: TabAppTitle;
}

export interface AddAppAction extends Action<TypesNames.ADD_APP> {
	appId: string;
	title: TabAppTitle;
}

export interface RemoveAppAction extends Action<TypesNames.REMOVE_APP> {
	appId: string;
}

export interface CreateSubAppAction extends Action<TypesNames.CREATE_SUB_APP> {
	subAppId: string;
	title: TabAppTitle;
	location?: OptionalLocation;
}

export interface AddSubAppAction extends Action<TypesNames.ADD_SUB_APP> {
	appId: string;
	subAppId: string;
	title: TabAppTitle;
	location?: OptionalLocation;
}

export interface RemoveSubAppAction extends Action<TypesNames.REMOVE_SUB_APP> {
	subAppId: string;
}

/* ------------- Define Any Interfaces ------------- */
export type TabAppTitle = string | {id: string; data?: {[key: string]: any}};

export interface SubApp {
	id: string;
	title: TabAppTitle;
	isActive: boolean;
	location?: Location;
}

export interface App {
	id: string;
	title: TabAppTitle;
	subApps: Array<SubApp>;
	isActive: boolean;
}

export interface OptionalLocation {
	pathname?: string;
	search?: string;
	hash?: string;
	state?: string;
}
