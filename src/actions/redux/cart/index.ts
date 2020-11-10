import Immutable, { from } from 'seamless-immutable';
import { createReducer, createActions } from 'reduxsauce';
import reduceReducers from 'reduce-reducers';
import { makeCart } from '@base/features/base-cart';
import { ApplicationState } from '../index';
import {
	CartState, TypesNames, ActionCreator, SetCartIdAction
} from './interfaces';

/* ------------- Types and Action Creators ------------- */

const { Creators } = createActions<TypesNames, ActionCreator>({
	setCartId: ['cartId'],
	addToCart: ['item'],
	updateCart: ['item'],
	removeFromCart: ['id'],
	clearCart: null
});

export const CartTypes = TypesNames;
export default Creators;

/* ------------- Initial State ------------- */

const INITIAL_STATE = Immutable<CartState>({
	cartId: undefined,
	items: []
});

/* ------------- Selectors ------------- */

export const cartSelector = {
	getCartId: (state: ApplicationState) => state.cart.cartId,
	getCartItems: (state: ApplicationState) => state.cart.items
};

/* ------------- Reducers ------------- */

const setCartIdReducer = (state: any, action: SetCartIdAction) => {
	const newState = from(state);
	const { cartId } = action;
	return newState.merge({ cartId });
};

/* ------------- Hookup Reducers To Types ------------- */

export const reducer = reduceReducers(
	makeCart('cart').reducer,
	createReducer(INITIAL_STATE, {
		[CartTypes.SET_CART_ID]: setCartIdReducer
	})
);
