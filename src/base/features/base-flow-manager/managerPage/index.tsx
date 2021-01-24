import * as React from 'react';
import {
	Container
} from 'react-bootstrap';
import Flows from './flows/index';

class FlowManager extends React.Component<any, any> {
	render() {
		// eslint-disable-next-line @typescript-eslint/no-var-requires
		const { stepsConfig } = require('configurations/steps.config');

		return (
			<Container style={{ marginTop: '30px' }}>
				<h3>Flow Manager Configuration</h3>
				<Flows flowsConfig={stepsConfig as any} />
			</Container>
		);
	}
}

export default FlowManager;
