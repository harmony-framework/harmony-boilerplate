export enum TypesNames {
	UPDATE_FILTER_DATA = '@UPDATE_FILTER_DATA'
}

const initialState = {};

export const reducer = (state = initialState, action: { type: string; payload: any; name: string }) => {
	const { name } = action;

	switch (action.type) {
		case TypesNames.UPDATE_FILTER_DATA:
			return { ...state, [name]: action.payload };
		default:
			return state;
	}
};
