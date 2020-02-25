import React from 'react';
import ReactDOM from 'react-dom'
//Theme
import {MuiThemeProvider} from '@material-ui/core/styles';
import commonTheme from 'thaisamut/common/theme';
import theme from './theme.js';
//Redux
import {applyMiddleware, createStore} from 'redux';
import {Provider} from 'react-redux'
import sequenceAction from 'redux-sequence-action';
import thunkMiddleware from 'redux-thunk'
import { createLogger } from 'redux-logger'
import rootReducer from '~/reducers/reducer'
//other
import "thaisamut/common/lib/Import";
import deepmerge from 'deepmerge';
import {loadConfig} from "~/config";
import Navigate from "thaisamut/common/containers/Navigate";

const globalConfig = deepmerge(window.global, loadConfig(window.global));
//Redux
const store = createStore(
  rootReducer,
  applyMiddleware(
      thunkMiddleware,
      sequenceAction,
      createLogger({
          predicate: (getState, action) => (process.env.NODE_ENV === 'development'),
      }),
  )
);

let margeTheme = deepmerge(commonTheme, theme);

ReactDOM.render(
    <Provider store={store}>
        <React.Fragment>
            <MuiThemeProvider theme={margeTheme}>
                <Navigate config={globalConfig}/>
            </MuiThemeProvider>
        </React.Fragment>
    </Provider>
    ,
    document.getElementById('root')
);
