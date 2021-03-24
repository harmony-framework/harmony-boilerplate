import * as _ from 'lodash';
import { pendingTask, begin, end } from 'react-redux-spinner';
import store from '@base/features/base-store';
import SpinnerConfig from 'configurations/spinner.config.json';
import { TypesNames } from './reducer';

const { ignoreList } = SpinnerConfig;

export const startSpinner = (url = '', uuid: string) => {
	const matchItem = _.filter(ignoreList, (regx: RegExp) => url.match(regx));

	if (store && (!matchItem || !matchItem.length)) {
		store.dispatch({
			type: TypesNames.XHR_TASK_BEGIN,
			[pendingTask]: begin,
			payload: {
				uuid,
				url
			}
		});
	}
};

export const endSpinner = (url = '', uuid: string) => {
	const matchItem = _.filter(ignoreList, (regx: RegExp) => url.match(regx));

	if (store && (!matchItem || !matchItem.length)) {
		store.dispatch({
			type: TypesNames.XHR_TASK_END,
			[pendingTask]: end,
			payload: {
				uuid,
				url
			}
		});
	}
};
