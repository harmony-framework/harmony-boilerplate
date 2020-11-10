import * as React from 'react';
import { Dispatch } from 'redux';
import { TranslateFunction } from 'react-localize-redux';
import {
	Tab, Button, Col, Row
} from 'react-bootstrap';
import { baseConnect } from '@base/features/base-redux-react-connect';
import ConsoleActions, { consoleSelector } from 'actions/redux/console';
import { App as IApp, OptionalLocation, TabAppTitle } from 'actions/redux/console/interfaces';
import { MainApplicationState } from 'actions/redux';
import { Apps, SubApps } from 'configurations/console.config';
import App from './App';
import { SideBar } from 'common-components/business';

interface Props {
	translate: TranslateFunction;
	currentAppId: string;
	apps: Array<IApp>;
	createApp: (appId: string, title: TabAppTitle) => any;
	createSubApp: (subAppId: string, title: TabAppTitle, location?: OptionalLocation) => any;
	activeApp: (appId: string) => any;
	removeSubApp: (subAppId: string) => any;
	removeApp: (subAppId: string) => any;
}

class MainApp extends React.Component<Props> {
	renderApps() {
		const { apps, removeSubApp } = this.props;

		return apps.map((app) => {
			return (
				<App key={app.id} storeName={this.getTabTitle(app.title)} id={app.id} subApps={app.subApps} removeSubApp={removeSubApp} />
			);
		});
	}

	onSelectApp(k: string) {
		const { activeApp } = this.props;

		activeApp(k);
	}

	openStyleGuide() {
		const { createApp, createSubApp } = this.props;
		const { StyleGuideApp } = Apps;
		const { StyleGuide } = SubApps;

		createApp(StyleGuideApp.id, StyleGuideApp.title);
		createSubApp(StyleGuide.id, StyleGuide.title, StyleGuide.location);
	}

	openDemoPage() {
		const { createApp, createSubApp } = this.props;
		const { DemoApp } = Apps;
		const { DemoPage } = SubApps;

		createApp(DemoApp.id, DemoApp.title);
		createSubApp(DemoPage.id, DemoPage.title, DemoPage.location);
	}
	
	getTabTitle(title: TabAppTitle): string {
		const { translate } = this.props;

		if (typeof title === 'string') return title;

		return translate(title.id, title.data).toString();
	}

	addRandomApp() {
		const { createApp } = this.props;
		const id = Math.floor(Math.random() * 10000).toString();

		createApp(`app_${id}`, `App ${id}`);
	}

	addRandomSubApp() {
		const { createSubApp } = this.props;
		const id = Math.floor(Math.random() * 10000).toString();

		createSubApp(`sub_app_${id}`, `Sub App ${id}`);
	}

	renderDevelopmentButtons() {
		return (
			<div>
				<Button className="primary" onClick={() => this.openStyleGuide()}>Style Guide</Button>
				<Button className="primary" onClick={() => this.openDemoPage()}>Demo Page</Button>
				<Button className="primary" onClick={() => this.addRandomApp()}>Add App</Button>
				<Button className="primary" onClick={() => this.addRandomSubApp()}>Add Sub App</Button><br />
			</div>
		);
	}

	render() {
		const {
			currentAppId, apps, activeApp, removeApp
		} = this.props;

		return (
			<>
				{this.renderDevelopmentButtons()}
				<Tab.Container id="apps_tabs" activeKey={currentAppId} onSelect={(k: string) => this.onSelectApp(k)}>
					<Row className="app-container">
						<SideBar customerList={apps.map((app) => {
							return {
								active: app.id === currentAppId,
								id: app.id,
								name: this.getTabTitle(app.title),
								onClose: (customer) => removeApp(customer.id),
								onClick: (customer) => activeApp(customer.id)
							};
						})}
						>
							<h1>פרטי לקוח</h1>
						</SideBar>
						<Col className="sub-app-container">
							{this.renderApps()}
						</Col>
					</Row>
				</Tab.Container>
			</>
		);
	}
}

const ConnectedApp = baseConnect(
	MainApp,
	(state: MainApplicationState) => ({
		apps: consoleSelector.getApps(state),
		currentAppId: consoleSelector.getCurrentAppId(state)
	}),
	(dispatch: Dispatch) => ({
		createApp: (appId: string, title: TabAppTitle) => dispatch(ConsoleActions.createApp(appId, title)),
		createSubApp:
			(
				subAppId: string, title: TabAppTitle, location?: OptionalLocation
			) => dispatch(ConsoleActions.createSubApp(subAppId, title, location)),
		removeSubApp: (subAppId: string) => dispatch(ConsoleActions.removeSubApp(subAppId)),
		removeApp: (appId: string) => dispatch(ConsoleActions.removeApp(appId)),
		activeApp: (appId: string) => dispatch(ConsoleActions.activeApp(appId))
	})
);

export default ConnectedApp;
