import Immutable, { from } from 'seamless-immutable';
import reduceReducers from 'reduce-reducers';
import { createReducer, createActions } from 'reduxsauce';
import { ApplicationState } from 'actions';
import {
	CartState, TypesNames, ActionCreator
} from './interface';
import { SetCartIdAction } from '../redux/cart/interfaces';
import { makeCart } from '@base/features/base-cart';

// TODO: Do not for get add your reducer to index file

/* ------------- Types and Action Creators ------------- */

const { Creators } = createActions<TypesNames, ActionCreator>({
	setCartId: ['cartId'],
	addToCart: ['item'],
	updateCart: ['item'],
	removeFromCart: ['id'],
	clearCart: null
});

export const CartTypes = TypesNames;
export const CatalogActions = Creators;

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
