import makeActionTypes from './makeActionTypes';
import makeActions from './makeActions';
import makeReducer from './makeReducer';
import { Instance, Actions } from './interfaces';

export const instances: Array<Instance> = [];
export const getInstances = () => instances;

export const makeCart = (cartName: any) => {
	const actionTypes = makeActionTypes(cartName);

	const instance = {
		actionTypes: makeActionTypes(cartName),
		actions: makeActions(cartName, actionTypes) as Actions,
		reducer: makeReducer(cartName, actionTypes),
	};

	instances.push(instance);

	return instance;
};

export default makeCart;
