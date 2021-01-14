import * as React from 'react';
import { baseConnect } from '@base/features/base-redux-react-connect';
import { PendingTasks } from '@base/features/base-global-spinner/reducer';
import ErrorHandler from 'containers/ErrorHandler';
import Localization from 'containers/Localization';
import { ApplicationState } from 'actions';
import { Spinner } from 'common-components/business';
import Header from 'containers/Header';

interface Props {
	children: any;
	id: string;
	pendingTasks: PendingTasks;
}

class Layout extends React.Component<Props> {
	render() {
		const { children, id, pendingTasks } = this.props;
		const loading = pendingTasks.find((item) => `${item.appId}_${item.subAppId}` === id);

		return (
			<div id={id}>
				<Header />
				<Localization />
				<ErrorHandler />
				{(loading) && <Spinner />}
				{children}
			</div>
		);
	}

	renderMobile() {
		const { children, id, pendingTasks } = this.props;
		const loading = pendingTasks.find((item) => `${item.appId}_${item.subAppId}` === id);

		return (
			<div id={id}>
				<Header />
				<Localization />
				<ErrorHandler />
				{(loading) && <Spinner />}
				{children}
			</div>
		);
	}
}

const mapStateToProps = (state: ApplicationState) => ({
	pendingTasks: state.globalSpinner.pendingTasks
});

export default baseConnect(
	Layout,
	mapStateToProps,
	{}
);
