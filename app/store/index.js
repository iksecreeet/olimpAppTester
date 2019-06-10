import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import reducers from '../reducers';

export default function configureStore() {
	const middleware = [thunk];
    const store = createStore(reducers, applyMiddleware(...middleware));
    return store;
}

