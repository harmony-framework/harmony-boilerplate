

## Storybook


Harmony include Storybook built-in, althgo most of the usage is related to the official documentation 
<a href="https://storybook.js.org/" target="_blank">Storybook</a>, 
There is few things you may need to know with Storybook inside Harmony to make your life easier<br/>

## Generate Story

Each time you create Component with `gulp createComponent` it also will generate you automatic `.stories.tsx` file
<br />
To create `.stories.tsx` to Container or Page you can use on the desire directory folder the command gulp `gulp createStoryContainer` 
<br />

## Base Story Decorator

Harmony Provide by default Base Decorator, what make the story to be connected to the store and then you can test more Components, 
and even container that required data from store.

## Create Story for Component by cli

Each time you create Component with the generator `createComponent` it automatic will generate to you `.stories.tsx` file.<br />
But if you wish you can create Component Story everywhere with cli command <br />
<br />
Most the time the only what you left to do is to insert the data under `Default.args` object.

```
$ gulp createStory --name MyComponentName --storyTitle Business Components/MyComponentName
```

### Example Code

```JS
// MyComponentName.stories.ts
import React from 'react';
import { BaseStorybookDecorator } from '@base/features/base-decorator';
import { ComponentStory, Meta } from '@storybook/react';
import DeviceCard, { Props as DeviceCardProps } from './index';

export default {
	title: 'Design System/Business Components/Device Card',
	component: DeviceCard,
	argTypes: {
		quantity: {
			description: 'The numbers of this Item in Cart. Once bigger then one button become to disable and title become remove.'
		}
	},
	decorators: [BaseStorybookDecorator],
	parameters: { docs: { source: { type: 'dynamic', excludeDecorators: true } } }
} as Meta;

// eslint-disable-next-line react/jsx-props-no-spreading
const Template: ComponentStory<typeof DeviceCard> = (args) => <DeviceCard {...args} />;

export const Default = Template.bind({});
Default.args = {

} as DeviceCardProps;


```

## Create Story for Container by cli

Story Container is the same as normal story, but it connected to the store.<br />
Then with same way with normal story, you can insert your args as it was the data from the store, and the 
container will work with this args injected via the `mapStateToProps`.


```
$ gulp createStoryContainer --name MyComponentName --storyTitle Business Components/MyComponentName
```

### Example Code

```JS
// MyComponentName.stories.ts
import React from 'react';
import { BaseStorybookDecorator } from '@base/features/base-decorator';
import { baseConnect } from '@base/features/base-redux-react-connect';
import { ComponentStory, Meta } from '@storybook/react';
import { ErrorPage, Props as ErrorPageProps } from './index';

export default {
	title: 'Design System/Containers/ErrorPage',
	component: (props: ErrorPageProps) => (<ErrorPage {...props as any} />),
	argTypes: {

	},
	decorators: [BaseStorybookDecorator],
	parameters: { docs: { source: { type: 'dynamic', excludeDecorators: true } } }
} as Meta;

const Template: ComponentStory<typeof ErrorPage> = (args) => {
	const ErrorPageContainer = baseConnect<any, any, ErrorPageProps>(
		ErrorPage,
		() => ({
			...args
		})
	);

	return <ErrorPageContainer {...args} />;
};

export const Default = Template.bind({});
Default.args = {

} as ErrorPageProps;


```

!!! tip Big Data Required from Store

    The best practice is to keep your component with small requirments of Props.<br/>
    But if you face a situation that Container required tones of data from the store, you always can copy
    the store for real enviroment where your container should be runing and put it in sepreate file of mock.<br />
    Then you can import it and spread it into your `args`.
