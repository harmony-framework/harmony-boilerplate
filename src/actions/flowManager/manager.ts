import { FlowManagerAPI } from 'redux-flow-manager';

export const endFlow = (flowManagerApi: FlowManagerAPI) => {
	flowManagerApi.endFlow();
};

export const isLastStep = (flowManagerApi: FlowManagerAPI) => {
	const { flowType } = getFlowInformation(flowManagerApi);

	if (flowType) {
		return flowManagerApi.isLastStep();
	}

	return false;
};

export const isFirstStep = (flowManagerApi: FlowManagerAPI) => {
	const { flowType } = getFlowInformation(flowManagerApi);
	const { getSteps, getCurrentStep } = flowManagerApi;
	const steps = getSteps();
	const currentStep = getCurrentStep();

	if (flowType && steps && currentStep) {
		return steps.indexOf(currentStep) === 0;
	}

	return false;
};

export const setCurrentStep = (step: string, flowManagerApi: FlowManagerAPI) => {
	const { flowType } = getFlowInformation(flowManagerApi);

	if (flowType) {
		flowManagerApi.nextStep(step);
	}
};

export const getFlowInformation = (flowManagerApi: FlowManagerAPI) => {
	if (!flowManagerApi) return { };

	return {
		flowType: flowManagerApi.getFlowType(),
		subFlowType: flowManagerApi.getSubFlowTypes(),
		currentStep: flowManagerApi.getCurrentStep(),
		nextStep: flowManagerApi.getNextStep(),
		steps: flowManagerApi.getSteps()
	};
};
