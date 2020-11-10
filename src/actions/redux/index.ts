import { combineReducers, Reducer } from 'redux';

import { CreateBaseReducer, BaseApplicationState } from '@base/features/base-reducers';
import { CatalogState } from './catalog/interfaces';
import { ConsoleState } from './console/interfaces';
import { CartState } from './cart/interfaces';

export interface ApplicationState extends BaseApplicationState {
	cart: CartState;
	catalog: CatalogState;
}

export interface MainApplicationState extends BaseApplicationState {
	console: ConsoleState;
}

export const CreateReducer = (id: string) => {
	const rootReducer: Reducer<ApplicationState> = combineReducers<ApplicationState>({
		...CreateBaseReducer(id),

		cart: require('./cart').reducer,
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
