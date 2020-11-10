

# Generate Reducer

<b>Location</b>: `src/actions/redux/`

Reducer is the place to manipulate your states `( redux/ )`.
We use `immutableJS` to do that. This library have a crazy performance for change objects.
I recommended you to learn how it work even if you are not going to use it.

`src/actions/redux/index.ts` - Here we combine our reducer to redux.

Also this structure are better one to maintain then the "switch case" reducers.
We are using with reduxsauce.
Please read more here: https://www.npmjs.com/package/reduxsauce

## Create Reducer by cli

``` sh
$ gulp createRedux --name myReducer
```


## Example Code index.ts

``` JS
import Immutable from 'seamless-immutable';
import { createReducer, createActions } from 'reduxsauce';
import { IApplicationState } from '../index';
import { TypesNames, IActionCreator, ICatalogState, ISetDeviceListAction } from './interfaces';

/* ------------- Types and Action Creators ------------- */

const { Creators } = createActions<TypesNames, IActionCreator>({
    getDeviceList: [],
    setDeviceList: ['deviceList']
});

export const CatalogTypes = TypesNames;
export default Creators;

/* ------------- Initial State ------------- */

const INITIAL_STATE = Immutable<ICatalogState>({
    deviceList: []
});

/* ------------- Selectors ------------- */

export const catalogSelector = {
    devices: (state: IApplicationState) => state.catalog.deviceList
};

/* ------------- Reducers ------------- */

const setDeviceListReducer = (state: any, action: ISetDeviceListAction) => {
    const { deviceList } = action;
    return state.merge({ deviceList });
};

/* ------------- Hookup Reducers To Types ------------- */

export const reducer = createReducer(INITIAL_STATE, {
    [CatalogTypes.SET_DEVICE_LIST]: setDeviceListReducer
});

```