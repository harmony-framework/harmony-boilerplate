import { MOCK_TYPES } from './requests/mock-service-worker/interface';

interface Config {
	ROOT_SERVER_URL?: string;
	ROOT_WS_URL?: string;
	USE_WS_ACTION?: boolean;
	COMMON_AUTHORIZATION_HEADER?: string;
	COMMON_URL_PARAMS?: Array<{key: string; value: string}>;
	appName?: string;
	STRICT_CONSOLE_ERROR?: boolean;
	USE_MOCK?: boolean;
	MOCK_TYPE?: MOCK_TYPES;
}

declare global {
	interface Window {
		__REDUX_DEVTOOLS_EXTENSION__: Function;
	}
}

const initConfig = (): Config => {
	let appConfig: Config = {};

	if (process.env.NODE_ENV === 'development') {
		/* ---------- Config Development --------- */
		appConfig = {
			USE_WS_ACTION: false,
			ROOT_SERVER_URL: 'http://localhost:5555/v1/',
			COMMON_AUTHORIZATION_HEADER: 'uxfauthorization',
			COMMON_URL_PARAMS: [{ key: 'salesChannel', value: 'retail' }],
			ROOT_WS_URL: 'ws://localhost:3030',
			STRICT_CONSOLE_ERROR: true,
			USE_MOCK: true,
			MOCK_TYPE: MOCK_TYPES.WHITE_LIST
		};
	} else if (process.env.NODE_ENV === 'production') {
		/* ---------- Config Production --------- */
		appConfig = {
			USE_WS_ACTION: false,
			ROOT_SERVER_URL: 'http://localhost:5555/v1/',
			COMMON_AUTHORIZATION_HEADER: 'uxfauthorization',
			COMMON_URL_PARAMS: [{ key: 'salesChannel', value: 'retail' }],
			ROOT_WS_URL: 'ws://localhost:3030',
			STRICT_CONSOLE_ERROR: true,
		};
	}

	return appConfig;
};

export const config = initConfig();
