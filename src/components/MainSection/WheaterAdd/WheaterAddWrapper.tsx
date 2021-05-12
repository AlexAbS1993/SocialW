import React, { FC, useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { SpringValue } from "react-spring"
import {animated} from 'react-spring'
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


export const WheaterAddWrapper:FC<WheaterAddWrapperPropTypes> = ({style}) => {
    const _id = useSelector<RootState, string>(state => state.auth.city._id)
    const city =  useSelector<RootState, string>(state => state.auth.city.name)
    const isLoading = useSelector<RootState, boolean>(state => state.city.isLoading)
    const notification = useSelector<RootState, string>(state => state.city.notification)
    const isChangeAlready = useSelector<RootState, boolean>(state => state.city.itIsChangeNow)
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
    const sumbitHandler = async(e:React.FormEvent) => {
        e.preventDefault()
        let data = {temperature: form.temperature, 
            tags: form.tags.split(" "), 
            _id,
            temperament: {
                usually: form.usually,
                sense: form.sense
            }}
       await dispatch(addWheatherThunk(data))
    }
    useEffect(() => {
        if (notification){
            setForm({
                temperature: "",
                usually: false,
                sense: "",
                tags: ""
            })
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
    return (
        <animated.div style={style} className={classes.wrapper}>
            <div className={classes.formWrapper}>
                <h3>Поделитесь своим ощущением погоды в {city}</h3>
                {isChangeAlready ? 
                <div> <p> Спасибо, что оставили своё мнение о погоде.</p> 
                <Remains />
                </div> 
                : 
                <form onSubmit={sumbitHandler} onReset={resetHandler}>
                    <ExtendedInput label="Температура по ощущениям" id="temperature" value={form.temperature} changeHandler={changeHandler}/>
                    <ExtendedCheckboxInput label="Свойственно для времени года?" id="usually" checked={form.usually} changeHandler={changeHandler} type="checkbox"/>
                    <ExtendedInput label="Характер погоды (солнечно, дождливо, пасмурно)" id="sense" value={form.sense} changeHandler={changeHandler}/>
                    <ExtendedInput label="Ощущения от погоды и советы (через пробел)" id="tags" value={form.tags} changeHandler={changeHandler}/>
                    <button disabled={isLoading} type="submit">{isLoading ? "..." : "Поделиться своим мнением"}</button>
                </form>}
                
            </div>
        </animated.div>
    )
}
