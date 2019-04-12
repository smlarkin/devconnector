import { createStore, applyMiddleware } from 'redux'
import { composeWithDevTools } from 'redux-devtools-extension'
import { createLogger } from 'redux-logger'
import thunk from 'redux-thunk'
import axios from 'axios'
import rootReducer from './reducers'

// NOT ACTUALLY NEEDED, BUT MIGHT USE LATER
// const persistedState = {}

const middleware = composeWithDevTools(
  applyMiddleware(
    thunk.withExtraArgument({ axios }),
    createLogger({ collapsed: false }) /* <-- true for production */
  )
)

const store = createStore(rootReducer, /* persistedState, */ middleware)

export default store
