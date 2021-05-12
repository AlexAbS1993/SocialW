import { authAPI, loginDataType, registrationDataType } from './api/authAPI';
import {ThunkDispatch } from 'redux-thunk'


const initialState = {
    login: "",
    city: {
        name: "",
        area: "",
        _id: "",
    },
    error: "",
    notification: "",
    initialize: false,
    isLoading: false,
    registrationDone: false,
    isAuth: false,
}

type initialStateType = typeof initialState

export const setErrorAC = (error:string) => {
    return {type: 'SET_ERROR', error} as const
}
export const setNotificationAC = (notification:string) => {
    return {type: "SET_NOT", notification} as const
}
const setUserAC = (data: userType) => {
    return {type:"SET_USER", data} as const
}

export const registrationDoneAC = (value: boolean) => {
    return {type: "REG_DONE", value} as const
}

const initializeAC = (init: boolean) => {
    return {type: "SET_INIT", init} as const
}

const loadingAC = (loading: boolean) => {
    return {type: "SET_LOADING", loading} as const
}
const isAuthAC = (value: boolean) => {
    return{type: "SET_AUTH", value} as const
}

export const outAuthAC = (value: boolean) => {
    return {type: "OUT_AUTH", value} as const
}

let actionCreators = {
    setErrorAC,
    setNotificationAC,
    setUserAC,
    registrationDoneAC,
    initializeAC,
    loadingAC,
    outAuthAC,
    isAuthAC
}

type TACs<T> = T extends {[key:string]: infer U} ? U : never

type actionType = ReturnType<TACs<typeof actionCreators>>


export const authReducer = (state:initialStateType = initialState, action: actionType):initialStateType => {
    switch(action.type){
        case"SET_NOT":{
            return {
                ...state,
                notification: action.notification
            }
        }
        case "SET_ERROR":{
            return{
                ...state,
                error: action.error
            }
        }
        case "SET_USER": {
            return {
                ...state,
                ...action.data
            }
        }
        case "REG_DONE": {
            return {
                ...state, 
                registrationDone: action.value
            }
        }
        case "SET_LOADING": {
            return {
                ...state, 
                isLoading: action.loading
            }
        }
        case "SET_INIT": {
            return {
                ...state, 
                initialize: action.init
            }
        }
        case "SET_AUTH": {
            return {
                ...state,
                isAuth: action.value
            }
        }
        case "OUT_AUTH": {
            return {
                ...initialState,

            }
        }
        default: return state
    }
}

type cityType = {
        name: string,
        _id: string,
        area: string,
}
type userType = {
    login: string,
    city: cityType
}

type loginResponseType = {
    message: string, 
    user: userType,
    token: string
}

type dispatchType = (action: actionType) => void
export type ThunkAppDispatch = ThunkDispatch<initialStateType, any, actionType>

export const loginizationThunk = (data: loginDataType) => async(dispatch: dispatchType) => {
    try{
        dispatch(loadingAC(true))
        let response = await authAPI.setLogin(data)
        let responseData: loginResponseType = response.data
        dispatch(setUserAC(responseData.user))
        dispatch(setNotificationAC(responseData.message))
        dispatch(setErrorAC(""))
        dispatch(isAuthAC(true))
        localStorage.setItem("token", responseData.token)   
    }
    catch(e){
        dispatch(setErrorAC(e.response.data.message))
    }
    finally{
        dispatch(loadingAC(false))
    }
}

export const getLoginThunk = () => async(dispatch: dispatchType) => {
    try{
        dispatch(initializeAC(false))
        dispatch(loadingAC(true))
        let response = await authAPI.getLogin()
        let responseData:Omit<loginResponseType, "token"> =  response.data
        dispatch(setUserAC(responseData.user))
        dispatch(setErrorAC(""))
        dispatch(setNotificationAC(responseData.message))
        dispatch(isAuthAC(true))
    }
    catch(e){
        dispatch(setErrorAC(e.response.data.message))
    }
    finally{
        dispatch(initializeAC(true))
        dispatch(loadingAC(false))
    }
}



export const registrationThunk = (data: registrationDataType) => async(dispatch: dispatchType) => {
    try{
        dispatch(loadingAC(true))
        let response = await authAPI.registartion(data)
        let responseData: Omit<loginResponseType, "token"> = response.data
        dispatch(setErrorAC(""))
        dispatch(setNotificationAC(responseData.message))
        dispatch(registrationDoneAC(true))
    }
    catch(e){
        dispatch(setErrorAC(e.response.data.message))
    }
    finally{
        dispatch(loadingAC(false))
    }
}