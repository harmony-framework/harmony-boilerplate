import Immutable, { from, ImmutableObject } from 'seamless-immutable';
import reduceReducers from 'reduce-reducers';
import { createReducer, createActions } from 'reduxsauce';
import { ApplicationState } from 'actions';
import {
	CartState, TypesNames, ActionCreator
} from './interface';
import { SetCartIdAction } from 'actions/cart/interface';

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

const setCartIdReducer = (state: ImmutableObject<CartState>, action: SetCartIdAction) => {
	const newState: ImmutableObject<CartState> = from(state);
	const { cartId } = action;
	return newState.merge({ cartId });
};

/* ------------- Hookup Reducers To Types ------------- */

export const reducer = (baseCartReducer: any) => reduceReducers(
	baseCartReducer,
	createReducer(INITIAL_STATE, {
		[CartTypes.SET_CART_ID]: setCartIdReducer
	})
);
