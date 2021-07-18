import { TypesNames } from './reducer';
import Store from '@base/features/base-store';
import { BaseApplicationState } from '@base/features/base-reducers';

export interface FilterState {
	[key: string]: any;
}

export const filterDataDispatcher = (name: string, payload: any) => {
	Store.dispatch({
		type: TypesNames.UPDATE_FILTER_DATA,
		payload,
		name
	});
};

export const filterDataSelector = (name: string) => (state: BaseApplicationState) => {
	return state.filters[name];
};

export * from './reducer';
export { default as withFilter } from '@base/features/base-decorator/withFilter';
