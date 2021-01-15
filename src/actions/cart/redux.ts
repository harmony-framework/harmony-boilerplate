import { Draft } from 'immer';
import { createReducerCase } from '@base/features/base-decorator';
import reduceReducers from 'reduce-reducers';
import { createReducer, createActions } from 'reduxsauce';
import { ApplicationState } from 'actions';
import {
	CartState, TypesNames, ActionCreator, SetCartIdAction
} from './interface';

/* ------------- Types and Action Creators ------------- */

const { Creators } = createActions<TypesNames, ActionCreator>({
	setCartId: ['cartId'],
	addToCart: ['item'],
	updateCart: ['item'],
	removeFromCart: ['id'],
	clearCart: null
});

export const CartTypes = TypesNames;
export const CartActions = Creators;

/* ------------- Initial State ------------- */

const INITIAL_STATE = {
	cartId: undefined,
	items: []
};

/* ------------- Selectors ------------- */

export const cartSelector = {
	getCartId: (state: ApplicationState) => state.cart.cartId,
	getCartItems: (state: ApplicationState) => state.cart.items
};

/* ------------- Reducers ------------- */

const setCartIdReducer = (draft: Draft<CartState>, action: SetCartIdAction) => {
	const { cartId } = action;
	draft.cartId = cartId;
};

/* ------------- Hookup Reducers To Types ------------- */

export const reducer = (baseCartReducer: any) => reduceReducers(
	baseCartReducer,
	createReducer(INITIAL_STATE, {
		[CartTypes.SET_CART_ID]: createReducerCase(setCartIdReducer)
	})
);
