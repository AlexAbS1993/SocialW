import React, { FC, useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { Redirect } from "react-router"
import { SpringValue } from "react-spring"
import {animated} from 'react-spring'
import { Button } from "../../../assets/components/Button"
import { ThunkAppDispatch } from "../../../store/authReducer"
import { addWheatherThunk, itIsChangeNowThunk } from "../../../store/cityReducer"
import { RootState } from "../../../store/store"
import { inputType } from "../../LoginAndRegistration/LeftSide/Registration/Input"
import { Remains } from "./Reamains"
import classes from './WheaterAddWrapper.module.css'

type WheaterAddWrapperPropTypes = {
    style: {
        opacity: SpringValue<number>;
    },
    setCurrentPage: React.Dispatch<React.SetStateAction<"add" | "get">>
}

type FormType = {
    temperature: string,
    usually: boolean,
    sense: string,
    tags: string
}

type changeHandlerArgumentsType = {
    target: string, 
    id: string
}

type ExtendedInputType = Omit<inputType, "placeholder"|"changeHandler"|"value"> & {
    value: string,
    id: string,
    changeHandler: (target:string, id: string ) => void
}
type CheckboxType = {
    checked: boolean,
    id: string, 
    changeHandler: (target:boolean, id: string ) => void,
    label: string,
    type: "checkbox"
}

const ExtendedInput:FC<ExtendedInputType> = React.memo(({id, label, type, value, changeHandler}) => {
    return (
    <div className={classes.inputText}>
        <label htmlFor={id}>{label}</label>
        <input type={type || "text"} id={id} value={value} onChange={(e:React.ChangeEvent<HTMLInputElement>) => {
             changeHandler(e.currentTarget.value, id)
            }
    }    />
    </div>
    )
})
const ExtendedCheckboxInput:FC<CheckboxType> = React.memo(({checked, id, changeHandler, label, type}) => {
    return (
        <div className={classes.inputCheckbox}>
        <label htmlFor={id}>{label}</label>
        <input type={type || "text"} id={id} checked={checked} onChange={(e:React.ChangeEvent<HTMLInputElement>) => {
             changeHandler(e.currentTarget.checked, id)
            }}  />
        </div>
        )
    })


export const WheaterAddWrapper:FC<WheaterAddWrapperPropTypes> = ({style, setCurrentPage}) => {
    const _id = useSelector<RootState, string>(state => state.auth.city._id)
    const city =  useSelector<RootState, string>(state => state.auth.city.name)
    const isLoading = useSelector<RootState, boolean>(state => state.city.isLoading)
    const notification = useSelector<RootState, string>(state => state.city.notification)
    const isChangeAlready = useSelector<RootState, boolean>(state => state.city.itIsChangeNow)
    const [localRedirect, setLocalRedirect] = useState(false)
    const dispatch = useDispatch<ThunkAppDispatch>()
    useEffect(() => {
        dispatch(itIsChangeNowThunk())
    }, [dispatch])

    const [form, setForm] = useState<FormType>({
        temperature: "",
        usually: false,
        sense: "",
        tags: ""
    })
    const changeHandler = (target: string | boolean, id: string ) => {
        setForm({
            ...form, 
            [id]:target
        })
    }
    const sumbitHandler = (e:React.FormEvent) => {
        e.preventDefault()
        let data = {temperature: form.temperature, 
            tags: form.tags.split(" "), 
            _id,
            temperament: {
                usually: form.usually,
                sense: form.sense
            }}
        dispatch(addWheatherThunk(data))
    }
    useEffect(() => {
        if (notification){
            setForm({
                temperature: "",
                usually: false,
                sense: "",
                tags: ""
            })
            setLocalRedirect(true)
        }
    }, [notification])
    const resetHandler = () => {
        setForm({
            temperature: "",
            usually: false,
            sense: "",
            tags: ""
        })
    }
    useEffect(() => {
        if (localRedirect){
            setCurrentPage("get")
        }
        return () => {
            setLocalRedirect(false)
        }
    }, [localRedirect])
    return (
        <animated.div style={style} className={classes.wrapper}>
            <div className={classes.formWrapper}>
                <h3>???????????????????? ?????????? ?????????????????? ???????????? ?? {city}</h3>
                {isChangeAlready ? 
                <div> <p> ??????????????, ?????? ???????????????? ???????? ???????????? ?? ????????????.</p> 
                <Remains />
                </div> 
                : 
                <form onSubmit={sumbitHandler} onReset={resetHandler}>
                    <ExtendedInput label="?????????????????????? ???? ??????????????????" id="temperature" value={form.temperature} changeHandler={changeHandler}/>
                    <ExtendedCheckboxInput label="?????????????????????? ?????? ?????????????? ?????????" id="usually" checked={form.usually} changeHandler={changeHandler} type="checkbox"/>
                    <ExtendedInput label="???????????????? ???????????? (????????????????, ????????????????, ????????????????)" id="sense" value={form.sense} changeHandler={changeHandler}/>
                    <ExtendedInput label="???????????????? ???? ???????????? ?? ???????????? (?????????? ????????????)" id="tags" value={form.tags} changeHandler={changeHandler}/>
                    <Button disabled={isLoading} type="submit" text={isLoading ? "..." : "???????????????????? ?????????? ??????????????"}/>
                </form>}
                
            </div>
        </animated.div>
    )
}
