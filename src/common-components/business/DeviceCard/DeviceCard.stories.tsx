import React from 'react';
import { BaseStorybookDecorator } from '@base/features/base-decorator';
import { ComponentStory, Meta } from '@storybook/react';
import DeviceCard, { Props as DeviceCardProps } from './index';

export default {
	title: 'Design System/Business Components/Device Card',
	component: DeviceCard,
	argTypes: {
		quantity: {
			description: 'The numbers of this Item in Cart. Once bigger then 1 title become remove.'
		}
	},
	decorators: [BaseStorybookDecorator],
	parameters: { docs: { source: { type: 'dynamic', excludeDecorators: true } } }
} as Meta;

// eslint-disable-next-line react/jsx-props-no-spreading
const Template: ComponentStory<typeof DeviceCard> = (args) => <DeviceCard {...args} />;

export const Buy = Template.bind({});
Buy.args = {
	device: {
		id: 1,
		brand: 'Samsung',
		image: 'https://m.media-amazon.com/images/I/51o64TWhE-L._AC_.jpg',
		description: 'Single SIM 5G ultra wideband (mmWave) variant of Galaxy Note 20 Ultra flagship',
		name: 'Samsung Canvas C2 5G',
		price: 400
	},
	quantity: 0,
	priceTitle: 'Price',
	removeButtonTitle: 'Remove',
	buttonTitle: 'Add to Cart'
} as DeviceCardProps;

export const Remove = Template.bind({});
Remove.args = {
	...Buy.args,
	quantity: 1,
} as DeviceCardProps;
