import * as React from 'react';
import { Row, Col } from 'react-bootstrap';
import './style.scss';

interface Props {
	children: any;
}

const CustomersBar: React.FC<Props> = (props: Props) => {
	const { children } = props;

	return (
		<Row className="side-bar-customers-component">
			<Col className="side-bar-customers-container">
				{children}
			</Col>
			<Col className="side-bar-customers-buttons">
				<Row className="side-bar-customers-button search" />
				<Row className="side-bar-customers-button menu" />
			</Col>
		</Row>
	);
};

export default CustomersBar;
