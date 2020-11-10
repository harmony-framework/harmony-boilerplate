

# Global Spinner

## Global Spinner Concept
 
While we perform Api calls, most of the time we want the page show indication that page load, this is why we need loader.
The global Spinner feather in harmony do it easly and automatic without any effort.

Any time there is "pending" request in the network, global spinner will be display.
That mean in redux speak - any time we have network task, we will have value greater then 1 in store under `pendingTask` slice.
But, what about api calls that we dont want to display global spinner and block the screen ?
how we can customize the spinner ?

Let's see ...

## Ignore List

<b>Location</b> - `src/configurations/spinner.config.json`

In that file you can add any regex value to be ignore.
any URI on that list will be ignore by the Global Spinner.

```json
{
  "ignoreList": [
    "http://.*:5555/devices"
  ]
}
```

## Customization

<b>Location</b> - `src/routes/App.tsx`

In that file we are using standard Spinner Component.
You can replace it with any Spinner do you like and decied display it or not display it by the `pendingTask` value is greater then 1.

```js
import * as React from 'react';
import 'react-redux-spinner/dist/react-redux-spinner.css';
import { baseConnect } from '@base/features/base-redux-react-connect';
import { Spinner } from 'react-redux-spinner'; // Can be Replace with your Custom Spinner
import Localization from 'containers/Localization';
import ErrorHandler from 'containers/ErrorHandler';

interface IProps {
    children: any
}

class App extends React.Component<IProps> {
    render() {
		return (
			<>
                <ErrorHandler />
                <Spinner config={{}} />
				<Localization />
				{this.props.children}
			</>
		);
	}
}

export default baseConnect(App,
    (/* state */) => {
        return {};
    },
    {

    }
);

```