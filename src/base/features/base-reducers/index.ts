import { reducer as form } from 'redux-form';
import { persistReducer } from 'redux-persist';
import { flowManagerReducer, MultipleFlowManagerState, FlowManagerState } from 'redux-flow-manager';
import localStorage from 'redux-persist/lib/storage';
import sessionStorage from 'redux-persist/lib/storage/session';
import { localizeReducer } from 'react-localize-redux';
import { pendingTasksReducer } from 'react-redux-spinner';
import errorHandlerReducer from '@base/features/base-error-handler/reducer';
import rbaReducer from '@base/features/base-rba/reducer';
import globalSpinnerReducer, { GlobalSpinnerState } from '@base/features/base-global-spinner/reducer';
import { RBAState } from '@base/features/base-rba/interfaces';
import { ErrorHandlerRequest } from '@base/features/base-error-handler';
import { reducer as localPersistDataReducer } from 'actions/localPersistData';
import { reducer as sessionPersistDataReducer } from 'actions/sessionPersistData';
import { LocalPersistDataState } from 'actions/localPersistData/interface';
import { SessionPersistDataState } from 'actions/sessionPersistData/interface';
import { FilterState, reducer as baseFilterReducer } from '@base/features/base-filter';

export interface BaseApplicationState {
	localPersistData: LocalPersistDataState;
	sessionPersistData: SessionPersistDataState;
	localize: any;
	form: any;
	errorHandler: ErrorHandlerRequest<any>;
	pendingTasks: any;
	rba: RBAState;
	globalSpinner: GlobalSpinnerState;
	flowManager: MultipleFlowManagerState | FlowManagerState;
	filters: FilterState;
}

const localPersistConfig = {
	storage: localStorage,
	key: 'localPersistData',
	throttle: 250
};

const sessionPersistConfig = {
	storage: sessionStorage,
	key: 'sessionPersistData',
	throttle: 250,
	blackList: []
};

export default {
	form,
	localPersistData: persistReducer(localPersistConfig, localPersistDataReducer),
	sessionPersistData: persistReducer(sessionPersistConfig, sessionPersistDataReducer),
	localize: localizeReducer,
	errorHandler: errorHandlerReducer,
	pendingTasks: pendingTasksReducer,
	rba: rbaReducer,
	globalSpinner: globalSpinnerReducer,
	flowManager: flowManagerReducer,
	filters: baseFilterReducer
};
