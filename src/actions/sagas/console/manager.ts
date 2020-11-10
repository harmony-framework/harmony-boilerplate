import { Location } from 'history';

export const pushLocationToUrl = (location?: Location) => {
	if (location) {
		const { pathname, search, hash } = location;
		const path = `${pathname}${search}${hash}`;
		window.history.pushState(null, '', path);
	}
};
