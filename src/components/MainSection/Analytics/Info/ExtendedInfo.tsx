import { useSelector } from "react-redux"
import {FC} from 'react'
import { analyticsType } from "../../../../store/cityReducer"

type ExtendedInfoType = {
    currentDay: {
        value: string, 
        index: number
    },
    analytics: analyticsType[],
    currentPartOfDay: "morning" | "afternoon" | "night" | "evening"
}

export const ExtendedInfo:FC<ExtendedInfoType> = ({currentDay, analytics, currentPartOfDay}) => {
    return (
        <p>
            Люди говорят: {
            analytics[currentDay.index][currentPartOfDay].temperament?.sense.map((e, i, array) => {
                if ( i < 4){
                    return `${e.name}${i !== array.length-1 ? ', ' : ""}`
                } 
            })}
        </p>
    )
}