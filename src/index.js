import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import {Provider} from 'react-redux';
import {createStore} from 'redux';

function reducer(state = {count: 0}, action) {

    switch (action.type) {
        case 'INCREMENT_COUNT':
            return {
                ...state,
                count: state.count + 1
            }
        case 'DECREMENT_COUNT':
            return {
                ...state,
                count: state.count - 1
            }
        default:
            return state;
    }

}

const store = createStore(reducer);

ReactDOM.render(
    <React.StrictMode>
        <Provider store={store}>
            <App/>
        </Provider>
    </React.StrictMode>,
    document.getElementById('root')
);