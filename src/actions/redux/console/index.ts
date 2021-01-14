import Immutable, { ImmutableObject } from 'seamless-immutable';
import { createReducer, createActions } from 'reduxsauce';
import RoutesPath from 'routes/RoutesPath';
import { MainApplicationState } from 'actions';
import {
	ConsoleState,
	TypesNames,
	ActionCreator,
	AddAppAction,
	AddSubAppAction,
	UpdateAppsAction,
	UpdateLocationAction
} from './interfaces';

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
export default Creators;

/* ------------- Initial State ------------- */

const INITIAL_STATE = Immutable<ConsoleState>({
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

const updateAppsReducer = (state: ImmutableObject<ConsoleState>, action: UpdateAppsAction) => {
	const {
		apps, currentAppId = '', currentSubAppId = '', currentLocation
	} = action;

	return state.merge({
		apps, currentAppId, currentSubAppId, currentLocation
	}, { deep: true });
};

const updateLocationReducer = (state: ImmutableObject<ConsoleState>, action: UpdateLocationAction) => {
	const { location, appId, subAppId } = action;

	const updatedApps = state.apps.map((app) => {
		if (app.id === appId) {
			const subApps = app.subApps.map((subApp) => {
				if (subApp.id === subAppId) {
					return subApp.merge({ location });
				}

				return subApp;
			});

			return app.merge({ subApps });
		}

		return app;
	});

	return state.merge({ apps: updatedApps, currentLocation: location });
};

const addAppReducer = (state: ImmutableObject<ConsoleState>, action: AddAppAction) => {
	const { appId, title } = action;

	return state.merge({
		apps: state.apps.concat([{
			id: appId, title, subApps: [], isActive: true
		}])
	});
};

const addSubAppReducer = (state: ImmutableObject<ConsoleState>, action: AddSubAppAction) => {
	const {
		appId, subAppId, title, location
	} = action;

	const updatedApps = state.apps.map((app) => {
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
			return app.merge({ subApps });
		}

		return app;
	});

	return state.merge({ apps: updatedApps });
};

/* ------------- Hookup Reducers To Types ------------- */

export const reducer = createReducer<any, any>(INITIAL_STATE, {
	[ConsoleTypes.UPDATE_APPS]: updateAppsReducer,
	[ConsoleTypes.UPDATE_LOCATION]: updateLocationReducer,
	[ConsoleTypes.ADD_APP]: addAppReducer,
	[ConsoleTypes.ADD_SUB_APP]: addSubAppReducer
});
