import { cityAPI } from "./api/cityAPI"

type tagsType<T> = {
    value: number,
    name: T
}


type partOfDay = {
    temperature: number,
    temperament: {
        usually: tagsType<boolean>,
        sense: tagsType<string>[]
    },
    tags: tagsType<string>[]
}

export type analyticsType = {
    date: string,
    morning: partOfDay,
    afternoon: partOfDay,
    evening: partOfDay,
    night: partOfDay,
}

export type citiesType = {
    name: string,
    _id: string,
    area: string,
    __v: number
}

const initialState = {
    name: "",
    area: "",
    analytics: [] as analyticsType[],
    error: "",
    notification: "",
    cities: [] as citiesType[],
    isLoading: false,
    initialize: false,
    _id: "", 
    itIsChangeNow: false
}

type cityReducerInitialStateType = typeof initialState

export const cityErrorAC = (error: string) => {
    return {type: "SET_CITY_ERROR", error} as const
}
export const citySetNotificationAC = (not: string) => {
    return {type: "SET_CITY_NOT", not} as const
}

const cityGetCityAC = (data: citiesType[]) => {
    return {type: "GET_CITIES", data} as const
}

const cityInitializeAC = (init: boolean) => {
    return {type: "CITY_INITIALIZED", init} as const
} 

const cityLoadingAC = (loading: boolean) => {
    return {type: "CITY_LOADING", loading} as const
}

export const cityGetAnalitics = (data:analyticsType[]) => {
    return {type: "CITY_GET_ANAL", data} as const
}

const itIsChangeNowAC = (value: boolean) => {
    return {type: "CITY_SET_CHANGE_NOW", value} as const
}

const actionCreators = {
    cityErrorAC,
    citySetNotificationAC,
    cityGetCityAC,
    cityInitializeAC,
    cityLoadingAC,
    cityGetAnalitics,
    itIsChangeNowAC
}


type TACs<T> = T extends {[key:string]: infer U} ? U : never

type actionType = ReturnType<TACs<typeof actionCreators>>


export const cityReducer = (state: cityReducerInitialStateType = initialState, action: actionType):cityReducerInitialStateType  => {
    switch(action.type){
        case "SET_CITY_ERROR": {
            return {
                ...state,
                error: action.error
            }
        }
        case "SET_CITY_NOT": {
            return {
                ...state,
                notification: action.not
            }
        }
        case "CITY_LOADING": {
            return {
                ...state,
                isLoading: action.loading
            }
        }
        case "CITY_INITIALIZED": {
            return {
                ...state,
                initialize: action.init
            }
        }
        case "GET_CITIES":{
            return {
                ...state, 
                cities: [...action.data]
            }
        }
        case "CITY_GET_ANAL": {
            return {
                ...state,
                analytics: action.data
            }
        }
        case "CITY_SET_CHANGE_NOW": {
            return {
                ...state, 
                itIsChangeNow: action.value
            }
        }
        default: return state
    }
}

type dispatchType = (action: actionType) => void

type getCityResponseType = {
    message: string, 
    cities: citiesType[]
}

export const getCitiesThunk = () => async(dispatch: dispatchType) => {
    try{
        dispatch(cityLoadingAC(true))
        const response = await cityAPI.getCities()
        const responseData:getCityResponseType = response.data 
        dispatch({type:"GET_CITIES", data: responseData.cities})
    }
    catch(e){
        dispatch(cityErrorAC(e.response.data.message))
    }
    finally{
        dispatch(cityLoadingAC(false))
    }
}


type analyticResponseType = {
    message: string,
    analytics: analyticsType[]
}

export const getAnalyticsThunk = () => async(dispatch: dispatchType) => {
    try{
        dispatch(cityInitializeAC(false))
        dispatch(cityLoadingAC(true))
        const response = await cityAPI.getAnalytics()
        const responseData:analyticResponseType  = response.data 
        dispatch(cityGetAnalitics(responseData.analytics))
    }
    catch(e){
        dispatch(cityErrorAC(e.response.data.message))
    }
    finally {
        dispatch(cityInitializeAC(true))
        dispatch(cityLoadingAC(false))
    }
}

export type addWheatherDataType = {
    _id: string,
    temperature: string,
    temperament: {usually: boolean, sense: string},
    tags: string[]
}

export const addWheatherThunk = (data: addWheatherDataType) => async(dispatch: dispatchType) => {
    try{
        dispatch(cityLoadingAC(true))
        const response = await cityAPI.addWheather(data)
        const responseData:string = response.data.message
        dispatch(citySetNotificationAC(responseData))
    }
    catch(e){
        dispatch(cityErrorAC(e.response.data.message))
    }
    finally {
        dispatch(cityLoadingAC(false))
    }
}

export const itIsChangeNowThunk = () => async(dispatch: dispatchType) => {
    try{
        dispatch(cityLoadingAC(true))
        const response = await cityAPI.getItIsChangeNow()
        dispatch(itIsChangeNowAC(response.data.itIsChangeNow))
    }
    catch(e){
        dispatch(cityErrorAC(e.response.data.message))
    }
    finally{
        dispatch(cityLoadingAC(false))
    }
}