import {applyMiddleware, combineReducers, createStore} from 'redux'
import thunkMiddleware from 'redux-thunk'
import {authReducer} from './authReducer'
import { cityReducer } from './cityReducer'


const reducers = combineReducers({
    auth: authReducer,
    city: cityReducer
})

export const store = createStore(reducers, applyMiddleware(thunkMiddleware))

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch


(window as any).store = store
