

# Requests & Websocket

## Requests
 
<b>Location</b>: `client/base/api/requests.js` 

API Requests is one of the features coming from Harmony.<br/>

Requests class include the following methods:

### call

Call to API

<b>Parameters:</b>

config - axios config json.

<b>Usage</b>

import from `src/base/base-api/index.ts`
``` JS
request.call({
    method: 'post',
    baseURL: baseURL,
    url: 'users/login',
    data: data
});
```

### broadcastAction

Invoke action via websocket to every online client.

<b>Parameters:</b>

action - Action that you want to execute.

<b>Usage</b>

import from `client/base/api/requests.js`
``` JS
import {UserTypes} from '../redux/user';
requests.broadcastAction({type: UserTypes.FETCH_POSTS, payload: null});
```

!!! warning "Secured Actions"

    Harmony know about the risk to dispatch actions via client to aonther clients. <br/>
    Therefore, if you want to disptach action with websocket actions, you need to allow the action in server.</br>
    Read more about websocket in server docomentation.
    
!!! tip "Start Websocket Action"
    
    in ```client/indexjs``` you can find the starter to websocket action.<br/>
    ``` JS
    const wsAction = new WSAction(store, config.ROOT_WS_URL, {
        retryCount:3,
        reconnectInterval: 3
    });
    wsAction.start();
    ```
    this start to listien to incomings actions from aonther clients.
    


## Requests Definitions File

<b>Location</b>: `client/requests/index.js`

In requests file we define all the requests calls and use it in sagas.
Harmony prefer to use one file to export requests definitions for Best Practice.

### Example Code

``` JS
createUser: (data) => {
    return request.call({
        method: 'post',
        baseURL: baseURL,
        url: '/users',
        data: data
    });
}
```

## API Call Options

In api call you can send in options some props to define error handler manually:
```typescript
    export interface CallOptions {
        unauthorized?: boolean; // true - will not send autorization token in the header for that API
        ignoreErrorHandler?: boolean; // ignore erorr handler for that API
        generalErrorInfo?: { errorCode: string; status: number }; // for this API, for ANY failed, return this error code and status
    }
```

<br />

Usage Example:

```typescript
	getDevices: () => request.call({
		baseURL: 'http://6ew7g.mocklab.io/' || baseURL,
		method: 'get',
		url: '/getlatestWithCustomResponseCode'
	}, { unauthorized: true, generalErrorInfo: { errorCode: 'getDevicesFiledForSomeReason', status: 500 } })
```
