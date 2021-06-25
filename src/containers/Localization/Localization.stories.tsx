/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import { BaseStorybookDecorator } from '@base/features/base-decorator';
import { baseConnect } from '@base/features/base-redux-react-connect';
import { ComponentStory, Meta } from '@storybook/react';
import { Localization, Props as LocalizationProps } from './index';

export default {
	title: 'Design System/Containers/Localization',
	component: (props: LocalizationProps) => (<Localization {...props as any} />),
	argTypes: {

	},
	decorators: [BaseStorybookDecorator],
	parameters: { docs: { source: { type: 'dynamic', excludeDecorators: true } } }
} as Meta;

const Template: ComponentStory<typeof Localization> = (args) => {
	const LocalizationContainer = baseConnect<any, any, LocalizationProps>(
		Localization,
		() => ({
			...args
		})
	);

	return <LocalizationContainer {...args} />;
};

export const Default = Template.bind({});
Default.args = {

} as LocalizationProps;
