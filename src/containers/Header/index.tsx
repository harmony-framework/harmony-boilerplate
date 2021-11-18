/* eslint-disable jsx-a11y/anchor-is-valid */
import * as React from 'react';
import { Dispatch } from 'redux';
import { Link } from 'react-router-dom';
import { TranslateFunction } from 'react-localize-redux';
import { baseConnect } from '@base/features/base-redux-react-connect';
import { ApplicationState } from 'actions';
import { cartSelector, CartActions } from 'actions/cart';
import { FlowManagerActions } from 'actions/flowManager';
import { Grid, Button } from '@mui/material';
import './style.scss';
import { CartItem, ClearCartFunction } from 'actions/cart/interface';
import RoutesPath from 'routes/RoutesPath';
import { MoveToNextStepFunction } from 'actions/flowManager/interface';

export type Props = {

};

export interface OwnProps extends Props {
	cartItems: CartItem[];
	clearCart: typeof ClearCartFunction;
	translate: TranslateFunction;
	moveToNextStep: typeof MoveToNextStepFunction;
}

interface HeaderState {
	cartToggle: boolean;
}

export class Header extends React.Component<OwnProps, HeaderState> {
	constructor(props: OwnProps) {
		super(props);
		this.state = {
			cartToggle: false
		};
	}
	setCartToggle() {
		const { cartToggle } = this.state;
		this.setState({
			cartToggle: !cartToggle
		});
	}
	getTotalPrice(cartItems: CartItem[]): number {
		return cartItems.reduce((total, item): number => total + item.price, 0);
	}

	render() {
		const {
			cartItems,
			clearCart,
			translate,
			moveToNextStep
		} = this.props;
		const { cartToggle } = this.state;
		const cartItemsLength = cartItems && cartItems.length ? cartItems.length : 0;

		return (
			<>
				<nav>
					<div className="container">
						<ul className="navbar-left">
							<li>
								<Link to={RoutesPath.ROOT}>Home</Link>
							</li>
						</ul>

						<ul className="navbar-right">
							<li>
								<Button
									data-automation-id="open-cart"
									onClick={() => { this.setCartToggle(); }}
									id="cart"
								>
									<i className="fa fa-shopping-cart" />
									Cart
									<span className="badge">
										{cartItemsLength}
									</span>
								</Button>
							</li>
						</ul>
					</div>
				</nav>

				<div className="container">
					<div className="shopping-cart" style={cartToggle ? {} : { display: 'none' }}>
						<div className="shopping-cart-header">
							<i className="fa fa-shopping-cart cart-icon" />
							<span className="badge">
								{cartItemsLength}
							</span>
							<div className="shopping-cart-total">
								<span className="lighter-text">Total:</span>
								<span className="main-color-text">{`$${this.getTotalPrice(cartItems)}`}</span>
							</div>
						</div>

						<ul className="shopping-cart-items" data-automation-id="shopping-cart-items">
							{
								cartItems.map((item) => {
									return (
										<li className="clearfix" key={item.id}>
											<img
												width={64}
												height={64}
												className="mr-3"
												src={item.image}
												alt="Generic placeholder"
											/>
											<span className="item-name">{item.name}</span>
											<span className="item-price">${item.price}</span>
											<span className="item-quantity">Quantity: 01</span>
										</li>
									);
								})
							}

						</ul>

						<Grid container>
							<Grid item xs={6}>
								<Button
									className="footer-buttons"
									variant="contained"
									color="primary"
									disabled={!cartItems || !cartItems.length}
									onClick={() => { this.setCartToggle(); moveToNextStep(); }}
								>
									{translate('deviceGallery.checkoutButton')}
								</Button>
							</Grid>
							<Grid item xs={6}>
								<Button
									className="footer-buttons"
									variant="outlined"
									disabled={!cartItems || !cartItems.length}
									onClick={clearCart}
								>
									{translate('deviceGallery.clearCartButton')}
								</Button>
							</Grid>
						</Grid>
					</div>
				</div>
			</>
		);
	}
}

export default baseConnect<any, any, Props>(
	Header,
	(state: ApplicationState) => ({
		cartItems: cartSelector.getCartItems(state)
	}),
	(dispatch: Dispatch) => ({
		clearCart: () => dispatch(CartActions.clearCart()),
		moveToNextStep: (step?: string) => dispatch(FlowManagerActions.moveToNextStep(step))
	})
);
