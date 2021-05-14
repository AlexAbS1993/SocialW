import classes from "./Card/Card.module.css";
import { FC } from "react";
import { analyticsType } from "../../../store/cityReducer";
import { Button } from "../../../assets/components/Button";


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
        return <Button key={e.day} handler={() => {setCurrentDay({value: e.date, index: e.index})}} active={currentDay.value === e.date} text={e.date}/>
    })
    return (
        <div>
            {buttonsList}
        </div>
    )
}