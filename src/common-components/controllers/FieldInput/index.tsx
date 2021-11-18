/* eslint-disable react/jsx-props-no-spreading */
import * as React from 'react';
import { Field, BaseFieldProps, WrappedFieldProps } from 'redux-form';
import { TextField, TextFieldProps } from '@mui/material';

export type Props = {

} & BaseFieldProps & TextFieldProps;

class FiledInput extends React.Component<Props> {
	renderField(fieldData: WrappedFieldProps) {
		const { input, meta, ...rest } = fieldData;
		const { touched, error, warning } = meta;
		const errorMessage = touched ? (warning || error) : undefined;

		return (
			<TextField {...input} {...rest} helperText={errorMessage} error={errorMessage} />
		);
	}

	render() {
		return (
			<Field
				{...(this.props as BaseFieldProps)}
				component={this.renderField}
			/>
		);
	}
}

export default FiledInput;
