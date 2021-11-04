import React from 'react';
import { ComponentStory, Meta } from '@storybook/react';
import Spinner from './index';

export default {
	title: 'Design System/Business Components/Spinner',
	component: Spinner,
	argTypes: {

	},
	parameters: { docs: { source: { type: 'dynamic', excludeDecorators: true } } }
} as Meta;

// eslint-disable-next-line react/jsx-props-no-spreading
const Template: ComponentStory<typeof Spinner> = (args: any) => <Spinner {...args} />;

export const Default = Template.bind({});
Default.args = {

};
