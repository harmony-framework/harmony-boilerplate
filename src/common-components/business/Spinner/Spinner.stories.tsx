import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import Spinner from './index';

export default {
	title: 'Design System/Business Components/Spinner',
	component: Spinner,
	argTypes: {

	},
} as ComponentMeta<typeof Spinner>;

// eslint-disable-next-line react/jsx-props-no-spreading
const Template: ComponentStory<typeof Spinner> = (args) => <Spinner {...args} />;

export const Default = Template.bind({});
Default.args = {

};
