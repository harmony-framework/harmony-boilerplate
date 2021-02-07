/* eslint-disable react/jsx-props-no-spreading */
import React, { Component } from 'react';
import { Field, BaseFieldProps, WrappedFieldProps } from 'redux-form';

interface AdditionalProps {
	type?: string;
}

export type FieldProps<P> = P & WrappedFieldProps & BaseFieldProps & { asField?: boolean };

const containsRequiredValidation = (validate: Array<any> | any) => {
	if (Array.isArray(validate)) {
		return validate?.find((item) => item?.name === 'required');
	}

	return validate?.name === 'required';
};

export const withField = <T extends unknown>(ComponentToRender: React.ComponentType, fieldProps?: AdditionalProps): React.ComponentType<T & BaseFieldProps & { asField?: boolean; required?: boolean }> => {
	// eslint-disable-next-line react/display-name
	return class extends Component<T & BaseFieldProps & { asField?: boolean; required?: boolean }> {
		render() {
			const {
				asField = true, validate, required, name = 'missing-field-name'
			} = this.props;
			const extraProps = { required: required || containsRequiredValidation(validate), ...this.props };

			if (asField) {
				return (
					<Field
						asField={asField}
						component={ComponentToRender}
						{...extraProps}
						name={name}
						{...fieldProps}
					/>
				);
			}

			return <ComponentToRender asField={asField} {...this.props} />;
		}
	} as React.ComponentType<T & BaseFieldProps & { asField?: boolean }>;
};
