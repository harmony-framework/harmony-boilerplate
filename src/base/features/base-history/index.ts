import { createBrowserHistory, History } from 'history';
import Store from '@base/features/base-store';
import { consoleSelector, ConsoleActions } from 'actions/console';

const histories = {};

export const createHistory = (appId: string, subAppId: string, options?: any): History => {
	const id = `${appId}_${subAppId}`;

	histories[id] = createBrowserHistory(options);

	// set default location
	const { apps } = Store.global.getState().console;
	const subApp = apps.find((item: any) => item.id === appId)?.subApps?.find((item: any) => item.id === subAppId);

	if (subApp) {
		histories[id].location = subApp.location;
		Store.global.dispatch(ConsoleActions.updateLocation(histories[id].location, appId, subAppId));
	}

	return histories[id];
};

export const removeHistory = (appId?: string, subAppId?: string) => {
	const state = Store.global.getState();
	const selectedAppId = appId || consoleSelector.getCurrentAppId(state);
	const selectedSubAppId = subAppId || consoleSelector.getCurrentSubAppId(state);

	delete histories[`${selectedAppId}_${selectedSubAppId}`];
};

export const getHistory = (appId?: string, subAppId?: string): History => {
	const state = Store.global.getState();
	const selectedAppId = appId || consoleSelector.getCurrentAppId(state);
	const selectedSubAppId = subAppId || consoleSelector.getCurrentSubAppId(state);

	return histories[`${selectedAppId}_${selectedSubAppId}`];
};

export default {
	global: createBrowserHistory()
};
