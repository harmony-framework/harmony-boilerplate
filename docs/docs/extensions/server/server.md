# Server

## Based Technologies

- <a href="https://github.com/expressjs/express" target="_blank">Express</a>
- <a href="https://github.com/apidoc/apidoc" target="_blank">APIDoc</a>
- <a href="http://mongoosejs.com/" target="_blank">Mongoose</a>
- <a href="http://docs.sequelizejs.com/en/v3/" target="_blank">Sequelize</a>

  
  
## Server Folder Structure

    .
    ├── server    
    |     ├── docs
    |     ├── src       
    |           ├── api
	|               ├── authentication
    |               ├── global
	|               	├── responses
	|               ├── posts
	|           		├── model
	|           		├── responses
	|           		├── index.js
	|           		├── posts.controller.js
	|           ├── middleware
    |               ├── authenticate.js
    |               ├── authenticate-sequelize.js
    |           ├── config.js
    |     ├── apidoc.json  
    |     ├── server.js 