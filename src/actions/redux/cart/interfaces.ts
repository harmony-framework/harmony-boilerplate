import { Action } from 'redux';
import { BaseCartState } from '@base/features/base-cart/interfaces';

export interface CartState extends BaseCartState<CartItem> {
	cartId?: number;
}

export enum TypesNames {
	SET_CART_ID = 'SET_CART_ID',
	ADD_TO_CART = 'ADD_TO_CART',
	UPDATE_CART = 'UPDATE_CART',
	REMOVE_FROM_CART = 'REMOVE_FROM_CART',
	CLEAR_CART = 'CLEAR_CART'
}

export interface ActionCreator {
	setCartId: (cartId: string) => SetCartIdAction;
	addToCart: (item: CartItem) => AddToCartAction;
	updateCart: (item: CartItem) => UpdateCartAction;
	removeFromCart: (id: number | string) => RemoveFromCartAction;
	clearCart: () => ClearCart;
}

export interface SetCartIdAction extends Action<TypesNames.SET_CART_ID> {
	cartId: string;
}
export interface AddToCartAction extends Action<TypesNames.ADD_TO_CART> {
	item: CartItem;
}

export interface UpdateCartAction extends Action<TypesNames.UPDATE_CART> {
	item: CartItem;
}

export interface RemoveFromCartAction extends Action<TypesNames.REMOVE_FROM_CART> {
	id: number | string;
}

export interface ClearCart {
	type: Action<TypesNames.CLEAR_CART>;
}

export interface CartItem {
	id: number | string;
	brand: string;
	name: string;
	description: string;
	image?: string;
	price: number;
	quantity?: number;
}
