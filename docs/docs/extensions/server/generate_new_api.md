# Generate New API

A proper API consist the following:

- Model ( Using Mongoose )
- Controller ( Holding the main functions like create, update, delete, get, etc..)
- Responses ( JS file that contain responses relate to the current API )
- routes ( Mapping the routes to the Controller )

### Creating API 

Inorder to create your API, We suggest to use our CLI script<br/>

``` gulp createApi --name "YOUR_API_NAME" ```

Note - 
If you are going to use MySQL \ SQL \ PostgreSQL \ MSSQL you should add this:
` --apiType sql ` 
otherwise it will use mongodb

It will generate under `server/src/api` folder with the files of your api :

## Usage 

``` gulp createApi --name post ```

## Result 
    .
    ├── post         
    |     ├── post.controller.js                    
    |     ├── index.js   
    |     ├── model   
    |           ├── post.js 
    |     ├── responses
    |           ├── index.js   

## Templating 

If you want to create your own templates you will need to add the template file under `generator/templates/server`
and under `createApi` task in the `gulpfile.js` on the root folder do the following :

``` JS
gulp.task('createApi', () => {
    let apiName = getArg('name');
    if(!validateName(apiName, '--name', false)) return;
    var UPPERCASE_MODEL_NAME = apiName.toString().toUpperCase();
    var CapitalLetterModelName = capitalize(apiName);
    createTemplate(
        './generator/templates/server/api-controller-template',
        'server/src/api/'+apiName+'/'+apiName+'.controller.js',
        {
         name: apiName,
         upperCaseModelName : UPPERCASE_MODEL_NAME,
         capitalLetterModelName: CapitalLetterModelName
        }
    );
    
    createTemplate(
        './generator/templates/server/model-template',
        'server/src/api/'+apiName+'/model/'+apiName+'.js',
        {
            capitalLetterModelName: CapitalLetterModelName
        }
    );
    
    createTemplate(
        './generator/templates/server/responses-template',
        'server/src/api/'+apiName+'/responses/index.js',
        {
         capitalLetterModelName: CapitalLetterModelName,
         upperCaseModelName : UPPERCASE_MODEL_NAME
        }
    );
    
    createTemplate(
        './generator/templates/server/index-template',
        'server/src/api/'+apiName+'/index.js',
        {
         name: apiName,
         capitalLetterModelName: CapitalLetterModelName
        }
    );
    
    /***** YOUR ADDITIONS *****/
    createTemplate(
        './generator/templates/server/YOUR_TEMPLATE_FILE_NAME',
        'server/src/api/'+apiName+'/DESTINATION_FILE_NAME',
        {
         name: apiName,
         capitalLetterModelName: CapitalLetterModelName
        }
    );
    
    replaceText(
        './server/src/routes/index.js',
        './server/src/routes/',
        "// LASTLINE",
        "app.use('/"+apiName+"', require('../api/"+apiName+"'));\r\n// LASTLINE"
    );
    
});
```