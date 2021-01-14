import { combineReducers, Reducer } from 'redux';
import { fork, all } from 'redux-saga/effects';

/* ------------- Import States ------------- */
import { CreateBaseReducer, BaseApplicationState } from '@base/features/base-reducers';
import { CatalogState } from 'actions/redux/catalog/interfaces';
import { ConsoleState } from 'actions/redux/console/interfaces';
import { CartState } from 'actions/cart/interface';

/* ------------- Import Sagas ------------- */
import flowManagerSaga from './sagas/flowManager';
import cartSaga from './sagas/cart';
import catalogSaga from './sagas/catalog';
import consoleSaga from './sagas/console';

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
		catalog: require('./redux/catalog').reducer
	});

	return rootReducer;
};

export const CreateMainReducer = (id: string) => {
	const rootReducer: Reducer<MainApplicationState> = combineReducers<MainApplicationState>({
		...CreateBaseReducer(id),

		console: require('./redux/console').reducer
	});

	return rootReducer;
};

/* ------------- Export Sagas ------------- */
export default function* () {
	yield all([fork(flowManagerSaga)]);
	yield all([fork(cartSaga)]);
	yield all([fork(catalogSaga)]);
	yield all([fork(consoleSaga)]);
}
