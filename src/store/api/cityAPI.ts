import { addWheatherDataType } from './../cityReducer';
import axios from 'axios'

const instance = axios.create({
    baseURL: "http://localhost:5000/api/city"
})


export const cityAPI = {
    getCities: () =>{
        return instance.get("/getUsersCitites")
    },
    getAnalytics: () => {
        return instance.get("/getAnalytics", {
            headers: {
                Authorization: localStorage.getItem('token')
            }
        })
    },
    addWheather: (data: addWheatherDataType) => {
        return instance.post('/addWheater', data, {
            headers: {
                Authorization: localStorage.getItem('token')
            }
        })
    },
    getItIsChangeNow: () => {
        return instance.get('/itIsChangeNow', {
            headers: {
                Authorization: localStorage.getItem('token')
            }
        })
    }
}