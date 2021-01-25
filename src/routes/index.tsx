import * as React from 'react';
import { Switch } from 'react-router-dom';
import { StepTypes } from 'configurations/flows.steps.types';
import Route from './PageContainer';

/* -------------- Pages --------------- */
import App from '../App';
import DeviceGalleryPage from 'pages/DevicesGallery';
import Checkout from 'pages/Checkout';
import FormExample from 'pages/FormExample';

/* -------------- Routes Paths --------------- */
import RoutesPath from './RoutesPath';

export default (
	<App>
		<Switch>
			<Route exact path={RoutesPath.ROOT} step={StepTypes.DEVICE_GALLERY.name} component={DeviceGalleryPage} />
			<Route exact path={RoutesPath.CHECKOUT} step={StepTypes.CHECKOUT.name} component={Checkout} />
			<Route exact path={RoutesPath.FORM_EXAMPLE} component={FormExample} />
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
			<Route exact path={RoutesPath.ERROR_PAGE} component={() => <div>error page</div>} />
		</Switch>
	</App>
);
