import * as React from 'react';
import {
	Container
} from 'react-bootstrap';
import MainTabs from './components/Tabs';
import Flows from './flows/index';

interface State {
	selectedTab: number;
}

class FlowManager extends React.Component<any, State> {
	render() {
		// eslint-disable-next-line @typescript-eslint/no-var-requires
		const { stepsConfig } = require('configurations/steps.config');

		return (
			<Container style={{ marginTop: '30px' }}>
				<h3>Flow Manager Configuration</h3><br />
				<MainTabs
					flowsComponent={<Flows flowsConfig={stepsConfig as any} />}
					subFlowsComponent={<Flows flowsConfig={stepsConfig as any} />}
					stepsComponent={<Flows flowsConfig={stepsConfig as any} />}
				/>
			</Container>
		);
	}
}

export default FlowManager;
