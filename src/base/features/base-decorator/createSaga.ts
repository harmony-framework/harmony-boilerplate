export default (originalSaga: Function) => {
	return function* (...args: any) {
		/* Do stuff before call saga */
		const res = yield originalSaga(...args);
		/* Do stuff after call saga */
		return res;
	};
};
