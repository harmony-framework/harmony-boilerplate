import {
	all, fork, put, takeLatest, select
} from 'redux-saga/effects';
import { getInstances } from '@base/features/base-cart';
import CartActions, { CartTypes, cartSelector } from 'actions/redux/cart';
import { AddToCartAction, CartItem, RemoveFromCartAction } from 'actions/redux/cart/interfaces';

const [instance] = getInstances();

function* addSaga(action: AddToCartAction) {
	const { item } = action;
	const cartItems: CartItem[] = yield select(cartSelector.getCartItems);
	const cartId: number = yield select(cartSelector.getCartId);

	if (!cartId || !cartItems || !cartItems.length) {
		yield put(CartActions.setCartId(Math.floor((Math.random() * 10000000) + 1).toString()));
	}

	yield put(instance.actions.add(item.id, item));
}

function* removeSaga(action: RemoveFromCartAction) {
	const { id } = action;

	yield put(instance.actions.remove(id));
}

function* clearSaga() {
	yield put(instance.actions.clear());
}

function* watchAddSaga() {
	yield takeLatest(CartTypes.ADD_TO_CART, addSaga);
}

function* watchRemoveSaga() {
	yield takeLatest(CartTypes.REMOVE_FROM_CART, removeSaga);
}

function* watchClearCartSaga() {
	yield takeLatest(CartTypes.CLEAR_CART, clearSaga);
}

function* cartSaga() {
	yield all([
		fork(watchAddSaga),
		fork(watchRemoveSaga),
		fork(watchClearCartSaga)
	]);
}

export default cartSaga;
