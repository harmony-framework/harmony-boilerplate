import { Store } from '@base/features';
import { cartSelector } from 'actions/cart';

export const isTowSamsungInCart = async () => {
	const cartItems = cartSelector.getCartItems(Store.getState());

	const filterCart = cartItems?.filter((item) => {
		return item.brand.toLowerCase() === 'samsung';
	});

	if (filterCart?.length >= 2) {
		return Promise.resolve();
	}

	return Promise.reject();
};

export const isTowXiaomiInCart = async () => {
	const cartItems = cartSelector.getCartItems(Store.getState());

	const filterCart = cartItems?.filter((item) => {
		return item.brand.toLowerCase() === 'xiaomi';
	});

	if (filterCart?.length >= 2) {
		return Promise.resolve();
	}

	return Promise.reject();
};

export const someFailedCondition = async () => {
	return Promise.reject();
};

export const someSuccessCondition = async () => {
	return Promise.resolve();
};
