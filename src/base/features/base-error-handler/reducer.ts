export enum TypesNames {
	ERROR_HANDLER_INVOKE = 'ERROR_HANDLER_INVOKE',
	ERROR_HANDLER_HANDLED = 'ERROR_HANDLER_HANDLED'
}

const initialState = {};

export default (state = initialState, action: any) => {
	const { appId, subAppId } = action;
	const newState = { ...state };

	switch (action.type) {
		case TypesNames.ERROR_HANDLER_INVOKE: {
			newState[`${appId}_${subAppId}`] = { ...action.payload };
			return newState;
		}
		case TypesNames.ERROR_HANDLER_HANDLED: {
			delete newState[`${appId}_${subAppId}`];
			return newState;
		}
		default:
			return state;
	}
};
