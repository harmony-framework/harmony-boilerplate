import { combineReducers, Reducer } from 'redux';
import { fork, all } from 'redux-saga/effects';
import baseReducers, { BaseApplicationState } from '@base/features/base-reducers';

/* ------------- Import States ------------- */
import { CatalogState } from './redux/catalog/interfaces';
import { CartState } from 'actions/cart/interface';

/* ------------- Import Sagas ------------- */
import catalogSaga from './sagas/catalog';
import flowManagerSaga from './sagas/flowManager';
import makeCart from '@base/features/base-cart';

const baseCartReducer = makeCart('cart').reducer;

/* ------------- Define ApplicationState ------------- */
export interface ApplicationState extends BaseApplicationState {
	cart: CartState;
	catalog: CatalogState;
}

/* ------------- Export Reducers ------------- */
export const rootReducer: Reducer<ApplicationState> = combineReducers<ApplicationState>({
	...baseReducers,

	cart: require('./cart').reducer(baseCartReducer),
	catalog: require('./redux/catalog').reducer
});

/* ------------- Export Sagas ------------- */
export const rootSaga = function* () {
	yield all([fork(flowManagerSaga)]);
	yield all([fork(require('./cart').cartSaga)]);
	yield all([fork(catalogSaga)]);
};
