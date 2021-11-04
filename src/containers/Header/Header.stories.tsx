/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import { baseConnect } from '@base/features/base-redux-react-connect';
import { ComponentStory, Meta } from '@storybook/react';
import { Header, OwnProps as HeaderProps } from './index';

export default {
	title: 'Design System/Containers/Header',
	component: (props: HeaderProps) => (<Header {...props} />),
	argTypes: {

	},
	parameters: { docs: { source: { type: 'dynamic', excludeDecorators: true } } }
} as Meta;

const Template: ComponentStory<typeof Header> = (args: any) => {
	const HeaderContainer = baseConnect<any, any, HeaderProps>(
		Header,
		() => ({
			...args
		})
	);

	return <HeaderContainer {...args} />;
};

export const Default = Template.bind({});
Default.args = {
	cartItems: [
		{
			id: 1,
			name: 'Samsung Canvas C2 5G',
			price: 400,
			description: 'Single SIM 5G ultra wideband (mmWave) variant of Galaxy Note 20 Ultra flagship',
			brand: 'Samsung',
			image: 'https://m.media-amazon.com/images/I/51o64TWhE-L._AC_.jpg',
			quantity: 1
		},
		{
			id: 2,
			name: 'Xiaomi Apollo',
			price: 199.99,
			description: 'Top Chinese variant of Redmi K30S features multi-band FR1 5G NR connectivity',
			brand: 'Xiaomi',
			image: 'https://img.router-switch.com/media/customoptions/15/1/1/xiaomi-mi-10-pro-5g-phone-black.jpg',
			quantity: 1
		}
	]
} as HeaderProps;
