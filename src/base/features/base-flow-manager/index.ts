import CreateFlowManager from 'redux-flow-manager';
import { flowsConfig } from 'configurations/flows.config';
import { stepsConfig } from 'configurations/steps.config';

const flowManagersApi = {};

export const createFlowManager = (store: any, appId: string, subAppId: string) => {
	const sliceId = `${appId}_${subAppId}`;
	flowManagersApi[subAppId] = CreateFlowManager(store, 'flowManager', flowsConfig, stepsConfig, sliceId);
	return flowManagersApi[subAppId];
};

export const getFlowManagerApi = (appId: string, subAppId: string) => {
	const sliceId = `${appId}_${subAppId}`;

	return flowManagersApi[sliceId];
};

export const removeFlowManagerApi = (appId: string, subAppId: string) => {
	const sliceId = `${appId}_${subAppId}`;
	delete flowManagersApi[sliceId];
};
