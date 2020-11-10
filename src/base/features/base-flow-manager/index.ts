import CreateFlowManager from 'redux-flow-manager';
import { flowsConfig } from 'configurations/flows.config';
import { stepsConfig } from 'configurations/steps.config';

export default (Store: any) => CreateFlowManager(Store, 'flowManager', flowsConfig, stepsConfig);
