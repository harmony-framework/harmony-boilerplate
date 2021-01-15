

## Generate Action

<b>Location</b>: `client/actions/`


Actions are the place to coding `sagas` and `reduxsuaces`.<br/>

## Files Created

The Generator of Action will the following files:
<br />

* `index.ts` - this export all reducers, selectors, and sagas. and also create all the watchers.
* `sagas.ts` - here all the sagas functions.
* `redux.ts` - here all the reducers/selectors functions.
* `interface.ts` - here all the interfaces define.
* `manager.ts` - utils functions to help mapping, configurations etc ... that needed for sagas and reducers.


## Create Action by cli

```
$ gulp createAction --name myAction
```

## `sagas.ts`

```JS
import { createDraft, Draft } from 'immer';
import { createReducerCase } from '@base/features/base-decorator';
import { createReducer, createActions } from 'reduxsauce';
import { ApplicationState } from 'actions';
import {
	TodoState, TypesNames, ActionCreator, SetExampleAction
} from './interface';

/* ------------- Types and Action Creators ------------- */

const { Creators } = createActions<TypesNames, ActionCreator>({
	mySaga: ['someData'], // handle by saga
	setExample: ['exampleData']
});

export const TodoTypes = TypesNames;
export const TodoActions = Creators;

/* ------------- Initial State ------------- */

const INITIAL_STATE = createDraft<TodoState>({
	exampleData: 'Initial Data Example'
});

/* ------------- Selectors ------------- */

export const todoSelector = {
	getExampleData: (state: ApplicationState) => state.todo?.exampleData
};

/* ------------- Reducers ------------- */

const setExampleReducer = (draft: Draft<TodoState>, action: SetExampleAction) => {
	const { exampleData } = action;
	draft.exampleData = exampleData;
};

/* ------------- Hookup Reducers To Types ------------- */

export const reducer = createReducer<any, any>(INITIAL_STATE, {
	[TypesNames.SET_EXAMPLE]: createReducerCase(setExampleReducer)
});
```

## `index.ts`

```JS
import { all, fork, takeLatest } from 'redux-saga/effects';
import { createSaga } from '@base/features/base-decorator';
import * as Sagas from 'actions/todo/sagas';
import { TodoTypes } from 'actions/todo';

/* ------------- Export Redux ------------- */
export * from 'actions/todo/redux';

/* ------------- Export Sagas ------------- */
function* watchMySaga() {
	yield takeLatest(TodoTypes.MY_SAGA, createSaga(Sagas.mySaga));
}

export function* todoSaga() {
	yield all([
		fork(watchMySaga)
	]);
}

```

## `interface.ts`

```TYPESCRIPT
import { Action } from 'redux';

/* ------------- Define Actions and State ------------- */
export interface TodoState {
	exampleData: string;
}

export enum TypesNames {
	SET_EXAMPLE = 'SET_EXAMPLE',
	MY_SAGA = 'MY_SAGA'
}

export declare function SetExampleFunction(exampleData: string): SetExampleAction;
export declare function MySagaFunction(someData: string): MySagaAction;

export interface ActionCreator {
	setExample: typeof SetExampleFunction;
	mySaga: typeof MySagaFunction;
}

export interface SetExampleAction extends Action<TypesNames.SET_EXAMPLE> {
	exampleData: string;
}

export interface MySagaAction extends Action<TypesNames.MY_SAGA> {
	someData: string;
}

/* ------------- Define Any Interfaces ------------- */
export interface ResponseExample {
	name: string;
}
```

## `manager.ts`

```JS 
// Here you right all the "sdk" ( managers, utils etc .. )
// actually here is a function that are not saga and should return simple values without dispatch
// for example function that get a and b and return a + b
```

!!! tip "Redux Sagas"

    For more information, read on https://github.com/redux-saga/redux-saga <br/>
    What is takeLatest?
    ```JS
    (alias) takeLatest<any, any>(pattern: Pattern<any>, worker: HelperFunc1<any, any>, arg1: any): ForkEffect (+5 overloads)
    import takeLatest
    ```
    
    Alternatively you may use takeLatest.

    Does not allow concurrent fetches of user. If "SOME_ACTION" gets
    dispatched while a fetch is already pending, that pending fetch is cancelled
    and only the latest one will be run.
