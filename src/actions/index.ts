import { combineReducers, Reducer } from 'redux';
import { fork, all } from 'redux-saga/effects';
import baseReducers, { BaseApplicationState } from '@base/features/base-reducers';

/* ------------- Import States ------------- */
import { CatalogState } from './redux/catalog/interfaces';
import { CartState } from './redux/cart/interfaces';

/* ------------- Import Sagas ------------- */
import catalogSaga from './sagas/catalog';
import cartSaga from './sagas/cart';
import flowManagerSaga from './sagas/flowManager';

/* ------------- Define ApplicationState ------------- */
export interface ApplicationState extends BaseApplicationState {
	cart: CartState;
	catalog: CatalogState;
}

/* ------------- Export Reducers ------------- */
export const rootReducer: Reducer<ApplicationState> = combineReducers<ApplicationState>({
	...baseReducers,

	cart: require('./redux/cart').reducer,
	catalog: require('./redux/catalog').reducer
});

/* ------------- Export Sagas ------------- */
export const rootSaga = function* () {
	yield all([fork(flowManagerSaga)]);
	yield all([fork(cartSaga)]);
	yield all([fork(catalogSaga)]);
};
