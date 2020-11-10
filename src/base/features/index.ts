/* -------- Harmony Features Bootstrap --------- */
import Store, { persistor } from '@base/features/base-store';
import '@base/features/base-redux-websocket-actions';
import '@base/features/base-translations';
import '@base/features/base-global-spinner';
import history from '@base/features/base-history';
import CreateFlowManager from '@base/features/base-flow-manager';

const flowManager = CreateFlowManager(Store);

export {
	Store,
	history,
	persistor,
	flowManager
};
