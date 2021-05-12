import classes from "./Footer.module.css"
import React, { FC } from "react"

type footerType = {
    currentPage: "login" | "registration",
    setCurrentPage: React.Dispatch<React.SetStateAction<"login" | "registration">>
}
export const Footer:FC<footerType> = ({currentPage, setCurrentPage}) => {
    return (
        <footer>
            <div className={classes.wrapper}>
                <div className={classes.buttonWrapper}>
                    <button value="login" onClick={() => {setCurrentPage("login")}}> Войти на сайт </button>
                </div>
                <div className={classes.buttonWrapper}>
                    <button value="registration" onClick={() => {setCurrentPage("registration")}} > Регистрация </button>
                </div>
            </div>
        </footer>
    )
}