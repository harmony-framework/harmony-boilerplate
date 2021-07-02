

## SEO Decorator

<b>Location</b>: `base/features/decorators/withSEO`


With SEO is a Decorator that can use for any component to simplify the using and heading headers when this component on screen. <br />
Headers automatic added and removed if the component is in or out the screen.


## Using Example

```JS
import { withSEO } from '@base/features/base-decorator/withSEO';
...

@withSEO({
	helmet: (props: Props) => {
		const { device } = props;
		return (
			[
				<meta key="description" name={device.name} content={device.description} />,
				<meta key="title" title={device.name} content={device.name} />,
				<meta key="og:type" property="og:type" content="product" />,
				<meta key="og:image" property="og:image" content={device.image} />,
			]
		);
	}
})
class DeviceDetailsPage extends React.Component<Props> {
	render() {
	    ...
    }
}
```
