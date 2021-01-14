import { Action } from 'redux';

/* ------------- Define Actions and State ------------- */
export enum TypesNames {
	START_FLOW = 'START_FLOW',
	MOVE_TO_NEXT_STEP = 'MOVE_TO_NEXT_STEP'
}

export declare function StartFlowFunction(flowType: string, currentStep: string): StartFlowAction;
export declare function MoveToNextStepFunction(step?: string): MoveToNextStepAction;

export interface ActionCreator {
	startFlow: typeof StartFlowFunction;
	moveToNextStep: typeof MoveToNextStepFunction;
}

export interface StartFlowAction extends Action<TypesNames.START_FLOW> {
	flowType: string;
	currentStep: string;
}

export interface MoveToNextStepAction extends Action<TypesNames.MOVE_TO_NEXT_STEP> {
	step?: string;
}

/* ------------- Define Any Interfaces ------------- */
