import {
	all, fork, takeLatest
} from 'redux-saga/effects';
import { AppContextProps } from '@base/features/base-context';
import { StepTypes } from 'configurations/flows.steps.types';
import * as flowManagerAPI from './api';
import {
	TypesNames,
	StartFlowAction,
	MoveToNextStepAction
} from 'actions/redux/flowManager/interfaces';

export function* startFlow(action: StartFlowAction & AppContextProps) {
	const { flowType, currentStep, applicationDetails } = action;
	const { flowManagerApi } = applicationDetails;

	yield flowManagerApi?.startFlow(flowType, currentStep, true, 250);
}

export function* moveToNextStep(action: MoveToNextStepAction & AppContextProps) {
	const { step, applicationDetails } = action;
	const { flowManagerApi, history } = applicationDetails;
	const { flowType } = flowManagerAPI.getFlowInformation(flowManagerApi);

	if (!flowType) return;

	yield flowManagerApi.updateInformation();
	const isLastStep = flowManagerAPI.isLastStep(flowManagerApi);
	const nextStep = flowManagerApi.nextStep(step);
	const pathToMove = StepTypes[nextStep]?.path;

	if (pathToMove && !isLastStep) {
		history.push(pathToMove);
	}
}

export function* moveToPrevStep(action: MoveToNextStepAction & AppContextProps) {
	const { applicationDetails } = action;
	const { flowManagerApi } = action.applicationDetails;
	const { flowType, currentStep, steps } = flowManagerAPI.getFlowInformation(flowManagerApi);

	if (!flowType || !currentStep || !steps) return;

	const currentstepIndex = steps?.indexOf(currentStep);

	if (currentstepIndex && currentstepIndex > 0) {
		yield moveToNextStep({
			step: steps[currentstepIndex - 1],
			applicationDetails
		} as MoveToNextStepAction & AppContextProps);
	}
}

/** Watchers * */
function* watchStartFlow() {
	yield takeLatest(TypesNames.START_FLOW, startFlow);
}

function* watchMoveToNextStep() {
	yield takeLatest(TypesNames.MOVE_TO_NEXT_STEP, moveToNextStep);
}

function* flowManagerSaga() {
	yield all([
		fork(watchStartFlow),
		fork(watchMoveToNextStep)
	]);
}

export default flowManagerSaga;
