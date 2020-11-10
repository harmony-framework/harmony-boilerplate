import * as React from 'react';
import { baseConnectForm } from '@base/features/base-redux-react-connect';
import { InjectedFormProps, Field } from 'redux-form';
import { ApplicationState } from 'actions/redux';
// import FormExampleActions, { formExampleSelector } from 'actions/redux/formExample';

type Props = InjectedFormProps;

const required = (value: any) => (value || typeof value === 'number' ? undefined : 'Required');
const maxLength = (value: any) => (value && value.length > 15 ? `Must be ${15} characters or less` : undefined);
const email = (value: any) => (value && !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(value)
	? 'Invalid email address'
	: undefined);
const alphaNumeric = (value: any) => (value && /[^a-zA-Z0-9 ]/i.test(value)
	? 'Only alphanumeric characters'
	: undefined);

class FormExample extends React.Component<Props> {
	renderFiled({
		input,
		label,
		type,
		meta: { touched, error, warning },
	}: any) {
		return (
			<div>
				<label>{label}</label>
				<div>
					{/* eslint-disable-next-line react/jsx-props-no-spreading */}
					<input {...input} placeholder={label} type={type} />
					{touched
					&& ((error && <span>{error}</span>)
						|| (warning && <span>{warning}</span>))}
				</div>
			</div>
		);
	}

	render() {
		const {
			handleSubmit, pristine, reset, submitting
		} = this.props;

		return (
			<form onSubmit={handleSubmit(this.handleSubmit.bind(this))}>
				<Field
					name="username"
					type="text"
					component={this.renderFiled}
					label="Username"
					validate={[required, maxLength]}
					warn={alphaNumeric}
				/>
				<Field
					name="email"
					type="email"
					component={this.renderFiled}
					label="Email"
					validate={email}
				/>
				<div>
					<button type="submit" disabled={submitting}>
						Submit
					</button>
					<button type="button" disabled={pristine || submitting} onClick={reset}>
						Clear Values
					</button>
				</div>
			</form>
		);
	}

	handleSubmit(props: Props) {

	}
}

export default baseConnectForm(FormExample,
	(state: ApplicationState) => {
		return {};
	},
	{},
	{
		form: 'FormExampleForm'
	});
