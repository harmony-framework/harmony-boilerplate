import CreateFlowManager, { parseSubFlowsJSON } from 'redux-flow-manager';
import subFlowsConfig from 'public/config/flow-manager/sub.flows.config.json';
import flowsConfig from 'public/config/flow-manager/flows.config.json';
import * as flowsConditions from 'configurations/flows.conditions';

const flowManagersApi = {};

export const createFlowManager = (store: any, appId: string, subAppId: string) => {
	const sliceId = `${appId}_${subAppId}`;
	flowManagersApi[subAppId] = CreateFlowManager(store, 'flowManager', parseSubFlowsJSON(subFlowsConfig, flowsConditions), flowsConfig, sliceId);
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
