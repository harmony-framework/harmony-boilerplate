import * as React from 'react';
import { LocalizedElement, LocalizedElementMap } from 'react-localize-redux';
import { Button, Card, Col } from 'react-bootstrap';
import { Device } from 'actions/redux/catalog/interfaces';
import './style.scss';
import RBAC from '@base/features/base-rba/components/RBAC';

interface Props {
	device: Device;
	quantity: number;
	buttonTitle: LocalizedElementMap | LocalizedElement;
	removeButtonTitle: LocalizedElementMap | LocalizedElement;
	priceTitle: LocalizedElementMap | LocalizedElement;
	onBuyClick: (device: Device) => void;
	onRemoveClick: (id: number | string) => void;
}

const DeviceCard: React.FC<Props> = (props: Props) => {
	const {
		device, buttonTitle, priceTitle, onBuyClick, quantity, removeButtonTitle, onRemoveClick
	} = props;

	return (
		<Col key={device.id} xs={0} md={0} className="device-card-col">
			<Card className="device-card">
				<Card.Body>
					<Card.Img variant="top" src={device.image} className="device-card-img" />
					<Card.Text />
					<Card.Title automation-id="card-title">{device.name}</Card.Title>
					<Card.Text>{device.description}</Card.Text>
					<Card.Text />
					<Card.Text>{priceTitle}: <b>${device.price}</b>
					</Card.Text>
					<RBAC id="addToCart">
						<Button
							automation-id="add-to-cart"
							onClick={() => { return quantity ? onRemoveClick(device.id) : onBuyClick(device); }}
							variant={quantity ? 'secondary' : 'primary'}
						>
							{ quantity ? removeButtonTitle : buttonTitle }
						</Button>
					</RBAC>
					
				</Card.Body>
			</Card>
		</Col>
	);
};

export default DeviceCard;
