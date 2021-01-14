

# Error Handler

## Error Handler Concept
 
Harmony support with Error Handler mechanism to easy maintain you XHR ( api calls ) errors easy and fast with only configuration.

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
    "devicesListFailed_500": {
      "component": "ignore"
    }
  }
}
```

`pathToErrorCode` - the path to the error code from the response.<br /><br />
`handlers` - here we define our handlers `<errorCode>_<statusCode>`.<br /><br />
`component` - the component type to render inc case of this error.<br /><br />
`payload` - any payload data that can be use for the render component.<br /><br />
`ignore` - ignore component will ignore the error handler for that failure and error handler will do nothing for this error.<br /><br />

if we look at the example, when we get error code `devicesListFailed` and status code `400` we will display modal component.
The payload can be anything that we want to send to that component as props.

## Customization

<b>Location</b>: `src/containers/ErrorHandler/index.tsx`

In this location you can found the Error Handler "Decider".
Each time error occurred this component will be invoke the render and will go inside a switch case.
The switch case decide which component to render and what to do for each error component.

So here you can easily do what ever you like and customize the modal and even add your own components for handler.

```JS
import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { Modal, Button  } from 'react-bootstrap';
import { baseConnect } from '@base/features/base-redux-react-connect';
import { clearErrorHandler, IErrorHandlerRequest, BaseComponentTypes } from '@base/features/base-error-handler';
import { IApplicationState } from 'actions';
import RoutesPath from 'routes/RoutesPath';

interface IProps {
    errorHandler: IErrorHandlerRequest<any>;
    history: any;
}

/***** Define Possibles Component Types *****/
export enum ComponentTypes {
    MODAL = 'modal'
}

class ErrorHandler extends React.Component<IProps> {
     readonly appElement: HTMLElement | null;

    constructor(props: IProps) {
        super(props);

        this.appElement = document.getElementById('app');
    }

    componentDidUpdate() {
        const { errorHandler, history } = this.props;
        const { component } = errorHandler || {};

        // Base Error Handler set component to errorPage automatically in case the error was not handled in the config file
        if (component === BaseComponentTypes.ERROR_PAGE) {
            clearErrorHandler();
            history.push(RoutesPath.ERROR_PAGE);
        }
    }

    render() {
        const { errorHandler } = this.props;
        const { component, payload } = errorHandler;

        if (!Object.keys(errorHandler).length || component === BaseComponentTypes.IGNORE) return null;

        /***** Render th Corresponding Component According to Component value *****/
        switch (component.toLowerCase()) {
            case ComponentTypes.MODAL: {
                /***** Here you can return your modal for display with any props you sent in payload *****/
                return ReactDOM.createPortal(
                    this.renderModal(payload),
                    this.appElement as Element
                );
            }
            default: {
                return null;
            }
        }
    }

    renderModal(payload: any) {
        return (
            <Modal.Dialog>
                <Modal.Header closeButton onClick={() => { clearErrorHandler(); }}>
                    <Modal.Title>{payload.header}</Modal.Title>
                </Modal.Header>

                <Modal.Body>
                    <p>{payload.body}</p>
                </Modal.Body>

                <Modal.Footer>
                    <Button variant="primary" onClick={() => { clearErrorHandler(); }}>Close</Button>
                </Modal.Footer>
            </Modal.Dialog>
        );
    }
}

export default baseConnect(ErrorHandler,
    (state: IApplicationState) => {
        return {
            errorHandler: state.errorHandler
        };
    },
    {

    }
);
```
