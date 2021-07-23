

# Mobile Render

## Mobile Render Concept

Webapp required us to support multiple screen sizes.
Single render method in react component and detection can take effort.
Harmony Provide you built-in open source library for different screens.

Library Reference <a href="https://www.npmjs.com/package/@artsy/fresnel" target="_blank">@artsy/fresnel</a> 

## Usage

```js
class App extends React.Component<Props> {
	render() {
		const { children, pendingTasks } = this.props;
		const loading = pendingTasks?.length;

		return (
			<>
				<ErrorHandler />
				{(!!loading) && <Spinner />}
				<Localization />
				<Header />
				<Media greaterThan="sm">
					{children}
				</Media>
				<Media at="sm">
					<h1>This is Render Example for 0-768 screen size</h1>
					{children}
				</Media>
			</>
		);
	}
}
```
