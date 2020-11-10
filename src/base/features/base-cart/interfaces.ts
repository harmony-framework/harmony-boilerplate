import { Reducer } from 'redux';

export interface BaseCartState<T> {
	items: T[];
}

export interface Instance {
	actionTypes: any;
	reducer: Reducer;
	actions: Actions;
}

export interface Actions {
	add: (id: number | string, payload: any) => any;
	remove: (id: number | string) => any;
	update: (id: number | string, payload: any) => any;
	clear: () => any;
}
