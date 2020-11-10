import RoutesPath from 'routes/RoutesPath';

export enum FlowTypes {
	COP = 'COP',
	CHQ = 'CHQ'
}

export enum SubFlowTypes {
	onlyRunInCHQExqmple = 'onlyRunInCHQExqmple',
	onlyDeviceFlow = 'onlyDeviceFlow',
	towXiaomiFlow = 'towXiaomiFlow',
	towSamsungFlow = 'towSamsungFlow'
}

export const StepTypes = {
	DEVICE_GALLERY: {
		name: 'DEVICE_GALLERY',
		path: RoutesPath.ROOT,
	},
	CHECKOUT: {
		name: 'CHECKOUT',
		path: RoutesPath.CHECKOUT
	},
	CHECKOUT_SAMSUNG: {
		name: 'CHECKOUT_SAMSUNG',
		path: RoutesPath.CHECKOUT_SAMSUNG
	},
	CHECKOUT_XIAOMI: {
		name: 'CHECKOUT_XIAOMI',
		path: RoutesPath.CHECKOUT_XIAOMI
	}
};
