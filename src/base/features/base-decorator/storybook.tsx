import React from 'react';
import { PersistGate } from 'redux-persist/lib/integration/react';
import { Provider } from 'react-redux';
import { LocalizeProvider } from 'react-localize-redux';
import { ToastProvider } from 'react-toast-notifications';

/* -------- Harmony Features Bootstrap --------- */
import { Store, persistor } from 'base/features';

export default (Story: any) => {
	return (
		<Provider store={Store}>
			<PersistGate persistor={persistor}>
				<LocalizeProvider store={Store}>
					<ToastProvider>
						{Story()}
					</ToastProvider>
				</LocalizeProvider>
			</PersistGate>
		</Provider>
	);
};
