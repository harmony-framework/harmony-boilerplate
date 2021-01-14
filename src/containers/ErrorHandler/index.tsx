import * as React from 'react';
import { Modal, Button } from 'react-bootstrap';
import { baseConnect } from '@base/features/base-redux-react-connect';
import { clearErrorHandler, ErrorHandlerRequest, BaseComponentTypes } from '@base/features/base-error-handler';
import { ApplicationState } from 'actions';
import RoutesPath from 'routes/RoutesPath';
import { AppContextProps } from '@base/features/base-context';
import { withToast, ToasterManager } from '@base/features/base-decorator';

interface Props extends AppContextProps, ToasterManager {
	errorHandler: ErrorHandlerRequest<any>;
	history: any;
}

/** *** Define Possibles Component Types **** */
export enum ComponentTypes {
	MODAL = 'modal',
	TOASTER = 'toaster'
}

@withToast
class ErrorHandler extends React.Component<Props> {
	readonly appElement: HTMLElement | null;

	constructor(props: Props) {
		super(props);

		this.appElement = document.getElementById('app');
	}

	// eslint-disable-next-line harmony-boilerplate/no-component-did-update
	componentDidUpdate() {
		const { errorHandler, history, applicationDetails } = this.props;
		const { appId, subAppId } = applicationDetails;
		const { component } = errorHandler[`${appId}_${subAppId}`] || {};

		if (component === BaseComponentTypes.ERROR_PAGE) {
			clearErrorHandler(appId, subAppId);
			history.push(RoutesPath.ERROR_PAGE);
		}
	}

	render() {
		const { errorHandler, applicationDetails } = this.props;
		const { appId, subAppId } = applicationDetails;
		const { component, payload } = errorHandler[`${appId}_${subAppId}`] || {};

		if (!component || !Object.keys(errorHandler).length || component === BaseComponentTypes.IGNORE) {
			return null;
		}

		/** *** Render th Corresponding Component According to Component value **** */
		switch (component.toLowerCase()) {
			case ComponentTypes.MODAL: {
				return this.renderModal(payload);
			}
			case ComponentTypes.TOASTER: {
				return this.displayToaster(payload);
			}
			default: {
				return null;
			}
		}
	}

	displayToaster(payload: { body: string; header: string; type: 'success' | 'error' | 'warning' | 'info' }) {
		const { toastManager, applicationDetails } = this.props;
		const { header, body, type } = payload;
		const { appId, subAppId } = applicationDetails;

		const content = (
			<div>
				<h3>{header}</h3>
				<p>{body}</p>
			</div>
		);

		toastManager.add(content, {
			appearance: type
		});

		clearErrorHandler(appId, subAppId);

		return null;
	}

	renderModal(payload: { body: string; header: string }) {
		const { applicationDetails } = this.props;
		const { appId, subAppId } = applicationDetails;

		return (
			<Modal.Dialog>
				<Modal.Header
					closeButton
					onClick={() => {
						clearErrorHandler(appId, subAppId);
					}}
				>
					<Modal.Title>{payload.header}</Modal.Title>
				</Modal.Header>

				<Modal.Body>
					<p>{payload.body}</p>
				</Modal.Body>

				<Modal.Footer>
					<Button
						variant="primary"
						onClick={() => {
							clearErrorHandler(appId, subAppId);
						}}
					>
						Close
					</Button>
				</Modal.Footer>
			</Modal.Dialog>
		);
	}
}

export default baseConnect(
	ErrorHandler,
	(state: ApplicationState) => ({
		errorHandler: state.errorHandler
	}),
	{}
);
