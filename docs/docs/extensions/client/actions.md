

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
import { AxiosResponse } from 'axios';
import { call, put } from 'redux-saga/effects';
import api from 'requests';
import { CatalogActions } from 'actions/catalog';
import { MySagaAction, ResponseExample } from 'actions/catalog/interface';

export function* mySaga(action: MySagaAction) {
	const { someData } = action;
	const response: AxiosResponse<ResponseExample> = yield call(api.someApi, someData);

	yield put(CatalogActions.setExample(response.data.name));
}
```

## `redux.ts`

```JS
import Immutable, { ImmutableObject } from 'seamless-immutable';
import { createReducer, createActions } from 'reduxsauce';
import { ApplicationState } from 'actions';
import {
	CatalogState, TypesNames, ActionCreator, SetExampleAction
} from './interface';

// TODO: Do not for get add your reducer to index file

/* ------------- Types and Action Creators ------------- */

const { Creators } = createActions<TypesNames, ActionCreator>({
	mySaga: ['someData'], // handle by saga
	setExample: ['exampleData']
});

export const CatalogTypes = TypesNames;
export const CatalogActions = Creators;

/* ------------- Initial State ------------- */

const INITIAL_STATE = Immutable<CatalogState>({
	exampleData: 'Initial Data Example'
});

/* ------------- Selectors ------------- */

export const catalogSelector = {
	getExampleData: (state: ApplicationState) => state.catalog?.exampleData
};

/* ------------- Reducers ------------- */

const setExampleReducer = (state: ImmutableObject<CatalogState>, action: SetExampleAction) => {
	const { exampleData } = action;
	return state.merge({ exampleData });
};

/* ------------- Hookup Reducers To Types ------------- */

export const reducer = createReducer<any, any>(INITIAL_STATE, {
	[CatalogTypes.SET_EXAMPLE]: setExampleReducer
});
```

## `index.ts`

```JS
import { all, fork, takeLatest } from 'redux-saga/effects';
import * as Sagas from './sagas';
import { CatalogTypes } from 'actions/catalog/redux';

/* ------------- Export Redux ------------- */
export * from 'actions/catalog/redux';

/* ------------- Export Sagas ------------- */
function* watchMySaga() {
	yield takeLatest(CatalogTypes.MY_SAGA, Sagas.mySaga);
}

// TODO: Do Not Forget to Add your new saga to index file
export function* catalogSaga() {
	yield all([
		fork(watchMySaga)
	]);
}
```

## `interface.ts`

```TYPESCRIPT
import { Action } from 'redux';

/* ------------- Define Actions and State ------------- */
export interface CatalogState {
	exampleData: string;
}

export enum TypesNames {
	SET_EXAMPLE = 'SET_EXAMPLE',
	MY_SAGA = 'MY_SAGA'
}

declare function SetExampleFunction(exampleData: string): SetExampleAction;
declare function MySagaFunction(someData: string): MySagaAction;

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
