

# Error Handler

## Error Handler Concept
 
Harmony support with Error Handler mechanism to easy maintain your api errors easy and fast with by  maintaining one configuration.

Under configuration folder you can find `error.config.json` file.
 
<b>Location</b>: `src/configurations/error.config.json`

The Concept of the error handler is to catch API error and handle it just by configuration.
For example: when get devices api failed go to error page, or when submit order failed, display a popup with a message.

The idea is to catch those error and decied what to do via just configuration file.
Each time a API failed, the API will return some status code + error code from the API.
`<errorCode>_<statusCode>` - Will be the key in the config file, and the value will be "how we want to handle the error".

## Usage

Let's look first how this config look like with the example<br/>

```json
{
  "pathToErrorCode": "data.errorCode",
  "handlers": {
    "devicesListFailed_400": {
      "component": "modal",
      "payload": {
        "header": "Error",
        "body": "Error with Fetch Device List"
      }
    },
    "devicesListFailed_206": {
      "level": "component",
      "component": "notification",
      "payload": {
        "type": "danger",
        "header": "deviceGallery.specificErrorHandlerToComponentHeader",
        "body": "deviceGallery.specificErrorHandlerToComponentBody"
      }
    },
    "devicesListFailed_500": {
      "component": "ignore"
    }
  }
}
```

`pathToErrorCode` - the path to the error code from the response.<br /><br />
`handlers` - here we define our handlers `<errorCode>_<statusCode>`.<br /><br />
`level <optional>` - when set level to `component` then the error will be display only for specific component that handle it with `withErrorHandler`<br /><br />
`component` - the component type to render inc case of this error.<br /><br />
`payload` - any payload data that can be use for the render component.<br /><br />
`ignore` - ignore component will ignore the error handler for that failure and error handler will do nothing for this error.<br /><br />

if we look at the example, when we get error code `devicesListFailed` and status code `400` we will display modal component.
The payload can be anything that we want to send to that component as props.

## `@withErrorHandler`

In some cases when api failed, you want to display error only on specific component on the screen, and not some global component such modal etc ..
For that case, you can use the decorator `@withErrorHandler`.

`@withErrorHandler` get the following config:

- `errorCodes` - array of error codes from the error handler configuration file
- `asComponent <optional>` - by default set to false. if set to true, the decorator will not replace the component by default with error component, but
it will inject for you to the props `ErrorComponent`, and you can decide by your self where to render this component.

`Injected Props` - to component that use this decorator, will get injected props:

- `ErrorComponent` - a Component that can be render in your decorated component.
- `errorHandled` - a function that once called he clear the error and not send `ErrorComponent` to props anymore.


!!! warning "Configuration"
    In error handle configuration file you must to define this error code with `"level": "component"` 


you can see here example how to use it:

```typescript
import withErrorHandler from 'containers/ErrorHandler/withErrorHandler';

@withErrorHandler({
	errorCodes: ['devicesListFailed_206'],
	asComponent: true // if set to false, all the component will be replaced with ErrorComponent by default
})
class DeviceGallery extends React.Component<Props, State> {
	constructor(props: Props) {
		super(props);

		this.state = {
			searchValue: ''
		};
	}

    .....
}
```

## Customization

<b>Location for Global Error Handler</b>: `src/containers/ErrorHandler/index.tsx`
<b>Location for with error handler decorator</b>: `src/containers/ErrorHandler/withErrorHandler.tsx`

In this location you can found the Error Handler "Decider".
Each time error occurred this component will be invoke the render and will go inside a switch case.
The switch case decide which component to render and what to do for each error component.

So here you can easily do what ever you like and customize the modal and even add your own components for handler.

## Strict Client Console Errors

Harmony keep to be strict with best practices and clean console from errors. <br />
Therefor by default we drop developer to error page and notify with toaster for any console error. <br /><br/>

To turn off this functionality go to main `src/config.ts` file and set `STRICT_CONSOLE_ERROR` to `false`
