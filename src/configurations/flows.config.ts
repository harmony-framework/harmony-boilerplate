import { FlowTypes, SubFlowTypes } from 'configurations/flows.steps.types';
import {
	isTowSamsungInCart, isTowXiaomiInCart, someFailedCondition, someSuccessCondition
} from 'actions/sagas/cart/flowConditionsExample';

export const flowsConfig = [
	{
		flowName: SubFlowTypes.onlyRunInCHQExqmple,
		runInFlowTypes: [FlowTypes.CHQ],
		conditions: [{
			conditionName: 'someFailedCondition',
			onCheck: someFailedCondition,
			mandatory: false
		}]
	},
	{
		flowName: SubFlowTypes.onlyDeviceFlow,
		runInFlowTypes: [FlowTypes.COP, FlowTypes.CHQ],
		conditions: [{
			conditionName: 'someSuccessCondition',
			onCheck: someSuccessCondition
		}]
	},
	{
		flowName: SubFlowTypes.towSamsungFlow,
		runInFlowTypes: [FlowTypes.COP],
		conditions: [
			{
				conditionName: 'isTowSamsungInCart',
				onCheck: isTowSamsungInCart,
			},
			{
				conditionName: 'someFailedCondition',
				onCheck: someFailedCondition,
				mandatory: false,
			}
		]
	},
	{
		flowName: SubFlowTypes.towXiaomiFlow,
		runInFlowTypes: [FlowTypes.COP],
		conditions: [
			{
				conditionName: 'isTowXiaomiInCart',
				onCheck: isTowXiaomiInCart,
			},
		]
	}
];
