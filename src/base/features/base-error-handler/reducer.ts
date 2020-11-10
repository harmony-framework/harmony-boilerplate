export enum TypesNames {
	ERROR_HANDLER_INVOKE = 'ERROR_HANDLER_INVOKE',
	ERROR_HANDLER_HANDLED = 'ERROR_HANDLER_HANDLED'
}

const initialState = {};

export default (state = initialState, action: any) => {
	switch (action.type) {
		case TypesNames.ERROR_HANDLER_INVOKE:
			return { ...state, ...action.payload };
		case TypesNames.ERROR_HANDLER_HANDLED:
			return {};
		default:
			return state;
	}
};
