import * as React from 'react';
import { LocalizeContextProps } from 'react-localize-redux';
import { baseConnectForm } from '@base/features/base-redux-react-connect';
import {
	InjectedFormProps, ConfigProps, initialize, getFormValues
} from 'redux-form';
import { Dispatch } from 'redux';
import {
	alphaNumeric, email, maxLength, required,
} from 'utils/validations';
import { FieldInput } from 'common-components/controllers';
import { ApplicationState } from 'actions';

export type Props = {

} & ConfigProps;

type FormValues = {
	username?: string;
	email?: string;
};

export interface OwnProps extends Props, LocalizeContextProps {
	formValues: (formName: string) => FormValues;
	initForm: (formName: string, data: FormValues) => void;
}
class FormExample extends React.Component<OwnProps & InjectedFormProps> {
	componentDidMount(): void {
		const { initForm, form } = this.props;

		initForm(form, {
			username: 'Refael'
		});
	}

	render() {
		const {
			handleSubmit, pristine, reset, submitting, formValues, form
		} = this.props;

		// eslint-disable-next-line no-console
		console.log(formValues(form));

		return (
			<form onSubmit={handleSubmit(this.handleSubmit.bind(this))}>
				<FieldInput
					name="username"
					type="text"
					placeholder="Username"
					validate={[required, maxLength]}
					warn={alphaNumeric}
				/>
				<br />
				<br />
				<FieldInput
					name="email"
					type="email"
					placeholder="Email"
					validate={email}
				/>
				<br />
				<br />
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

export default baseConnectForm<any, any, Props>(FormExample,
	(state: ApplicationState) => {
		return {
			formValues: (formName: string) => getFormValues(formName)(state)
		};
	},
	(dispatch: Dispatch) => {
		return {
			initForm: (formName: string, data: FormValues) => dispatch(initialize(formName, data))
		};
	},
	{

	});
