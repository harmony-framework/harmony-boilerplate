import { all, fork, takeLatest } from 'redux-saga/effects';
import { flowManager, history } from '@base/features';
import { StepTypes } from 'configurations/flows.steps.types';
import * as flowManagerAPI from './api';
import {
	TypesNames,
	StartFlowAction,
	MoveToNextStepAction
} from 'actions/redux/flowManager/interfaces';

export function* startFlow(action: StartFlowAction) {
	const { flowType, currentStep } = action;
	yield flowManager.startFlow(flowType, currentStep, true, 250);
}

export function* moveToNextStep(action: MoveToNextStepAction) {
	const { step } = action;
	const { flowType } = flowManagerAPI.getFlowInformation();

	if (!flowType) return;

	yield flowManager.updateInformation();
	const isLastStep = flowManagerAPI.isLastStep();
	const nextStep = flowManager.nextStep(step);
	const pathToMove = StepTypes[nextStep]?.path;

	if (pathToMove && !isLastStep) {
		history.push(pathToMove);
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
