import { combineReducers } from 'redux';

import { ConnectedGrid } from './components/Grid';
import Store from './store/store';

import { Reducers } from './reducers';

import { Actions } from './actions';

import { applyGridConfig } from './constants/GridConstants';

const modules = {
    Actions,
    Grid: ConnectedGrid,
    GridRootReducer: combineReducers(Reducers),
    Reducers,
    applyGridConfig,
    Store
};

module.exports = modules;
