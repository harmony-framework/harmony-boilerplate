import * as React from 'react';
import { FlowManagerAPI } from 'redux-flow-manager';
import { History, Location } from 'history';
import { decorateWithContext } from '@base/features/base-decorator';
import { createHistory } from '@base/features/base-history';
import Store, { getStore } from '@base/features/base-store';
import { createFlowManager } from '@base/features/base-flow-manager';
import { Request } from '@base/features/base-api';
import { createApi, Api } from 'requests';
import { ConsoleActions } from 'actions/console';

export interface AppContextProps {
	applicationDetails: {
		appId: string;
		subAppId: string;
		history: History;
		flowManagerApi: FlowManagerAPI;
		api: Api;
	};
}

export const AppContext = React.createContext<{ applicationDetails: { appId: string; subAppId: string }}>({
	applicationDetails: {
		appId: '',
		subAppId: ''
	}
});
const AppContextWithDecorator = decorateWithContext(AppContext);

export const BindContextToApp = (props: any) => {
	const { store } = props;
	const { appId, subAppId } = props.applicationDetails;

	const history = createHistory(appId, subAppId);

	const flowManagerApi = createFlowManager(getStore(appId), appId, subAppId);

	history.listen((location: Location) => {
		Store.global.dispatch(ConsoleActions.updateLocation(location, appId, subAppId));
	});

	const customStore = { ...store };

	customStore.getState = () => {
		const customState = { ...store.getState() };
		customState.applicationDetails = {
			appId,
			subAppId,
			flowManagerApi,
			history
		};
		return customState;
	};

	customStore.dispatch = (action: any) => {
		const newAction = action;
		newAction.applicationDetails = {
			appId,
			subAppId,
			flowManagerApi,
			history,
			api: createApi(new Request({ appId, subAppId }))
		};

		if (typeof (action) === 'function') {
			return action(store.dispatch);
		}

		return store.dispatch(newAction);
	};

	return {
		customStore,
		history
	};
};

export const WithAppContext = <T>(AppRouter: any) => AppContextWithDecorator((context: AppContextProps) => context)(AppRouter) as unknown as React.ComponentClass<T>;
