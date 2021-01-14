import { createActions } from 'reduxsauce';
import { TypesNames, ActionCreator } from './interface';

/* ------------- Types and Action Creators ------------- */

const { Creators } = createActions<TypesNames, ActionCreator>({
	startFlow: ['flowType', 'currentStep'], // handle by saga
	moveToNextStep: ['step'] // handle by saga
});

export const FlowManagerTypes = TypesNames;
export const FlowManagerActions = Creators;
