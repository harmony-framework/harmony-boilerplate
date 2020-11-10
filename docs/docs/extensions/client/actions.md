

# Actions

<b>Location</b>: `client/actions`

Actions are the place to create the calls to api or just change some state.
In the following files you declare about the actions types and export them.

Create Actions files for each container is the best practice.

Declare `actions types` under `( actions/index.js )`.

``` JS
var UPDATE_MYSTATE = exports.UPDATE_MYSTATE = 'UPDATE_MYSTATE';
```

!!! warning "Actions type declaration "

    actions type declaration - Declaration for actions type must to be with es5.<br/>
    The reason is that the action types is shared with server for websocket actions system.

Declare `actions types` under `( /actions_myActions.js )`.

``` JS
export function updateSomeState (newData) {
    return {
        type: UPDATE_MYSTATE,
        payload: newData
    };
}
```

!!! tip "Actions file names"
    cli automatically add your actions file to /actions/myActionsName/.<br/>
    It added 1 file called actions_myActionsName. actions_ prefix added automatically

## Create Actions files by cli

``` JS
$ gulp createActionFile --name myActionsName
```

## Create Actions files manually

``` md
1) Go to `actions/` folder and add your own folder with given name (lowercase first).
2) Add new js file `actions_myActionsName.js`.
3) Go to `actions/index.js` and export there the action type.
```