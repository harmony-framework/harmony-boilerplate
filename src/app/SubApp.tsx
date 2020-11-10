import * as React from 'react';
import { baseConnect } from '@base/features/base-redux-react-connect';
import { AppContext } from '@base/features/base-context';
import AppRouter from 'routes';

interface Props {
	appId: string;
	subAppId: string;
	store: any;
	persistor: any;
}

class SubApp extends React.Component<Props> {
	render() {
		const {
			appId, subAppId, store, persistor
		} = this.props;

		return (
			<AppContext.Provider value={{ applicationDetails: { appId, subAppId } }}>
				<AppRouter store={store} persistor={persistor} />
			</AppContext.Provider>
		);
	}
}

export default baseConnect(SubApp, null, null);
