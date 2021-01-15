import { createDraft, Draft } from 'immer';
import { createReducerCase } from '@base/features/base-decorator';
import { createReducer, createActions } from 'reduxsauce';
import { MainApplicationState } from 'actions';
import {
	ConsoleState, TypesNames, ActionCreator, AddAppAction, AddSubAppAction, UpdateAppsAction, UpdateLocationAction
} from './interface';
import RoutesPath from 'routes/RoutesPath';

/* ------------- Types and Action Creators ------------- */

const { Creators } = createActions<TypesNames, ActionCreator>({
	updateApps: ['apps', 'currentAppId', 'currentSubAppId', 'currentLocation'],
	updateLocation: ['location', 'appId', 'subAppId'],
	activeApp: ['appId'], // handle by saga
	activeSubApp: ['subAppId'], // handle by saga
	addApp: ['appId', 'title'],
	addSubApp: ['appId', 'subAppId', 'title', 'location'],
	createApp: ['appId', 'title'], // handle by saga
	createSubApp: ['subAppId', 'title', 'location'], // handle by saga
	removeSubApp: ['subAppId'], // handle by saga
	removeApp: ['appId'] // handle by saga
});

export const ConsoleTypes = TypesNames;
export const ConsoleActions = Creators;

/* ------------- Initial State ------------- */

const INITIAL_STATE = createDraft<ConsoleState>({
	apps: [],
	currentAppId: '',
	currentSubAppId: '',
	currentLocation: {
		hash: '',
		key: '',
		pathname: '',
		search: '',
		state: ''
	}
});

/* ------------- Selectors ------------- */

export const consoleSelector = {
	getApps: (state: MainApplicationState) => state.console.apps,
	getCurrentAppId: (state: MainApplicationState) => state.console.currentAppId,
	getCurrentSubAppId: (state: MainApplicationState) => state.console.currentSubAppId,
	getCurrentLocation: (state: MainApplicationState) => state.console.currentLocation,
};

/* ------------- Reducers ------------- */

const updateAppsReducer = (draft: Draft<ConsoleState>, action: UpdateAppsAction) => {
	const {
		apps, currentAppId = '', currentSubAppId = '', currentLocation
	} = action;

	draft.apps = apps;
	draft.currentAppId = currentAppId;
	draft.currentSubAppId = currentSubAppId;
	draft.currentLocation = currentLocation;
};

const updateLocationReducer = (draft: Draft<ConsoleState>, action: UpdateLocationAction) => {
	const { location, appId, subAppId } = action;

	draft.apps = draft.apps.map((app) => {
		if (app.id === appId) {
			const subApps = app.subApps.map((subApp) => {
				if (subApp.id === subAppId) {
					return { ...subApp, location };
				}

				return subApp;
			});

			return { ...app, subApps };
		}

		return app;
	});

	draft.currentLocation = location;
};

const addAppReducer = (draft: Draft<ConsoleState>, action: AddAppAction) => {
	const { appId, title } = action;

	draft.apps = draft.apps.concat([{
		id: appId, title, subApps: [], isActive: true
	}]);
};

const addSubAppReducer = (draft: Draft<ConsoleState>, action: AddSubAppAction) => {
	const {
		appId, subAppId, title, location
	} = action;

	draft.apps = draft.apps.map((app) => {
		if (app.id === appId) {
			const subApps = app.subApps.concat({
				id: subAppId,
				title,
				isActive: true,
				location: {
					pathname: location?.pathname || RoutesPath.ROOT,
					search: location?.search || '',
					hash: location?.hash || '',
					state: location?.state || ''
				}
			});

			return { ...app, subApps };
		}

		return app;
	});
};

/* ------------- Hookup Reducers To Types ------------- */

export const reducer = createReducer<any, any>(INITIAL_STATE, {
	[TypesNames.UPDATE_APPS]: createReducerCase(updateAppsReducer),
	[TypesNames.UPDATE_LOCATION]: createReducerCase(updateLocationReducer),
	[TypesNames.ADD_APP]: createReducerCase(addAppReducer),
	[TypesNames.ADD_SUB_APP]: createReducerCase(addSubAppReducer)
});
