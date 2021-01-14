import { call, put } from 'redux-saga/effects';
import { removeHistory } from '@base/features/base-history';
import Store, { getStores } from '@base/features/base-store';
import { removeFlowManagerApi } from '@base/features/base-flow-manager';
import * as manager from './manager';
import {
	SubApp,
	ActiveAppAction,
	ActiveSubAppAction,
	CreateAppAction,
	CreateSubAppAction,
	RemoveAppAction,
	RemoveSubAppAction,
} from 'actions/redux/console/interfaces';
import ConsoleActions, { consoleSelector, ConsoleTypes } from 'actions/redux/console';

export function* activeApp(action: ActiveAppAction) {
	const { appId } = action;

	const apps = consoleSelector.getApps(Store.global.getState());
	let currentSubAppId = '';
	let currentSubAppLocation;

	const updatedApps = apps.map((app) => {
		if (app.id === appId) {
			const currentSubApp = app.subApps.find((subApp) => subApp.isActive);
			if (currentSubApp) {
				currentSubAppId = currentSubApp.id;
				currentSubAppLocation = currentSubApp.location;
			}

			return { ...app, isActive: true };
		}
		return { ...app, isActive: false };
	});

	manager.pushLocationToUrl(currentSubAppLocation);
	yield put(ConsoleActions.updateApps(updatedApps, appId, currentSubAppId, currentSubAppLocation));
}

export function* activeSubApp(action: ActiveSubAppAction) {
	const { subAppId } = action;

	const state = Store.global.getState();
	const apps = consoleSelector.getApps(state);
	const appId = consoleSelector.getCurrentAppId(state);
	let currentSubAppLocation;

	const updatedApps = apps.map((app) => {
		if (app.id === appId) {
			const updatedSubApps = app.subApps.map((subApp) => {
				if (subApp.id === subAppId) {
					currentSubAppLocation = subApp.location;
					return { ...subApp, isActive: true };
				}
				return { ...subApp, isActive: false };
			});

			return { ...app, subApps: updatedSubApps };
		}
		return app;
	});

	manager.pushLocationToUrl(currentSubAppLocation);
	yield put(ConsoleActions.updateApps(updatedApps, appId, subAppId, currentSubAppLocation));
}

export function* createApp(action: CreateAppAction) {
	const { appId, title } = action;

	if (!manager.isAppExist(appId)) {
		yield put(ConsoleActions.addApp(appId, title));
	}

	yield call(activeApp, { type: ConsoleTypes.ACTIVE_APP, appId });
}

export function* createSubApp(action: CreateSubAppAction) {
	const {
		subAppId,
		title,
		location
	} = action;
	const appId = consoleSelector.getCurrentAppId(Store.global.getState());

	if (!manager.isSubAppExist(appId, subAppId)) {
		yield put(ConsoleActions.addSubApp(appId, subAppId, title, location));
	}

	yield call(activeSubApp, { type: ConsoleTypes.ACTIVE_SUB_APP, subAppId });
}

export function* removeApp(action: RemoveAppAction) {
	const { appId } = action;

	const state = Store.global.getState();
	const apps = consoleSelector.getApps(state);
	const currentAppId = consoleSelector.getCurrentAppId(state);
	const isCurrentAppRemove = currentAppId === appId;
	let currentAppIndex = 0;

	apps.forEach((app, index) => {
		if (app.id === appId) {
			currentAppIndex = index;
			app.subApps.forEach(function* (subApp) {
				yield call(removeSubApp, {
					type: ConsoleTypes.REMOVE_SUB_APP,
					subAppId: subApp.id
				});
			});
		}
	});

	const updatedApps = apps.filter((app) => app.id !== appId);

	yield put(ConsoleActions.updateApps(updatedApps));
	localStorage.removeItem(`persist:local:${appId}`);
	sessionStorage.removeItem(`persist:session:${appId}`);
	const stores = getStores();
	delete stores[appId];

	if (updatedApps.length && isCurrentAppRemove) {
		const previousAppId = updatedApps[currentAppIndex]?.id || updatedApps[currentAppIndex - 1].id;
		yield call(activeApp, { type: ConsoleTypes.ACTIVE_APP, appId: previousAppId });
	} else {
		yield call(activeApp, { type: ConsoleTypes.ACTIVE_APP, appId: currentAppId });
	}
}

export function* removeSubApp(action: RemoveSubAppAction) {
	const { subAppId } = action;

	const state = Store.global.getState();
	const apps = consoleSelector.getApps(state);
	const appId = consoleSelector.getCurrentAppId(state);
	const currentSubAppId = consoleSelector.getCurrentSubAppId(state);
	const isCurrentSubAppRemove = currentSubAppId === subAppId;
	let currentSubAppIndex = 0;
	let updatedSubApps: Array<SubApp> = [];

	const updatedApps = apps.map((app) => {
		if (app.id === appId) {
			updatedSubApps = app.subApps.filter((subApp, index) => {
				currentSubAppIndex = index;
				return subApp.id !== subAppId;
			});

			return { ...app, subApps: updatedSubApps };
		}
		return app;
	});

	yield put(ConsoleActions.updateApps(updatedApps));

	yield call(activeApp, { type: ConsoleTypes.ACTIVE_APP, appId });

	if (updatedSubApps.length && isCurrentSubAppRemove) {
		const previousSubAppId = updatedSubApps[currentSubAppIndex]?.id || updatedSubApps[currentSubAppIndex - 1].id;
		yield call(activeSubApp, { type: ConsoleTypes.ACTIVE_SUB_APP, subAppId: previousSubAppId });
	} else {
		yield call(activeSubApp, { type: ConsoleTypes.ACTIVE_SUB_APP, subAppId: currentSubAppId });
	}

	removeHistory(appId, subAppId);
	removeFlowManagerApi(appId, subAppId);
}
