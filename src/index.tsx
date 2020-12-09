import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { PersistGate } from 'redux-persist/lib/integration/react';
import { Router } from 'react-router-dom';
import { Provider } from 'react-redux';
import { LocalizeProvider } from 'react-localize-redux';
import { ToastProvider } from 'react-toast-notifications';

/* -------- Load Styles --------- */
import 'bootstrap/dist/css/bootstrap.min.css'; // Can be replace with other style framework
import 'public/sass/style.scss';

/* -------- Harmony Features Bootstrap --------- */
import { Store, persistor, history } from 'base/features';

/* -------- Routes ---------- */
import routes from 'routes';

/* -------- render application ---------- */
ReactDOM.render(
	<Provider store={Store}>
		<PersistGate persistor={persistor}>
			<LocalizeProvider store={Store}>
				<ToastProvider>
					<Router history={history}>
						{routes}
					</Router>
				</ToastProvider>
			</LocalizeProvider>
		</PersistGate>
	</Provider>,
	document.getElementById('app')
);
