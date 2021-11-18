import * as React from 'react';
import { TranslateFunction } from 'react-localize-redux';
import { baseConnect } from '@base/features/base-redux-react-connect';
import { ApplicationState } from 'actions';
import { CartItem } from 'actions/cart/interface';
import { cartSelector } from 'actions/cart';
import RoutesPath from 'routes/RoutesPath';
import { Grid, Box } from '@mui/material';

interface Props {
	cartItems: CartItem[];
	translate: TranslateFunction;
	history: any;
}

class Checkout extends React.Component<Props> {
	getTotalPrice(cartItems: CartItem[]): number {
		return cartItems.reduce((total, item): number => total + item.price, 0);
	}

	componentDidMount(): void {
		const { cartItems, history } = this.props;

		if (!cartItems || !cartItems.length) {
			history.push(RoutesPath.ROOT);
		}
	}

	render() {
		const { cartItems, translate } = this.props;

		return (
			<>
				<Grid>
					<h1>{translate('checkout.pageTitle')}</h1>
				</Grid>
				<br />
				<Grid>
					<ul style={{ width: '70%' }}>
						{
							cartItems.map((item) => {
								return (
									<Box key={item.id} component="li">
										<img
											width={64}
											height={64}
											className="mr-3"
											src={item.image}
											alt="Generic placeholder"
										/>
										<h5>
											{item.name}
											<div
												style={{ display: 'inline' }}
												className="text-success float-right"
											>
												${item.price}
											</div>
										</h5>
										<h6>{item.brand}</h6>
										<p>{item.description}</p>
									</Box>
								);
							})
						}
						<br />
						<Box component="li" className="float-right">
							<h5>
								{translate('checkout.totalPriceTitle')}: &nbsp;
								<div
									style={{ display: 'inline' }}
									className="text-success float-right"
								>
									${this.getTotalPrice(cartItems)}
								</div>
							</h5>
						</Box>
					</ul>
				</Grid>
			</>
		);
	}
}

export default baseConnect(
	Checkout,
	(state: ApplicationState) => ({
		cartItems: cartSelector.getCartItems(state)
	}),
	{

	}
);
