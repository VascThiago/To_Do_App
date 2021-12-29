import React from 'react'
import ReactDOM from 'react-dom'

import App from './main/app'
import reducers from './main/reducers'

//Redux
import { applyMiddleware, createStore } from 'redux'
import { Provider } from 'react-redux'

//Middlewares
//o promise serve para quando a action creator retornar uma promise, ele vai esperar a promise ser resolvida para dai então disparar os reducers.
import promise from 'redux-promise'
//o multi serve para que dentro de uma action creator retorne uma array com várias actions
import multi from 'redux-multi'
//o thunk faz com que a action creator receba um método disparando um dispatch ao invés de retornar um objeto, assim ordenando e organizando as actions para que não sejam disparadas todas de uma vez.
import thunk from 'redux-thunk'


//constante para utilizar o redux devtools extesão para navegador
const devTools = window.__REDUX_DEVTOOLS_EXTENSION__
    && window.__REDUX_DEVTOOLS_EXTENSION__()

//aplicando os middlewares
const store = applyMiddleware(thunk, multi, promise)(createStore)(reducers, devTools)

ReactDOM.render(
    <Provider store={store}>
        <App />
    </Provider>, 
    document.getElementById('app'))