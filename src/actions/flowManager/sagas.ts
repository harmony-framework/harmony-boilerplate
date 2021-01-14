import { AppContextProps } from '@base/features/base-context';
import { MoveToNextStepAction, StartFlowAction } from 'actions/flowManager/interface';
import * as flowManagerManager from 'actions/flowManager/manager';
import { StepTypes } from 'configurations/flows.steps.types';

export function* startFlow(action: StartFlowAction & AppContextProps) {
	const { flowType, currentStep, applicationDetails } = action;
	const { flowManagerApi } = applicationDetails;

	yield flowManagerApi?.startFlow(flowType, currentStep, true, 250);
}

export function* moveToNextStep(action: MoveToNextStepAction & AppContextProps) {
	const { step, applicationDetails } = action;
	const { flowManagerApi, history } = applicationDetails;
	const { flowType } = flowManagerManager.getFlowInformation(flowManagerApi);

	if (!flowType) return;

	yield flowManagerApi.updateInformation();
	const isLastStep = flowManagerManager.isLastStep(flowManagerApi);
	const nextStep = flowManagerApi.nextStep(step);
	const pathToMove = StepTypes[nextStep]?.path;

	if (pathToMove && !isLastStep) {
		history.push(pathToMove);
	}
}

export function* moveToPrevStep(action: MoveToNextStepAction & AppContextProps) {
	const { applicationDetails } = action;
	const { flowManagerApi } = action.applicationDetails;
	const { flowType, currentStep, steps } = flowManagerManager.getFlowInformation(flowManagerApi);

	if (!flowType || !currentStep || !steps) return;

	const currentstepIndex = steps?.indexOf(currentStep);

	if (currentstepIndex && currentstepIndex > 0) {
		yield moveToNextStep({
			step: steps[currentstepIndex - 1],
			applicationDetails
		} as MoveToNextStepAction & AppContextProps);
	}
}
