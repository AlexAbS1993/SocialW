import classes from './LeftSide.module.css'
import React, { FC } from 'react'
import { TransitionFn } from '@react-spring/core'
import { LoginWrapper } from './Login/LoginWrapper'
import { RegistrationWrapper } from './Registration/RegistrationWrapper'
import { Footer } from './Footer/Footer'

export type leftSideWrapperPropsType = {
    currentPage: "login" | "registration",
    transition: TransitionFn<"login" | "registration", {
        opacity: number;
    }>,
    setCurrentPage: React.Dispatch<React.SetStateAction<"login" | "registration">>,
    area: string,
    city: string,
    setCity: React.Dispatch<React.SetStateAction<string>>,
    setArea: React.Dispatch<React.SetStateAction<string>>, 
}

export const LeftSideWrapper:FC<leftSideWrapperPropsType> = ({currentPage, transition, setCurrentPage, area, city, setCity, setArea}) => {
    return (
        <div className={classes.wrapper}>
            <header><div className={classes.title}><h2>{currentPage === "login" ? "Введите свои данные" : "Зарегистрируйтесь"}</h2></div></header>
            <div className={classes.middleWrapper}>
            {transition((style, item) => {
                return item === "login" ? <LoginWrapper style={style}/> : 
                <RegistrationWrapper 
                style={style} 
                setArea={setArea} 
                setCity={setCity} 
                city={city} 
                area={area}/>
             })}
            </div>
            <Footer currentPage={currentPage} setCurrentPage={setCurrentPage}/>
        </div>
    )
}