

# Mobile Render

## Mobile Render Concept

Webapp required us to support multiple screen sizes.
Single render method in react component and detection can take effort.
Harmony Provide you detection for mobile and invoke special method of render called `renderMobile` once the user open the app in mobile.

## Usage

```js
import { RenderMobile } from '@base/features/base-decorator';

@RenderMobile()
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

	renderMobile() {
        // return view and business rendered for mobile
    }
}
```