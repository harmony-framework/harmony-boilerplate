export default (originalReducerCase: Function) => {
	return (...args: any) => {
		/* Do stuff before call reducer */
		const res = originalReducerCase(...args);
		/* Do stuff after call reducer */
		return res;
	};
};
