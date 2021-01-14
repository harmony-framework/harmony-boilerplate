import { put, select } from 'redux-saga/effects';
import { CartActions, cartSelector } from 'actions/cart';
import { AddToCartAction, CartItem, RemoveFromCartAction } from 'actions/cart/interface';
import { getInstances } from '@base/features/base-cart';

const [instance] = getInstances();

export function* addSaga(action: AddToCartAction) {
	const { item } = action;
	const cartItems: CartItem[] = yield select(cartSelector.getCartItems);
	const cartId: number = yield select(cartSelector.getCartId);

	if (!cartId || !cartItems || !cartItems.length) {
		yield put(CartActions.setCartId(Math.floor((Math.random() * 10000000) + 1).toString()));
	}

	yield put(instance.actions.add(item.id, item));
}

export function* removeSaga(action: RemoveFromCartAction) {
	const { id } = action;

	yield put(instance.actions.remove(id));
}

export function* clearSaga() {
	yield put(instance.actions.clear());
}
