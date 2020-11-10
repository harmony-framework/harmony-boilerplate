

# Generate Core Components

<b>Location</b>: `client/components/`

Core Components Include your custom basic components that serve your application.

For example: myInput, myTextarea, myH1 etc.. Those components created by you and most the time wrap the basic html5 elements with your design and additional elements.

Any core component is wrap with createField.
createField convert your component to `Filed` from redux-form, this useful when you use your components inside Form Container.

If you use createField your component be able to get the follwoing data: <br/>
`meta: { touched, error, warning }, input` <br/>
This data provide you the information that send from Form Container and can serve you for validations and more...

!!! tip "Core Component Name"

     CLI automatically inject Cor_ prefix to your core component. this best practice to use prefix name to core components to recognize them inside containers.


## Create Core Component by cli

``` sh
$ gulp createCoreComponent --name MyCoreComponent
```

## Create Core Component manually

``` md
    1) Add new folder with the component name to `( components/core/ )`.
    2) Create `index.js` file. this is the place to write your component code.
    3) Export your component path inside `( Components/core/index.js )`. add `Cor_` prefix to the component name.
    4) Now you can import the component from core: `import { Input } from '../../components/core';`
```


## Example Code

``` JS
import PropTypes from 'prop-types';
import { createField } from '../../../base/features/harmony-redux-form-field';

const component = ({ meta: { touched, error, warning, invalid }, input, label, T }) => {

    return (
        <div className={`form-group ${touched && invalid ? 'has-danger': ''}`}>
            <label>{label}</label>
            <div>
                <textarea {...input} placeholder={label} className="form-control"/>
                <div style={{color:'#d9534f'}}>{touched && T(error)}</div>
            </div>
        </div>
    );

};

export default createField(component, {
    label: PropTypes.string.isRequired,
    T: PropTypes.func.isRequired
});
```