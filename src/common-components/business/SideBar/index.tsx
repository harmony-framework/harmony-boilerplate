import * as React from 'react';
import { Col, Row } from 'react-bootstrap';
import { Customer } from 'actions/catalog/interface';
import CustomersBar from 'common-components/business/CustomersBar';
import './style.scss';
import CustomerLink from '../CustomerLink';

interface Props {
	customerList: Array<Customer & {
		onClick?: (customer: Customer) => any;
		onClose?: (customer: Customer) => any;
		active: boolean;
	}>;
	children: any;
}

const SideBar: React.FC<Props> = (props: Props) => {
	const { customerList, children } = props;
	return (
		<Col className="side-bar-component">
			<Row>
				<Col className="customers-bar">
					<CustomersBar>
						{customerList.map((customer) => {
							return (
								<CustomerLink
									key={customer.id}
									active={customer.active}
									customer={customer}
									onClick={customer.onClick}
									onClose={customer.onClose}
								/>
							);
						})}
					</CustomersBar>
				</Col>
				<Col className="customer-details">
					{children}
				</Col>
			</Row>
		</Col>
	);
};

export default SideBar;
