import { Action } from 'redux';
import { BaseCartState } from '@base/features/base-cart/interfaces';

/* ------------- Define Actions and State ------------- */
export interface CartState extends BaseCartState<CartItem> {
	cartId?: number | string;
}

export enum TypesNames {
	SET_CART_ID = 'SET_CART_ID',
	ADD_TO_CART = 'ADD_TO_CART',
	UPDATE_CART = 'UPDATE_CART',
	REMOVE_FROM_CART = 'REMOVE_FROM_CART',
	CLEAR_CART = 'CLEAR_CART'
}

export declare function SetCartIdFunction(cartId: string | number): SetCartIdAction;
export declare function AddToCartFunction(item: CartItem): AddToCartAction;
export declare function UpdateCartFunction(item: CartItem): UpdateCartAction;
export declare function RemoveFromCartFunction(id: number | string): RemoveFromCartAction;
export declare function ClearCartFunction(): ClearCartAction;

export interface ActionCreator {
	setCartId: typeof SetCartIdFunction;
	addToCart: typeof AddToCartFunction;
	updateCart: typeof UpdateCartFunction;
	removeFromCart: typeof RemoveFromCartFunction;
	clearCart: typeof ClearCartFunction;
}

export interface SetCartIdAction extends Action<TypesNames.SET_CART_ID> {
	cartId: string | number;
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

export type ClearCartAction = {
	type: Action<TypesNames.CLEAR_CART>;
};

/* ------------- Define Any Interfaces ------------- */
export interface CartItem {
	id: number | string;
	brand: string;
	name: string;
	description: string;
	image?: string;
	price: number;
	quantity?: number;
}
