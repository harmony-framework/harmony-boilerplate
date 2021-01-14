import { Location } from 'history';
import { consoleSelector } from 'actions/redux/console';
import { Store } from '@base/features';

export const pushLocationToUrl = (location?: Location) => {
	if (location) {
		const { pathname, search, hash } = location;
		const path = `${pathname}${search}${hash}`;
		window.history.pushState(null, '', path);
	}
};

export const isSubAppExist = (appId: string, subAppId: string) => {
	const apps = consoleSelector.getApps(Store.global.getState());

	const currentApp = apps.find((app) => app.id === appId);
	return currentApp?.subApps?.find((subApp) => subApp.id === subAppId);
};

export const isAppExist = (appId: string) => {
	const apps = consoleSelector.getApps(Store.global.getState());

	return apps.find((app) => app.id === appId);
};
