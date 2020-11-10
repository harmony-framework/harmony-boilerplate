import * as React from 'react';
import { History } from 'history';
import { Switch, Router } from 'react-router-dom';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/lib/integration/react';
import { WithAppContext, AppContextProps, BindContextToApp } from '@base/features/base-context';
import { StepTypes } from 'configurations/flows.steps.types';
import Route from './PageContainer';

/* -------------- Pages --------------- */
import DeviceGalleryPage from 'pages/DevicesGallery';
import Checkout from 'pages/Checkout';
import StyleGuide from 'pages/StyleGuide';

/* -------------- Routes Paths --------------- */
import RoutesPath from './RoutesPath';
import Layout from './Layout';

interface Props {
	persistor: any;
	store: any;
}

class AppRouter extends React.Component<Props & AppContextProps> {
	private readonly history: History;
	private customStore: any;

	constructor(props: Props & AppContextProps) {
		super(props);
		const { history, customStore } = BindContextToApp(props);

		this.history = history;
		this.customStore = customStore;
	}

	shouldComponentUpdate() {
		return false;
	}

	render() {
		const { applicationDetails, persistor } = this.props;
		const { appId, subAppId } = applicationDetails;

		return (
			<Provider key={`${appId}_${subAppId}_Provider`} store={this.customStore}>
				<PersistGate persistor={persistor}>
					<Router key={`${appId}_${subAppId}`} history={this.history}>
						<Layout id={`${appId}_${subAppId}`}>
							<Switch>
								<Route
									exact
									path={RoutesPath.ROOT}
									step={StepTypes.DEVICE_GALLERY.name}
									component={DeviceGalleryPage}
								/>
								<Route
									exact
									path={RoutesPath.CHECKOUT}
									step={StepTypes.CHECKOUT.name}
									component={Checkout}
								/>
								<Route
									exact
									path={RoutesPath.CHECKOUT_SAMSUNG}
									step={StepTypes.CHECKOUT_SAMSUNG.name}
									component={() => <h1>Checkout for Samsung</h1>}
								/>
								<Route
									exact
									path={RoutesPath.CHECKOUT_XIAOMI}
									step={StepTypes.CHECKOUT_XIAOMI.name}
									component={() => <h1>Checkout for Xiaomi</h1>}
								/>
								<Route
									exact
									path={RoutesPath.ERROR_PAGE}
									component={() => <div>error page</div>}
								/>
								<Route
									exact
									path={RoutesPath.STYLE_GUIDE}
									component={StyleGuide}
								/>
							</Switch>
						</Layout>
					</Router>
				</PersistGate>
			</Provider>
		);
	}
}

export default WithAppContext<Props>(AppRouter);
