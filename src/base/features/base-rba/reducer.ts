export enum TypesNames {
	SET_RBA_DATA = 'SET_RBA_DATA',
	LOGOUT = 'LOGOUT'
}

const initialState = {};

export default (state = initialState, action: any) => {
	switch (action.type) {
		case TypesNames.SET_RBA_DATA:
			return {
				...state,
				permissions: action.payload
			};
		case TypesNames.LOGOUT:
			return initialState;
		default:
			return state;
	}
};
