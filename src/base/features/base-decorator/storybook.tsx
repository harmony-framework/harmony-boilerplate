import React from 'react';
import { PersistGate } from 'redux-persist/lib/integration/react';
import { Router } from 'react-router-dom';
import { Provider } from 'react-redux';
import { LocalizeProvider } from 'react-localize-redux';
import { ToastProvider } from 'react-toast-notifications';
import { MediaContextProvider } from 'base/features/base-render-mobile';

/* -------- Harmony Features Bootstrap --------- */
import { Store, persistor, history } from 'base/features';

export default (Story: any) => {
	return (
		<Provider store={Store}>
			<PersistGate persistor={persistor}>
				<LocalizeProvider store={Store}>
					<MediaContextProvider>
						<ToastProvider>
							<Router history={history}>
								{Story()}
							</Router>
						</ToastProvider>
					</MediaContextProvider>
				</LocalizeProvider>
			</PersistGate>
		</Provider>
	);
};
