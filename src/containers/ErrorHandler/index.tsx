import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { Modal } from 'react-bootstrap';
import { Button } from '@mui/material';
import { TranslateFunction } from 'react-localize-redux';
import { baseConnect } from '@base/features/base-redux-react-connect';
import { clearErrorHandler, ErrorHandlerRequest, BaseComponentTypes } from '@base/features/base-error-handler';
import { ApplicationState } from 'actions';
import RoutesPath from 'routes/RoutesPath';
import { withToast, ToasterManager } from '@base/features/base-decorator';

export type Props = {

};

interface OwnProps extends ToasterManager, Props {
	errorHandler: ErrorHandlerRequest<any>;
	history: any;
	translate: TranslateFunction;
}

/** *** Define Possibles Component Types **** */
export enum ComponentTypes {
	MODAL = 'modal',
	TOASTER = 'toaster',
	NOTIFICATION = 'notification'
}

@withToast
export class ErrorHandler extends React.Component<OwnProps> {
	readonly appElement: HTMLElement | null;

	constructor(props: OwnProps) {
		super(props);

		this.appElement = document.getElementById('app');
	}

	// eslint-disable-next-line harmony-boilerplate/no-component-did-update
	componentDidUpdate() {
		const { errorHandler, history } = this.props;
		const { component, level } = errorHandler || {};

		if (component === BaseComponentTypes.ERROR_PAGE && !level) {
			clearErrorHandler();
			history.push(RoutesPath.ERROR_PAGE);
		}
	}

	render() {
		const { errorHandler } = this.props;
		const { component, payload, level } = errorHandler;

		if (level) {
			return null;
		}

		if (!Object.keys(errorHandler).length || component === BaseComponentTypes.IGNORE) {
			return null;
		}

		/** *** Render th Corresponding Component According to Component value **** */
		switch (component.toLowerCase()) {
			case ComponentTypes.MODAL: {
				/** *** Here you can return your modal for display with any props you sent in payload **** */
				return ReactDOM.createPortal(this.renderModal(payload), this.appElement as Element);
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
		const { toastManager, translate } = this.props;
		const { header, body, type } = payload;

		const content = (
			<div>
				<h3>{translate(header)}</h3>
				<p>{translate(body)}</p>
			</div>
		);

		setTimeout(() => {
			toastManager.add(content, {
				appearance: type
			});

			clearErrorHandler();
		});

		return null;
	}

	renderModal(payload: { body: string; header: string }) {
		const { translate } = this.props;

		return (
			<Modal.Dialog>
				<Modal.Header
					closeButton
					onClick={() => {
						clearErrorHandler();
					}}
				>
					<Modal.Title>{translate(payload.header)}</Modal.Title>
				</Modal.Header>

				<Modal.Body>
					<p>{translate(payload.header)}</p>
				</Modal.Body>

				<Modal.Footer>
					<Button
						color="primary"
						onClick={() => {
							clearErrorHandler();
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
