

## Generate Sagas

<b>Location</b>: `client/sagas/`


Sagas is middleware between the Action and the Reducer when action need API call.<br/>
In our project we apply the sagas middleware only with 1 root index file.<br/>
`src/actions/sagas/index.ts` is the root to all the sagas you write and inside the `sagas/` folder you add all the folders that<br/>

## Files Created

The Generator of Saga will create 3 files:
<br />

* `index.ts` - to watch and export all sagas.
* `sagas.ts` - here all the sagas functions.
* `manager.ts` - Function that are not sagas ( as utils etc ..).


## Create Saga by cli

```
$ gulp createSaga --name mySaga
```

## Example Code `index.ts`

```JS

function* watchGetDevices() {
    yield takeLatest(CatalogTypes.GET_DEVICE_LIST, getDevices);
}

function* catalogSaga() {
    yield all([
        fork(watchGetDevices)
    ]);
}

export default catalogSaga;
```

## Example Code `sagas.ts`

```JS
import {all, call, fork, put, takeLatest} from 'redux-saga/effects';
import {AxiosResponse} from 'axios';
import api from 'requests';
import CatalogActions, { CatalogTypes } from 'actions/redux/catalog';
import { IDevice } from 'actions/redux/catalog/interfaces';

function* getDevices() {
    try {
        const response: AxiosResponse<IDevice[]> = yield call(api.getDevices);

        yield put(CatalogActions.setDeviceList(response.data));
    } catch (e) {
        console.log(e);
    }

}
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
