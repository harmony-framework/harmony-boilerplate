import { createActions } from 'reduxsauce';
import { ActionCreator, TypesNames } from './interfaces';

/* ------------- Types and Action Creators ------------- */

const { Creators } = createActions<TypesNames, ActionCreator>({
	startFlow: ['flowType', 'currentStep'], // handle by saga
	moveToNextStep: ['step'] // handle by saga
});

export default Creators;
