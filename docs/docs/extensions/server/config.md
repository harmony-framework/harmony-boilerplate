# Config

Server configuration located on `server/src/config.js`

``` js
const config = {
    sql : {
        db:'seq',
        user:'root',
        pass:''
    },
    mongo: {
        dbUrl:  process.env.MONGO_URL || 'mongodb://127.0.0.1:27017/db'
    },
    useMongo:true,
    useSql: false,
    JWT_SECRET:"YOUR_SMASHING_JWT_SECRET",
	server:{
      port: process.env.PORT || 8080
    },
	websocket:{
		port: process.env.WS_PORT || 3030
	},

    allowedActions: [
        actions.FETCH_POSTS
    ]


};

```

1. You can choose whether to use Relational DB or Non Relational such as MongoDB, change `useMongo` \ `useSql` according to your decisions.
2. `JWT_SECRET` used for Authorization Token generation.
3. `websocket` contain your websocket server configuration, we are using it for broadcasting actions on client side. amazing no?
4. `allowedActions` comes with the websocket, its contain what are the actions that the websocket is allowed to broadcast to the client.
