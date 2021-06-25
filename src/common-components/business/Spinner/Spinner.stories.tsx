import React from 'react';
import { BaseStorybookDecorator } from '@base/features/base-decorator';
import { ComponentStory, Meta } from '@storybook/react';
import Spinner from './index';

export default {
	title: 'Design System/Business Components/Spinner',
	component: Spinner,
	argTypes: {

	},
	decorators: [BaseStorybookDecorator],
	parameters: { docs: { source: { type: 'dynamic', excludeDecorators: true } } }
} as Meta;

// eslint-disable-next-line react/jsx-props-no-spreading
const Template: ComponentStory<typeof Spinner> = (args) => <Spinner {...args} />;

export const Default = Template.bind({});
Default.args = {

};
