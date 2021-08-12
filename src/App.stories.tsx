import React from 'react';
import {ComponentMeta, ComponentStory} from '@storybook/react';
import {App} from "./App";
import {ReduxStoreProviderDecorator} from "./redux/ReduxStoreProviderDecorator";


export default {
  title: 'Social Network/App',
  component: App,
  decorators: [ReduxStoreProviderDecorator]
} as ComponentMeta<typeof App>;

const Template: ComponentStory<typeof App> = () => <App />;

export const AppStories = Template.bind({});