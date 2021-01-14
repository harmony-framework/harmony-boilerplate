import { flowManager } from '@base/features';

export const endFlow = () => {
	flowManager.endFlow();
};

export const isLastStep = () => {
	const { flowType } = getFlowInformation();

	if (flowType) {
		return flowManager.isLastStep();
	}

	return false;
};

export const setCurrentStep = (step: string) => {
	const { flowType } = getFlowInformation();

	if (flowType) {
		flowManager.nextStep(step);
	}
};

export const getFlowInformation = () => {
	return {
		flowType: flowManager.getFlowType(),
		subFlowType: flowManager.getSubFlowTypes(),
		currentStep: flowManager.getCurrentStep(),
		nextStep: flowManager.getNextStep(),
		steps: flowManager.getSteps()
	};
};
