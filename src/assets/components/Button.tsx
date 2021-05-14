import classes from './Button.module.css'
import React, { FC } from 'react'

type ButtonPropsType = {
    type?: "button" | "submit" | "reset",
    text: string,
    handler?: () => void,
    variant?: "small" | "large" | "medium",
    disabled?: boolean,
    active?: boolean
}

export const Button: FC<ButtonPropsType> = ({type = "button", text = "Кнопка", handler, variant = "medium", disabled = false, active = false}) => {
    return (
        <>
            <button onClick={handler} type={type} className={`${classes.button} ${classes[`button_${variant}`]} ${active ? classes.button_active : ""}`} disabled={disabled}> {text} </button>
        </>
    )
}