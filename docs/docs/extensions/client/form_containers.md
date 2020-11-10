

# Generate Form Containers

Form Container is similar to regular container. The only one different is that Form Container is connected with `connectWithReduxForm`.<br/>
Form Container give you the control to display validations, error, warnings, clear form etc... with easy way.<br/>
It work with Core Components.<br/>

## Create Form Container by cli

``` sh
$ gulp createFormContainer --className myClassName
```

## Example Code

```JS
import * as React from 'react';
import { baseConnectForm } from '@base/features/base-redux-react-connect';
import { InjectedFormProps, Form } from 'redux-form';
import { IApplicationState } from 'actions/redux';
// import MyFormContainerActions, { myFormContainerSelector } from 'actions/redux/myFormContainer';

interface IProps extends InjectedFormProps {

}

class MyFormContainer extends React.Component<IProps> {
    render() {

        return (
            <Form onSubmit={this.props.handleSubmit(this.handleSubmit.bind(this))} >

            </Form>
        );

    }

    handleSubmit(props: IProps) {
        // handle submit here
    }

    validate(values: any) {
        const errors = {};

        /* EXAMPLE CODE
        if (!values.title) {
            errors.title = 'someTitle';
        }
        */

        return errors;
    }
}


export default baseConnectForm(MyFormContainer,
    (state: IApplicationState) => {
        return {

        }
    },
    {

    },
    {
        form : 'MyFormContainerForm',
        fields: []
    }
);
```