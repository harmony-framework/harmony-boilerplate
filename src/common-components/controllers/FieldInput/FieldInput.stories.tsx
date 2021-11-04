/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import { baseConnectForm } from '@base/features/base-redux-react-connect';
import { ComponentStory, Meta } from '@storybook/react';
import {
	alphaNumeric, maxLength, required
} from 'utils/validations';
import FieldInput, { Props as FieldInputProps } from './index';

export default {
	title: 'Design System/Controllers/Inputs',
	component: FieldInput,
	argTypes: {

	},
	parameters: { docs: { source: { type: 'dynamic', excludeDecorators: true } } }
} as Meta;

// eslint-disable-next-line react/jsx-props-no-spreading
const Template: ComponentStory<typeof FieldInput> = (args) => {
	const form = () => {
		return (
			<form>
				<FieldInput {...(args as any)} />
			</form>
		);
	};

	const ConnectedForm = baseConnectForm(
		form,
		() => ({
			...args
		}),
		{},
		{ form: 'InputField' }
	);

	return <ConnectedForm />;
};

export const InputField = Template.bind({});
InputField.args = {
	name: 'username',
	placeholder: 'username',
	type: 'text',
	label: 'Username',
	validate: [required, maxLength],
	warn: alphaNumeric
} as FieldInputProps;
