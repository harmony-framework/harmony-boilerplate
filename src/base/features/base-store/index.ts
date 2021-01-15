import { createStore, applyMiddleware, compose } from 'redux';
import { persistStore } from 'redux-persist';
import createSagaMiddleware from 'redux-saga';
import { globalStoreListener, STORE_ACTION_LISTENERS } from '@base/features/base-services';
import { config } from 'config';
import { rootReducer, rootSaga } from 'actions';

/* --------- define middleware ---------- */

export const globalActionListener = (/* store */) => (next: any) => (action: any) => {
	const result = next(action);
	globalStoreListener.publish(STORE_ACTION_LISTENERS, action);
	return result;
};

const sagaMiddleware = createSagaMiddleware();

/* -------- create the store with middleware ---------- */
let customCompose;

if (window.__REDUX_DEVTOOLS_EXTENSION__) {
	customCompose = compose(applyMiddleware(sagaMiddleware, globalActionListener), window.__REDUX_DEVTOOLS_EXTENSION__({ name: config.appName }));
} else {
	customCompose = compose(applyMiddleware(sagaMiddleware, globalActionListener));
}

const store = createStore(rootReducer, customCompose);

/* -------- run root saga ---------- */
sagaMiddleware.run(rootSaga);

/* -------- expose store functionality to page level ------------- */
export const persistor = persistStore(store);
export default store;
