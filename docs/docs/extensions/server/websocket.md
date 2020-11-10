# Websocket

We created two methods inside the websocket server that you can use.
```js
const wss = new WebSocket.Server({ port: config.websocket.port });

wss.broadcastAction = function(request){

    try {
        var result = _.find(config.allowedActions, function (o) {
            return o === request.action.type
        });

        if (!result) {
            return;
        }
        wss.broadcast({
            "WS_ACTION": true,
            "token": request.token || null,
            "action": request.action
        });
    }
    catch (e) {
        console.log(e);
    }

};

wss.broadcast = function broadcast(data) {

  wss.clients.forEach(function each(client) {
      
    if (client.readyState === WebSocket.OPEN) {
      client.send(JSON.stringify(data));
    }
  });
};
```
## Websocket Actions

!!! warning "**SECURE WARNING** - You must to declare your `allowed actions` in server config."
	If the action is not allowed on the server, the action will not be executed !

- To add allowed actions for broadcasting go to [config](#config) and edit allowedActions 
```
 allowedActions: [
        actions.FETCH_POSTS,
        ...
    ]
```
there is reference in the configuration file to the client actions.
```
const actions = require('../../client/src/actions');
```
harmony let the client to invoke actions on each client on the system by using the websocket instance on the server.
for example: lets say User A delete item from the database and want that all the users will FETCH the items again.

by invoking the following API - ``` POST    /users/broadcastAction   ->  broadcastAction ```
with the this payload : 
```
{type: ActionTypes.FETCH_POSTS, payload: null}
```
the websocket instance will broadcast to all users this action.
In addition, there is option to invoke the broadcasting service from each API.

## Websocket 
You can use the websocket service to pass messages between the clients or from server to clients by invoking:
```js
exports.create = function(req, res) {
    let ModelInstance = new MODEL_SERVICE();
    ...
    req.app.get('wss').broadcast(YOUR_MESSAGE);

```


!!! tip "For more information check how you deal with the websocket from the client side"
