import * as React from 'react';
import { TranslateFunction } from 'react-localize-redux';
import { baseConnect } from '@base/features/base-redux-react-connect';
import { ApplicationState } from 'actions/redux';
import { CartItem } from 'actions/redux/cart/interfaces';
import { cartSelector } from 'actions/redux/cart';
import RoutesPath from 'routes/RoutesPath';
import {
	Container, Row, Media
} from 'react-bootstrap';

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
			<Container>
				<Row>
					<h1>{translate('checkout.pageTitle')}</h1>
				</Row>
				<br />
				<Row>
					<ul style={{ width: '70%' }}>
						{
							cartItems.map((item) => {
								return (
									<Media key={item.id} as="li">
										<img
											width={64}
											height={64}
											className="mr-3"
											src={item.image}
											alt="Generic placeholder"
										/>
										<Media.Body>
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
										</Media.Body>
									</Media>
								);
							})
						}
						<br />
						<Media as="li" className="float-right">
							<Media.Body>
								<h5>
									{translate('checkout.totalPriceTitle')}: &nbsp;
									<div
										style={{ display: 'inline' }}
										className="text-success float-right"
									>
										${this.getTotalPrice(cartItems)}
									</div>
								</h5>
							</Media.Body>
						</Media>
					</ul>
				</Row>
			</Container>
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
