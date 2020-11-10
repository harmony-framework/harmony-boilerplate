const checkId = (id: any) => {
	if (!id) throw new Error('Must specify item id!');
};

const makeAction = (actionTypes: any, type: any) => {
	switch (type) {
		case actionTypes.CLEAR:
			return () => ({ type });
		case actionTypes.REMOVE:
			return (id: any) => {
				checkId(id);
				return { type, id };
			};
		default:
			return (id: any, payload = {}) => {
				checkId(id);
				if (
					typeof payload !== 'object'
					|| Array.isArray(payload)
				) throw new Error('Payload must be object or undefined!');
				return { type, id, ...payload };
			};
	}
};

export const makeActions = (cartName: any, actionTypes: any) => {
	return Object.entries(actionTypes).reduce(
		(r, [typeName, type]) => {
			return {
				...r,
				[typeName.toLowerCase()]: makeAction(actionTypes, type),
			};
		},
		{}
	);
};

export default makeActions;
