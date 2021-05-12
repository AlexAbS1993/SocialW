import { animated } from "react-spring"
import React, { FC, useEffect, useState } from "react"
import { SpringValue } from "react-spring"
import classes from "./Registration.module.css"
import {leftSideWrapperPropsType} from '../LeftSideWrapper'
import { useDispatch, useSelector } from "react-redux"
import {  registrationThunk, setErrorAC, ThunkAppDispatch } from "../../../../store/authReducer"
import { Input } from "./Input"
import { RootState } from "../../../../store/store"
import { citiesAndAreas } from "../../../../assets/RussianCity"

type registrationWrapperType = {
    style: {
        opacity: SpringValue<number>;
    }
}

export const RegistrationWrapper:FC<Pick<leftSideWrapperPropsType, "area"|"city"|"setArea"|"setCity">&registrationWrapperType> = ({style, area, setArea, setCity,city}) => {
   const [login, setLogin] = useState<string>("")
   const [password, setPassword] = useState<string>("")
   const dispatch = useDispatch<ThunkAppDispatch>()
    const submitHandler = (e:React.FormEvent) => {
        e.preventDefault()
        if (!citiesAndAreas.some((e,i) => {
            if (area === e.area){
                return true
            }
        })){
            dispatch(setErrorAC("Такого региона нет в списке"))
            return
        }
        dispatch(registrationThunk({
            area: area,
            city: city,
            login: login,
            password: password,
        }))
   }
   const resetHandler = () =>{
        setLogin("")
        setPassword("")
        setCity("")
        setArea("")
   }
   useEffect(() => {
    return () => {
        setCity("")
        setArea("")
    }
   }, [dispatch])
   const isLoading = useSelector<RootState, boolean>(state => state.auth.isLoading)
    return (
        <animated.div style={style} className={classes.wrapper}>
            <div className={classes.formWrapper}>
                <form onSubmit={submitHandler} onReset={resetHandler}>
                    <Input value={login} label={"Введите логин"} placeholder={"логин..."} changeHandler={setLogin}/>
                    <Input value={password} label={"Введите пароль"} placeholder={"пароль..."} changeHandler={setPassword} type={"password"}/>
                    <Input value={city} label={"Введите ваш город"} placeholder={"город..."} changeHandler={setCity}/>
                    <Input value={area} label={"Регион"} placeholder={"регион..."} changeHandler={setArea}/>
                    <div><button type="submit" disabled={isLoading}>{isLoading ? "..." : "Зарегистрироваться"}</button>
                        <button type="reset"> Сбросить </button>
                    </div>
                </form>
            </div>
        </animated.div>
    )
}