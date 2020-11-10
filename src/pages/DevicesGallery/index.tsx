import * as React from 'react';
import { Dispatch } from 'redux';
import { TranslateFunction } from 'react-localize-redux';
import { baseConnect } from '@base/features/base-redux-react-connect';
import {
	Container, Row, CardDeck, Button, Form
} from 'react-bootstrap';
import './style.scss';
import { ApplicationState } from 'actions/redux';
import CatalogActions, { catalogSelector } from 'actions/redux/catalog';
import FlowManagerActions from 'actions/redux/flowManager';
import { Device } from 'actions/redux/catalog/interfaces';
import CartActions, { cartSelector } from 'actions/redux/cart';
import { CartItem } from 'actions/redux/cart/interfaces';
import DeviceCard from 'common-components/business/DeviceCard';
// import { loadRBAData } from '@base/features/base-rba';
import RBAC from '@base/features/base-rba/components/RBAC';

interface Props {
	getDeviceList: () => any;
	addToCart: (item: CartItem) => any;
	removeFromCart: (id: number | string) => any;
	clearCart: () => any;
	deviceList: Device[];
	cartItems: CartItem[];
	translate: TranslateFunction;
	moveToNextStep: (step?: string) => any;
}

interface State {
	searchValue: string;
}

class DeviceGallery extends React.Component<Props, State> {
	constructor(props: Props) {
		super(props);

		this.state = {
			searchValue: ''
		};
	}

	getQuantity(id: number | string): number {
		const { cartItems } = this.props;

		const item = cartItems.find((cartItem) => cartItem.id === id);

		if (item) {
			return item.quantity as number;
		}

		return 0;
	}
	componentDidMount() {
		const { getDeviceList, deviceList } = this.props;

		if (!deviceList || !deviceList.length) {
			getDeviceList();
		}

		// loadRBAData();
	}

	render() {
		const { searchValue } = this.state;
		const {
			deviceList, translate, addToCart, removeFromCart, cartItems, moveToNextStep, clearCart
		} = this.props;

		if (!deviceList || !deviceList.length) {
			return null;
		}

		return (
			<Container>
				<Row>
					<RBAC id="shippment">
						<h1 id="page-header">{translate('deviceGallery.pageTitle')}</h1>
					</RBAC>
				</Row>
				<br />
				<Form className="row">
					<Form.Group>
						<RBAC id="searchInput">
							<Form.Control
								type="text"
								automation-id="filter-input"
								placeholder="Search"
								onChange={(e) => this.setState({ searchValue: e.target.value.toLowerCase() })}
							/>
						</RBAC>
					</Form.Group>
					
				</Form>
				<Row>
					<CardDeck>
						{deviceList.map((device: Device) => {
							if (!searchValue || device.name.toLowerCase().includes(searchValue)) {
								return (
									<DeviceCard
										key={device.id}
										device={device}
										buttonTitle={translate('deviceGallery.addToCartButton')}
										removeButtonTitle={translate('deviceGallery.removeFromCartButton')}
										priceTitle={translate('deviceGallery.priceTitle')}
										onBuyClick={addToCart}
										onRemoveClick={removeFromCart}
										quantity={this.getQuantity(device.id)}
									/>
								);
							}

							return null;
						})}
					</CardDeck>
				</Row>

				<Row className="footer-button-row" style={{ display: 'none' }}>
					<Button
						className="footer-buttons"
						variant="success"
						size="lg"
						disabled={!cartItems || !cartItems.length}
						onClick={() => moveToNextStep()}
					>
						{translate('deviceGallery.checkoutButton')}
					</Button>
					<Button
						className="footer-buttons"
						variant="primary"
						size="lg"
						disabled={!cartItems || !cartItems.length}
						onClick={clearCart}
					>
						{translate('deviceGallery.clearCartButton')}
					</Button>
				</Row>
			</Container>
		);
	}
}

export default baseConnect(
	DeviceGallery,
	(state: ApplicationState) => ({
		deviceList: catalogSelector.devices(state),
		cartItems: cartSelector.getCartItems(state)
	}),
	(dispatch: Dispatch) => ({
		getDeviceList: () => dispatch(CatalogActions.getDeviceList()),
		addToCart: (item: CartItem) => dispatch(CartActions.addToCart(item)),
		removeFromCart: (id: number | string) => dispatch(CartActions.removeFromCart(id)),
		clearCart: () => dispatch(CartActions.clearCart()),
		moveToNextStep: (step?: string) => dispatch(FlowManagerActions.moveToNextStep(step))
	})
);
