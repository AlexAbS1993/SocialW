import classes from "./Card/Card.module.css";
import { FC } from "react";
import { analyticsType } from "../../../store/cityReducer";


type NavButtonPropsType = {
    setCurrentDay: React.Dispatch<React.SetStateAction<{
        value: string;
        index: number;
    }>>
    datesArray: {
        date: string,
        index: number,
        day: string
    }[]
    currentDay: {
        value: string;
        index: number;
    }
}

export const NavButton:FC<NavButtonPropsType> = ({setCurrentDay, datesArray, currentDay}) => {
    const buttonsList = datesArray.map((e, i) => {
        return <button key={e.day} onClick={() => {setCurrentDay({value: e.date, index: e.index})}} 
        className={currentDay.value === e.date ? classes.activeButton : classes.simpleButton}>{e.date}</button>
    })
    return (
        <div>
            {buttonsList}
        </div>
    )
}