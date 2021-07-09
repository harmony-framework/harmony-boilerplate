import * as React from 'react';
import { baseConnectForm } from '@base/features/base-redux-react-connect';
import { InjectedFormProps } from 'redux-form';
import {
	alphaNumeric, email, maxLength, required
} from 'utils/validations';
import { FieldInput } from 'common-components/controllers';

type Props = InjectedFormProps;

class FormExample extends React.Component<Props> {
	render() {
		const {
			handleSubmit, pristine, reset, submitting
		} = this.props;

		return (
			<form onSubmit={handleSubmit(this.handleSubmit.bind(this))}>
				<FieldInput
					name="username"
					type="text"
					label="Username"
					validate={[required, maxLength]}
					warn={alphaNumeric}
				/>
				<br /><br />
				<FieldInput
					name="email"
					type="email"
					label="Email"
					validate={email}
				/>
				<br /><br />
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

	handleSubmit() {

	}
}

export default baseConnectForm(FormExample,
	() => {
		return {};
	},
	{},
	{
		form: 'FormExampleForm'
	});
