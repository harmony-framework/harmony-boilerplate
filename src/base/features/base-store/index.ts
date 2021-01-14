import {
	createStore, applyMiddleware, Store, compose
} from 'redux';
import Immutable from 'seamless-immutable';
import { persistStore } from 'redux-persist';
import createSagaMiddleware from 'redux-saga';
import { globalStoreListener, STORE_ACTION_LISTENERS } from '@base/features/base-services';
import { Request } from '@base/features/base-api';
import { createApi } from 'requests';
import { config } from 'config';
import {
	rootSaga, CreateReducer, CreateMainReducer, ApplicationState
} from 'actions';
import { consoleSelector } from 'actions/redux/console';

const stores = {};

export const CreateStore = (name: string, id: string, isMainStore = false) => {
	const sagaMiddleware = createSagaMiddleware();

	/* -------- create the store with middleware ---------- */
	let store;
	let customCompose;

	if (window.devToolsExtension) {
		customCompose = compose(
			applyMiddleware(sagaMiddleware, globalActionListener),
			window.devToolsExtension && window.devToolsExtension({
				name: `${config.appName} ${name}`,
				deserializeState: (state: ApplicationState) => {
					return Immutable(state);
				},
			})
		);
	} else {
		customCompose = compose(applyMiddleware(sagaMiddleware, globalActionListener));
	}

	if (isMainStore) {
		store = createStore(CreateMainReducer(id), customCompose);

		const customStore = { ...store };
		store.dispatch = (action: any) => {
			const newAction = action;
			newAction.applicationDetails = {
				api: createApi(new Request())
			};

			if (typeof (action) === 'function') {
				return action(customStore.dispatch);
			}

			return customStore.dispatch(newAction);
		};
	} else {
		store = createStore(CreateReducer(id), customCompose);
	}

	/* -------- run root saga ---------- */
	sagaMiddleware.run(rootSaga);

	/* -------- expose store functionality to page level ------------- */
	const persistor = persistStore(store);

	stores[id] = store;

	return {
		persistor,
		store: stores[id] as Store
	};
};

/* --------- define middleware ---------- */
export const globalActionListener = (/* store */) => (next: any) => (action: any) => {
	const result = next(action);
	globalStoreListener.publish(STORE_ACTION_LISTENERS, action);
	return result;
};

const mainStore = CreateStore('Main App', 'main_app', true);
export const getStore = (id?: string): Store => {
	if (id) {
		return stores[id];
	}

	const state = mainStore.store.getState();
	const currentAppId = consoleSelector.getCurrentAppId(state);

	return stores[currentAppId];
};

export const getStores = () => {
	return stores;
};

export const { persistor } = mainStore;

export default {
	global: mainStore.store as Store,
	get current() {
		return getStore();
	}
};
