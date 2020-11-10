import { FlowTypes, SubFlowTypes, StepTypes } from 'configurations/flows.steps.types';

export const stepsConfig = {
	[FlowTypes.CHQ]: {
		[SubFlowTypes.onlyDeviceFlow]: {
			steps: [
				StepTypes.DEVICE_GALLERY.name,
				StepTypes.CHECKOUT.name
			]
		}
	},
	[FlowTypes.COP]: {
		[`${SubFlowTypes.towXiaomiFlow},${SubFlowTypes.towSamsungFlow}`]: {
			steps: [
				'EXAMPLE_ROUTE_Xiaomi_SAMSUNG_A',
				StepTypes.DEVICE_GALLERY.name,
				StepTypes.CHECKOUT.name,
				'EXAMPLE_ROUTE_Xiaomi_SAMSUNG_B'
			]
		},
		[SubFlowTypes.towXiaomiFlow]: {
			steps: [
				'EXAMPLE_ROUTE_Xiaomi_A',
				'EXAMPLE_ROUTE_Xiaomi_B',
				StepTypes.DEVICE_GALLERY.name,
				StepTypes.CHECKOUT_XIAOMI.name,
				'EXAMPLE_ROUTE_Xiaomi_C'
			]
		},
		[SubFlowTypes.towSamsungFlow]: {
			steps: [
				StepTypes.DEVICE_GALLERY.name,
				StepTypes.CHECKOUT_SAMSUNG.name,
				'EXAMPLE_ROUTE_SAMSUNG_C'
			]
		},
		[SubFlowTypes.onlyDeviceFlow]: {
			steps: [
				StepTypes.DEVICE_GALLERY.name,
				StepTypes.CHECKOUT.name
			]
		}
	}
};
