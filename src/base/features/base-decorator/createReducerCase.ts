import produce from 'immer';
import { Store } from '@base/features';

export default (originalReducerCase: Function, isDoneHandler = false) => {
	return produce((...args: any) => {
		const type = args?.[1]?.type;
		const payload = { ...args?.[1] };

		const res = originalReducerCase(...args);

		if (type && !isDoneHandler) {
			// settimeout to push action to last in memory stack
			setTimeout(() => {
				Store.dispatch({ type: `${type}_DONE`, payload });
			}, 0);
		}
		return res;
	});
};
