

# Generate Core Components

<b>Location</b>: `src/containers/`

Containers is the components who is connected to redux. 

Create Container by cli
``` sh
$ gulp createContainer --className myClassName
```

## Example Code

!!! warning "Harmony Connect"
    Any Container connected to redux with `harmonyConnect` to enjoy all of Harmony features.<br/>
    Read more about <b>Harmony Connect</b> in <b>Base Folder</b> Section.

``` JS
import * as React from 'react';
import {baseConnect} from '@base/features/base-redux-react-connect';

interface IProps {
    languages: any;
    setActiveLanguage: Function;
}

class Localization extends React.Component<IProps> {
	render() {
	    const { languages, setActiveLanguage } = this.props;

		return (
			<div className="locale" style={{width: '100%', padding: '10px', textAlign: 'center'}}>
				Language:
				<select onChange={(event: any) => { setActiveLanguage(event.target.value); }}>
                    {
                        languages.map((lang: any) => (
                            <option key={lang.code} value={lang.code}>{lang.code}</option>
                        ))
                    }
				</select>
			</div>
		);
	}
}

export default baseConnect(Localization,
	(/* state */) => {
		return {};
	},
	{

	}
);
```