import axios from 'axios'

const instance = axios.create({
    baseURL: "http://localhost:5000/api/auth"
})

export type loginDataType = {
    login: string,
    password: string,
}
export type registrationDataType = {
    login: string,
    password: string,
    city: string,
    area: string
}

export const authAPI = {
    setLogin: (data: loginDataType) => {
        return instance.post("/login", data, )
    },
    getLogin: () => {
        return instance.get("/login", {
            headers: {
                Authorization: localStorage.getItem("token")
            }
        })
    },
    registartion: (data: registrationDataType) => {
        return instance.post("/registration", data)
    }
}