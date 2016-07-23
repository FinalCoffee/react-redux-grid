/* eslint-enable describe it sinon */
import React from 'react';
import expect from 'expect';
import { mount } from 'enzyme';
import { ConnectedGrid } from './../../../src/components/Grid.jsx';
import { Store as GridStore } from './../../../src/store/store';

import {
    gridColumns,
    localGridData,
    stateKey
} from '../../testUtils/data';

const props = {
    data: localGridData,
    columns: gridColumns,
    stateKey,
    plugins: {}
};

describe('Integration Test Fixed Header Scroll Events', () => {

    const container = document.createElement('div');
    document.body.appendChild(container);
    container.classList.add('container');
    container.style.overflow = 'scroll';
    container.style.height = '200px';

    const stickyProps = {
        ...props,
        store: GridStore,
        plugins: {
            STICKY_HEADER: {
                enabled: true,
                scrollTarget: '.container'
            }
        }
    };

    const component = mount(<ConnectedGrid { ...stickyProps } />, {
        attachTo: container
    });

    container.scrollTop = 200;

    setTimeout(() => {
        expect(
            component.find('.react-grid-header-fixed').props().className
        ).toContain('react-grid-header-stuck');
    }, 10);

});

describe('Integration Test Fixed Header for custom Scroll Events', () => {

    const container = document.createElement('div');
    document.body.appendChild(container);
    container.classList.add('container');
    container.style.overflow = 'scroll';
    container.style.height = '200px';

    const stickyProps = {
        ...props,
        store: GridStore,
        plugins: {
            STICKY_HEADER: {
                enabled: true,
                scrollTarget: '.container',
                listener: sinon.spy()
            }
        }
    };

    const component = mount(<ConnectedGrid { ...stickyProps } />, {
        attachTo: container
    });

    container.scrollTop = 200;

    setTimeout(() => {
        expect(
            stickyProps.plugins.STICKY_HEADER.listener.called
        ).toEqual(true);
    }, 10);

});

