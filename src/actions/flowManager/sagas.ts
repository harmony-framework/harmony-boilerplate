import { MoveToNextStepAction, StartFlowAction } from 'actions/flowManager/interface';
import { flowManager, history } from '@base/features';
import * as flowManagerManager from 'actions/flowManager/manager';
import { StepTypes } from '../../configurations/flows.steps.types';

export function* startFlow(action: StartFlowAction) {
	const { flowType, currentStep } = action;
	yield flowManager.startFlow(flowType, currentStep, true, 250);
}

export function* moveToNextStep(action: MoveToNextStepAction) {
	const { step } = action;
	const { flowType } = flowManagerManager.getFlowInformation();

	if (!flowType) return;

	yield flowManager.updateInformation();
	const isLastStep = flowManagerManager.isLastStep();
	const nextStep = flowManager.nextStep(step);
	const pathToMove = StepTypes[nextStep]?.path;

	if (pathToMove && !isLastStep) {
		history.push(pathToMove);
	}
}