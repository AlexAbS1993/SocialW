import classes from "./Footer.module.css"
import React, { FC } from "react"
import { Button } from "../../../../assets/components/Button"

type footerType = {
    currentPage: "login" | "registration",
    setCurrentPage: React.Dispatch<React.SetStateAction<"login" | "registration">>
}
export const Footer:FC<footerType> = ({currentPage, setCurrentPage}) => {
    return (
        <footer>
            <div className={classes.wrapper}>
                <div className={classes.buttonWrapper}>
                    <Button type="button" text="Войти на сайт" handler={() => {setCurrentPage("login")}}/>
                </div>
                <div className={classes.buttonWrapper}>
                    <Button type="button" text="Регистрация" handler={() => {setCurrentPage("registration")}}/>
                </div>
            </div>
        </footer>
    )
}