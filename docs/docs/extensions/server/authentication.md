#Authentication

## Introduction


We created a predefined authentication mechanism for your convenience.

- POST    /users                   ->  create <br/>
- GET     /users/me                ->  me		<br/>
- DELETE  /users/me/logout         ->  logout	<br/>
- POST    /users/login             ->  login	<br/>
- POST    /users/broadcastAction   ->  broadcastAction <br/>
	 
	
	 
	 
!!! warning "Configuration"
	when you are changing the config to work with MySQL, `useSql` flag in Configuration
	your authentication will work with your SQL db instance.
	@see `server/src/api/authentication/users-sequelize`

```js
const {Router} = require('express');

const controller = require('./user.controller');
const {authenticate} = require('./../../../middleware/authenticate');

var router = new Router();

/**
 * @api {post} authentication/users/ Create User
 * @apiName CreateUserToken
 * @apiGroup User
 *
 * @apiParam {String} email .
 * @apiParam {String} password .
 *
 * @apiSuccess {Object} - set header x-auth with generated token.
 */
router.post('/', controller.create);
/**
 * @api {get} /authentication/users/me Get User
 * @apiName GetUser
 * @apiGroup User
 *
 * @apiSuccess {Object} - get current user.
 */
router.get('/me', authenticate, controller.me);
/**
 * @api {delete} /authentication/users/me/token Logout
 * @apiName LogoutUser
 * @apiGroup User
 *
 * @apiSuccess {Object} - status 200.
 */
router.delete('/me/token', authenticate, controller.logout);
/**
 * @api {post} /authentication/users/login Login
 * @apiName LoginUser
 * @apiGroup User
 
 * @apiParam {String} email .
 * @apiParam {String} password .
 
 * @apiSuccess {Object} - set header x-auth with generated token.
 */
router.post('/login', controller.login);
/**
 * @api {post} /authentication/users/broadcastAction Broadcast Action
 * @apiName BroadcastAction
 * @apiGroup User

 * @apiParam {Object} action with type and payload.

 * @apiSuccess {Object} - broadcast to thethe action to all.
 */
router.post('/broadcastAction', controller.broadcastAction);



module.exports = router;

```


## Authenticate Your API

!!! tip "Middleware"
	You can use our `authenticate` middleware to your API by importing it from `middleware` folder.

	The middleware contain a function that deal with the current `Model` according to your configuration ( Sequelize \ Mongoose )<br/>

```js
const User = require('./../api/authentication/users-mongo/user-model');

var authenticate = (req, res, next) => {
    let token = req.header('Authorization');
    User.findByToken(token).then((user) => {
        
		if(!user) {
			return new Promise((resolve, reject) => {
				reject();
			});
		}

		req.user = user;
		req.token = token;
		next();

	}).catch((e) => {
        console.log(e);
		res.status(401).send();
		
	});
};

module.exports = {authenticate}
```
## Usage

```js

const {Router} = require('express');
const {authenticate} = require('./../../middleware/authenticate');

const controller = require('./posts.controller');

var router = new Router();

/**
 * @api {post} /posts Create Post
 * @apiName CreatePosts
 * @apiGroup Posts
 *
 * @apiParam {String} name .
 *
 * @apiSuccess {Object} - contain message and resource id.
 */
router.post('/', authenticate,controller.create);


```

