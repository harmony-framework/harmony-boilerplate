import { Action } from 'redux';

export enum TypesNames {
	START_FLOW = 'START_FLOW',
	MOVE_TO_NEXT_STEP = 'MOVE_TO_NEXT_STEP'
}

export interface ActionCreator {
	startFlow: (flowType: string, currentStep: string) => StartFlowAction;
	moveToNextStep: (step?: string) => MoveToNextStepAction;
}

export interface StartFlowAction extends Action<TypesNames.START_FLOW> {
	flowType: string;
	currentStep: string;
}

export interface MoveToNextStepAction extends Action<TypesNames.MOVE_TO_NEXT_STEP> {
	step?: string;
}
