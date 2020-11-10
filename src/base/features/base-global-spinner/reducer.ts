export enum TypesNames {
	XHR_TASK_BEGIN = 'XHR_TASK_BEGIN',
	XHR_TASK_END = 'XHR_TASK_END'
}

export interface Pending {
	uuid: string;
	url: string;
	appId: string;
	subAppId: string;
}

export type PendingTasks = Array<Pending>;

export interface GlobalSpinnerState {
	pendingTasks: PendingTasks;
}

const initialState = {
	pendingTasks: []
};

export default (state = initialState, action: any) => {
	const newState = { ...state };

	switch (action.type) {
		case TypesNames.XHR_TASK_BEGIN:
			newState.pendingTasks = newState.pendingTasks.concat(action?.payload);

			return newState;
		case TypesNames.XHR_TASK_END:
			if (action?.payload?.uuid) {
				newState.pendingTasks = newState.pendingTasks.filter((item: Pending) => item.uuid !== action.payload.uuid);
			}
			return newState;
		default:
			return state;
	}
};
