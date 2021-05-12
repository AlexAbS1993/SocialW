import classes from "./Login.module.css"
import { animated } from "react-spring"
import React, { FC, useState } from "react"
import { SpringValue } from "react-spring"
import { Input } from "../Registration/Input"
import { useDispatch } from "react-redux"
import { loginizationThunk, ThunkAppDispatch } from "../../../../store/authReducer"

type RightSideWrapperType = {
    style: {opacity: SpringValue<number>;}
}

export const LoginWrapper:FC<RightSideWrapperType> = ({style}) => {
    const [login, setLogin] = useState<string>("")
    const [password, setPassword] = useState<string>("")
    const dispatch = useDispatch<ThunkAppDispatch>()
    const submitHandler = (e:React.FormEvent):void => {
        e.preventDefault()
        dispatch(loginizationThunk({
            login, password
        }))
    }
    return (
        <animated.div style={{...style}} className={classes.wrapper}>
                <form onSubmit={submitHandler}>
                    <Input label="Введите логин" placeholder="логин..." value={login} changeHandler={setLogin}/>
                    <Input type="password" label="Введите пароль" placeholder="пароль..." value={password} changeHandler={setPassword}/>
                    <button type="submit">Зайти как {login ? login : "..."}</button>
                </form>
        </animated.div>
    )
}