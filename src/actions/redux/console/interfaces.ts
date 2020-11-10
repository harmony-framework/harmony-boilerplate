import { Action } from 'redux';
import { Location } from 'history';

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

export interface ActionCreator {
	updateApps:
	(apps: Array<App>, currentAppId?: string, currentSubAppId?: string, currentLocation?: Location) => UpdateAppsAction;
	updateLocation: (location: Location, appId: string, subAppId: string) => UpdateLocationAction;
	activeApp: (appId: string) => ActiveAppAction;
	activeSubApp: (subAppId: string) => ActiveSubAppAction;
	setCurrentLocationId: (location: string) => SetCurrentLocationAction;
	createApp: (appId: string, title: TabAppTitle) => CreateAppAction;
	addApp: (appId: string, title: TabAppTitle) => AddAppAction;
	removeApp: (appId: string) => RemoveAppAction;
	createSubApp: (subAppId: string, title: TabAppTitle, location?: OptionalLocation) => CreateSubAppAction;
	addSubApp: (appId: string, subAppId: string, title: TabAppTitle, location?: OptionalLocation) => AddSubAppAction;
	removeSubApp: (subAppId: string) => RemoveSubAppAction;
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
