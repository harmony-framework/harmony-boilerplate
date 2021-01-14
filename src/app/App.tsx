import * as React from 'react';
import { Dispatch } from 'redux';
import { TranslateFunction } from 'react-localize-redux';
import { Tabs, Tab } from 'react-bootstrap';
import { CreateStore } from '@base/features/base-store';
import { baseConnect } from '@base/features/base-redux-react-connect';
import SubApp from './SubApp';
import { consoleSelector, ConsoleActions } from 'actions/console';
import { MainApplicationState } from 'actions';
import { TabAppTitle } from 'actions/console/interface';

export interface OwnProps {
	storeName: string;
	translate: TranslateFunction;
	id: string;
	subApps: Array<{id: string; title: string}>;
}

interface StateProps {
	currentAppId: string;
	currentSubAppId: string;
}

interface DispatchProps {
	activeSubApp: (subAppId: string) => any;
}

type Props = OwnProps & DispatchProps & StateProps;

class App extends React.Component<Props> {
	private readonly store: any;
	private readonly persistor: any;

	constructor(props: Props) {
		super(props);
		const { storeName, id } = props;

		const storeInstance = CreateStore(storeName, id);
		this.store = storeInstance.store;
		this.persistor = storeInstance.persistor;
	}

	getTabTitle(title: TabAppTitle): string {
		const { translate } = this.props;

		if (typeof title === 'string') return title;

		return translate(title.id, title.data).toString();
	}

	renderSubApps() {
		const { id, subApps } = this.props;

		return subApps.map((subApp) => {
			const subAppId = subApp.id;

			return (
				<Tab key={subAppId} eventKey={subAppId} title={this.getTabTitle(subApp.title)}>
					<SubApp appId={id} subAppId={subAppId} store={this.store} persistor={this.persistor} />
				</Tab>
			);
		});
	}

	onSelectSubApp(k: string) {
		const { activeSubApp } = this.props;
		activeSubApp(k);
	}

	render() {
		const { id, currentSubAppId, currentAppId } = this.props;

		return (
			<Tabs
				style={currentAppId !== id ? { display: 'none' } : {}}
				activeKey={currentSubAppId}
				onSelect={(k: string) => this.onSelectSubApp(k)}
				id={`sub_app_${id}`}
			>
				{this.renderSubApps()}
			</Tabs>
		);
	}
}

export default baseConnect(
	App,
	(state: MainApplicationState) => ({
		currentAppId: consoleSelector.getCurrentAppId(state),
		currentSubAppId: consoleSelector.getCurrentSubAppId(state),
	}),
	(dispatch: Dispatch) => ({
		activeSubApp: (subAppId: string) => dispatch(ConsoleActions.activeSubApp(subAppId))
	})
);
