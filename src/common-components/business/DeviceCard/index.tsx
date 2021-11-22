import * as React from 'react';
import { LocalizedElement, LocalizedElementMap } from 'react-localize-redux';
import {
	Button, Card, Grid, CardContent, Typography, CardActions, CardMedia
} from '@mui/material';
import { Device } from 'actions/catalog/interface';
import './style.scss';

export interface Props {
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

	if (!device) return null;

	return (
		<Grid container key={device.id} className="device-card-col">
			<Card className="device-card">
				<CardContent className="device-card-content">
					<Grid container spacing={2}>
						<Grid item xs={12}>
							<CardMedia
								className="device-card-img"
								image={device.image}
								title="device-card-img"
							/>
						</Grid>
						<Grid item xs={12}>
							<Typography variant="h5" component="h2" data-automation-id="card-title">
								{device.name}
							</Typography>
						</Grid>
						<Grid item xs={12}>
							<Typography variant="body2" component="p">
								{device.description}
							</Typography>
						</Grid>
						<Grid item xs={12}>
							<Typography variant="body1" component="p">
								{priceTitle}: <b>${device.price}</b>
							</Typography>
						</Grid>
					</Grid>
				</CardContent>
				<CardActions style={{ display: 'inherit' }}>
					<Button
						data-automation-id="add-to-cart"
						onClick={() => { return quantity ? onRemoveClick(device.id) : onBuyClick(device); }}
						color={quantity ? 'secondary' : 'primary'}
					>
						{ quantity ? removeButtonTitle : buttonTitle }
					</Button>
				</CardActions>
			</Card>
		</Grid>
	);
};

export default DeviceCard;
