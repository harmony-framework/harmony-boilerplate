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

/**
 * Equ current step to specific page
 * @param currentUserStep
 */
export const isItCurrentStep = (currentUserStep: string) => {
	const { currentStep } = getFlowInformation();
	return currentStep === currentUserStep;
};

/**
 * Equ current step to specific page
 * @param flowStepsNames
 */
export const isPartOfMultipleSteps = (flowStepsNames: string[]) => {
	const { currentStep } = getFlowInformation();
	return flowStepsNames.includes(currentStep);
};

/**
 * Check if is it part of specific flow
 * @param flowName
 */
export const isItPartOfSpecificFlow = (flowName: string) => {
	const { flowType } = getFlowInformation();
	return flowType === flowName;
};

/**
 * This function can get multiples flow type
 * And check them by custom operator
 * @param flowNames
 * @param operator
 * @connectivity and
 */
export const isPartOfMultipleFlows = (flowNames: any[], operator = true) => {
	const { flowType } = getFlowInformation();
	return operator
		? flowNames?.includes(flowType)
		: !flowNames?.includes(flowType);
};
