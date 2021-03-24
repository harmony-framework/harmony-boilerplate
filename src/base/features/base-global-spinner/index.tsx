import * as _ from 'lodash';
import { pendingTask, begin, end } from 'react-redux-spinner';
import { getStore } from '@base/features/base-store';
import SpinnerConfig from 'configurations/spinner.config.json';
import { TypesNames } from './reducer';

const { ignoreList } = SpinnerConfig;

export const startSpinner = (appId: string, subAppId: string, url = '', uuid: string) => {
	const matchItem = _.filter(ignoreList, (regx: RegExp) => url.match(regx));

	const store = getStore(appId);
	if (store && (!matchItem || !matchItem.length)) {
		store.dispatch({
			type: TypesNames.XHR_TASK_BEGIN,
			[pendingTask]: begin,
			payload: {
				uuid,
				url,
				appId,
				subAppId
			}
		});
	}
};

export const endSpinner = (appId: string, subAppId: string, url = '', uuid: string) => {
	const matchItem = _.filter(ignoreList, (regx: RegExp) => url.match(regx));

	const store = getStore(appId);
	if (store && (!matchItem || !matchItem.length)) {
		store.dispatch({
			type: TypesNames.XHR_TASK_END,
			[pendingTask]: end,
			payload: {
				uuid,
				url,
				appId,
				subAppId
			}
		});
	}
};
