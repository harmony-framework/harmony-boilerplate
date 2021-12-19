/* eslint-disable react/jsx-props-no-spreading */
import * as React from 'react';
import { Alert, AlertTitle } from '@mui/material';
import { TranslateFunction } from 'react-localize-redux/es';
import { baseConnect } from '@base/features/base-redux-react-connect';
import { ApplicationState } from 'actions';
import { clearErrorHandler, ComponentLevels } from '@base/features/base-error-handler';
import { ComponentTypes } from './index';

type ErrorHandlerData = null | { component: string; payload: any };
type Config = { errorCodes?: Array<string>; asComponent?: boolean };

interface Props {
	errorHandler: any;
	translate: TranslateFunction;
}

interface State {
	handleErrorData: ErrorHandlerData;
}

const WithErrorHandler = (config: Config) => (Component: any): any => {
	class Container extends React.Component<Props, State> {
		constructor(props: Props) {
			super(props);

			this.state = {
				handleErrorData: null
			};
		}

		handledError() {
			clearErrorHandler();
			this.setState({
				handleErrorData: null
			});
		}

		static shouldHandleError(props: Props): ErrorHandlerData {
			const { errorHandler } = props;
			const { errorCodes } = config;

			if (errorHandler && Object.keys(errorHandler).length) {
				const errorData = errorHandler || {};
				const {
					component, payload, level, errorCode, status
				} = errorData;
				const fullErrorCode = `${errorCode}_${status}`;

				const shouldHandle = errorCodes?.includes(fullErrorCode);

				if (shouldHandle && component && payload && level === ComponentLevels.COMPONENT) {
					clearErrorHandler();
					return {
						component,
						payload
					};
				}
			}

			return null;
		}

		static getDerivedStateFromProps(props: Props) {
			const handleErrorData = Container.shouldHandleError(props);

			if (handleErrorData) {
				return {
					handleErrorData
				};
			}

			return null;
		}

		renderNotification(handleErrorData: ErrorHandlerData) {
			const { translate } = this.props;
			const { type, header, body } = handleErrorData?.payload || {};
			const { asComponent } = config;

			if (asComponent) {
				return (
					<Component
						{...this.props}
						errorHandled={() => this.handledError()}
						ErrorComponent={() => {
							return (
								<Alert onClose={() => this.handledError()} severity={type}>
									<AlertTitle>{translate(header)}</AlertTitle>
									<p>{translate(body)}</p>
								</Alert>
							);
						}}
					/>
				);
			}

			return (
				<Alert severity={type}>
					<AlertTitle>{translate(header)}</AlertTitle>
					<p>{translate(body)}</p>
				</Alert>
			);
		}

		render() {
			const { handleErrorData } = this.state;

			switch (handleErrorData?.component) {
				case ComponentTypes.NOTIFICATION: {
					return this.renderNotification(handleErrorData);
				}
				default: {
					return <Component errorHandled={() => this.handledError()} {...this.props} />;
				}
			}
		}
	}

	return baseConnect(
		Container,
		(state: ApplicationState) => ({
			errorHandler: state.errorHandler,
			state
		}),
		{}
	);
};

export default WithErrorHandler;
