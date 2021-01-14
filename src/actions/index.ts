import { combineReducers, Reducer } from 'redux';
import { fork, all } from 'redux-saga/effects';

/* ------------- Import States ------------- */
import { CreateBaseReducer, BaseApplicationState } from '@base/features/base-reducers';
import { CatalogState } from 'actions/catalog/interface';
import { ConsoleState } from 'actions/console/interface';
import { CartState } from 'actions/cart/interface';

/* ------------- Import Sagas ------------- */
import flowManagerSaga from './sagas/flowManager';
import { cartSaga } from 'actions/cart';
import { catalogSaga } from 'actions/catalog';
import { consoleSaga } from 'actions/console';

/* ------------- Import Base Cart ------------- */
import makeCart from '@base/features/base-cart';

const baseCartReducer = makeCart('cart').reducer;

/* ------------- Define ApplicationState ------------- */
export interface ApplicationState extends BaseApplicationState {
	cart: CartState;
	catalog: CatalogState;
}

export interface MainApplicationState extends BaseApplicationState {
	console: ConsoleState;
}

/* ------------- Export Reducers ------------- */
export const CreateReducer = (id: string) => {
	const rootReducer: Reducer<ApplicationState> = combineReducers<ApplicationState>({
		...CreateBaseReducer(id),

		cart: require('./cart').reducer(baseCartReducer),
		catalog: require('./catalog').reducer
	});

	return rootReducer;
};

export const CreateMainReducer = (id: string) => {
	const rootReducer: Reducer<MainApplicationState> = combineReducers<MainApplicationState>({
		...CreateBaseReducer(id),

		console: require('./console').reducer
	});

	return rootReducer;
};

/* ------------- Export Sagas ------------- */
export const rootSaga = function* () {
	yield all([fork(flowManagerSaga)]);
	yield all([fork(cartSaga)]);
	yield all([fork(catalogSaga)]);
	yield all([fork(consoleSaga)]);
};
