import React from 'react';
import ReactDOM from 'react-dom';
import 'react-toastify/dist/ReactToastify.css';
import './styles/styles.scss';

import App from './containers/App';
import * as serviceWorker from './serviceWorker';
import IntlProviderWrapper from "./hoc/IntlProviderWrapper";
import { GoogleOAuthProvider } from '@react-oauth/google';

import { Provider } from 'react-redux';
import reduxStore, { persistor } from './redux';

const clientId = '94562927937-r41p817bjkv7ghh4kv15svt537nquudt.apps.googleusercontent.com';

const renderApp = () => {
    ReactDOM.render(
        <GoogleOAuthProvider clientId={clientId}>
            <Provider store={reduxStore}>
                <IntlProviderWrapper>
                    <App persistor={persistor} />
                </IntlProviderWrapper>
            </Provider>
        </GoogleOAuthProvider>,
        document.getElementById('root')
    );
};

renderApp();
// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
