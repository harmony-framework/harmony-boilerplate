import produce from 'immer';

export default (originalReducerCase: Function) => {
	return produce((...args: any) => {
		/* Do stuff before call reducer */
		const res = originalReducerCase(...args);
		/* Do stuff after call reducer */
		return res;
	});
};
