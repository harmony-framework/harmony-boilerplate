import { createStore, applyMiddleware } from 'redux';
import { persistStore } from 'redux-persist';
import createSagaMiddleware from 'redux-saga';
import { composeWithDevTools } from 'redux-devtools-extension';
import { globalStoreListener, STORE_ACTION_LISTENERS } from '@base/features/base-services';
import { config } from 'config';
import reducers from 'actions/redux';
import rootSaga from 'actions/sagas';

/* --------- define middleware ---------- */

export const globalActionListener = (/* store */) => (next: any) => (action: any) => {
	const result = next(action);
	globalStoreListener.publish(STORE_ACTION_LISTENERS, action);
	return result;
};

const sagaMiddleware = createSagaMiddleware();
const devTool = composeWithDevTools({
	name: config.appName
});
/* -------- create the store with middleware ---------- */
const createStoreWithMiddleware = devTool(applyMiddleware(sagaMiddleware, globalActionListener))(createStore);

const store = createStoreWithMiddleware(reducers);

/* -------- run root saga ---------- */
sagaMiddleware.run(rootSaga);

/* -------- expose store functionality to page level ------------- */
export const persistor = persistStore(store);
export default store;
