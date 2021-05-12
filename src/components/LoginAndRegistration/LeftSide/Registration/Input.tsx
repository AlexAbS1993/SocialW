import React, { FC } from "react"

export type inputType = {
    label: string,
    placeholder: string, 
    changeHandler: React.Dispatch<React.SetStateAction<string>>,
    value: string,
    type?: string,
}
export const Input:FC<inputType> = React.memo(({label,placeholder, changeHandler, value, type}) => {
    return (
        <div>
          <label> {label} </label>
          <input placeholder={placeholder} value={value} onChange={(e:React.FormEvent<HTMLInputElement>) => {changeHandler(e.currentTarget.value)}} type={type}/>
        </div>
    )
})