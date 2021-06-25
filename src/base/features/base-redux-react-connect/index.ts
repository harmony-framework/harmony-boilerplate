import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { withLocalize } from 'react-localize-redux';
import { reduxForm } from 'redux-form';

export function baseConnect<S, D, O>(component: any, mapStateToProps: any, propsToDispatch?: any) {
	const componentWithRouter = withRouter(component);
	return (
		connect<S, D, O>(
			mapStateToProps, propsToDispatch
		)(withLocalize<any>(componentWithRouter))
	);
}

export function baseConnectForm<S, D, O>(component: any, mapStateToProps: any, propsToDispatch: any, formConfig: any) {
	return connectWithReduxForm<S, D, O>(baseConnect<S, D, O>(component, mapStateToProps, propsToDispatch), formConfig);
}

function connectWithReduxForm<S, D, O>(component: any, reduxFormConfig: any) {
	const defaultValidateFunction = () => undefined;

	// eslint-disable-next-line no-param-reassign
	reduxFormConfig.validate = component?.prototype?.validate || defaultValidateFunction;

	return reduxForm<S, O>(reduxFormConfig)(component);
}
