import * as React from 'react';
import { baseConnect } from '@base/features/base-redux-react-connect';
import { CustomRoute } from '@base/features/base-decorator';
import { setCurrentStep } from 'actions/flowManager/manager';
import { ApplicationState } from '../actions';
import { AppContextProps } from '@base/features/base-context';

const routeDecorator = (WrappedComponent: any, step?: string) => {
	class PageContainer extends React.Component<any> {
		componentDidMount() {
			const { flowManagerApi } = this.props;
			if (step) {
				setCurrentStep(step, flowManagerApi);
			}
		}

		render() {
			// eslint-disable-next-line react/jsx-props-no-spreading
			return <WrappedComponent {...this.props} />;
		}
	}

	return baseConnect(
		PageContainer,
		(state: ApplicationState & AppContextProps) => ({
			flowManagerApi: state?.applicationDetails?.flowManagerApi
		}),
		{}
	);
};

export default CustomRoute(routeDecorator);
