import * as React from 'react';
import { withToastManager, ToastConsumerContext } from 'react-toast-notifications';

export interface ToasterManager {
	toastManager: ToastConsumerContext;
}

export function withToast(Component: React.ComponentType) {
	return withToastManager(Component);
}
