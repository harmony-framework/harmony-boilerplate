import * as React from 'react';
import { Customer } from 'actions/redux/catalog/interfaces';
import { Nav } from 'react-bootstrap';
import './style.scss';

interface Props {
	customer: Customer;
	active: boolean;
	onClick?: (customer: Customer) => any;
	onClose?: (customer: Customer) => any;
}

interface State {
	showClose: boolean;
}

class CustomerLink extends React.Component<Props, State> {
	closeTimeout: any;
	
	constructor(props: Props) {
		super(props);
		this.state = {
			showClose: false,
		};
	}

	componentDidMount() {
		this.closeTimeout = null;
	}
	
	onClick() {
		const { onClick, customer } = this.props;

		if (onClick) {
			onClick(customer);
		}
	}

	onClose(e: MouseEvent) {
		const { onClose, customer } = this.props;

		if (onClose) {
			onClose(customer);
		}

		e.stopPropagation();
		e.preventDefault();
	}

	setCloseIcon(show: boolean) {
		this.setState({ showClose: show });
	}
	
	onCustomerMouseOver() {
		if (this.closeTimeout) {
			clearTimeout(this.closeTimeout);
			this.closeTimeout = null;
		}

		this.closeTimeout = setTimeout(() => {
			this.setCloseIcon(true);
		}, 500);
	}

	onCustomerMouseOut() {
		this.setCloseIcon(false);
		clearTimeout(this.closeTimeout);
		this.closeTimeout = null;
	}
	
	render() {
		const { showClose } = this.state;
		const { customer, active } = this.props;
		return (
			<Nav.Link
				eventKey={customer.id}
				key={customer.id}
				className={'side-bar-customers-name'.concat(active ? ' active' : '')}
				onClick={() => this.onClick()}
				onMouseOver={() => this.onCustomerMouseOver()}
				onMouseLeave={() => this.onCustomerMouseOut()}
				onFocus={() => { }}
				onBlur={() => { }}
			>
				<span>{customer.name}</span>
				{
					showClose && (
						<button type="button" className="close-customer-icon" onClick={(e: any) => this.onClose(e)}>
							<div className="close-customer-icon-x">
								<div>&#10005;</div>
							</div>
						</button>
					)
				}
			</Nav.Link>
		);
	}
}

export default CustomerLink;
