import React from 'react';
import { render } from 'react-dom';

import '../scss/main.scss';

import * as thoriumComponents from 'telus-thorium-enriched';
import * as exampleComponents from './components';

document.addEventListener('DOMContentLoaded', () => {
  const components = { ...thoriumComponents, ...exampleComponents };
  const mounts = window.document.querySelectorAll('[data-thorium-component]');

  [].forEach.call(mounts, (mountPoint) => {
    const rawProps = mountPoint.getAttribute('data-props') || {};
    let parsedProps = {};

    mountPoint.removeAttribute('data-props');

    try {
      parsedProps = JSON.parse(rawProps);
    } catch (e) {
      parsedProps = {};
    }

    const componentName = mountPoint.getAttribute('data-thorium-component');
    const component = components[componentName];

    if (component) {
      render(React.createElement(component, parsedProps), mountPoint);
    }
  });
});
