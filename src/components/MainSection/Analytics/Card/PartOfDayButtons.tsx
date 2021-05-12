import classes from "./Card.module.css"
import { FC } from "react"
import { analyticsType } from "../../../../store/cityReducer"

type PartOfDayButtonsPropsType = {
    analytics: analyticsType,
    setCurrentPartOfDay: React.Dispatch<React.SetStateAction<"morning" | "afternoon" | "night" | "evening" | undefined>>,
    currentPartOfDay: string
}


export const PartOfDayButtons:FC<PartOfDayButtonsPropsType> = ({analytics, setCurrentPartOfDay, currentPartOfDay}) => {
    return (
        <>
        {analytics.night.temperament && <button onClick={() => {setCurrentPartOfDay("night")}} 
        className={currentPartOfDay === "night" ? classes.activeButton : classes.simpleButton}> Ночь </button>}
        {analytics.morning.temperament && <button onClick={() => {setCurrentPartOfDay("morning")}} 
        className={currentPartOfDay === "morning" ? classes.activeButton : classes.simpleButton}> Утро </button>}
        {analytics.afternoon.temperament && <button onClick={() => {setCurrentPartOfDay("afternoon")}} 
        className={currentPartOfDay === "afternoon" ? classes.activeButton : classes.simpleButton}> День </button>}
        {analytics.evening.temperament && <button onClick={() => {setCurrentPartOfDay("evening")}} 
        className={currentPartOfDay === "evening" ? classes.activeButton : classes.simpleButton}> Вечер </button>}
        </>
    )
}