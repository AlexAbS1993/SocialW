import { FC } from "react"
import { analyticsType } from "../../../../store/cityReducer"
import { Button } from "../../../../assets/components/Button"

type PartOfDayButtonsPropsType = {
    analytics: analyticsType,
    setCurrentPartOfDay: React.Dispatch<React.SetStateAction<"morning" | "afternoon" | "night" | "evening" | undefined>>,
    currentPartOfDay: string
}


export const PartOfDayButtons:FC<PartOfDayButtonsPropsType> = ({analytics, setCurrentPartOfDay, currentPartOfDay}) => {
    return (
        <>
        {analytics.night.temperament && <Button handler={() => {setCurrentPartOfDay("night")}} 
        active={currentPartOfDay === "night"} variant="small" text="Ночь"/>}
        {analytics.morning.temperament && <Button handler={() => {setCurrentPartOfDay("morning")}} 
        active={currentPartOfDay === "morning"} variant="small" text="Утро"/>}
        {analytics.afternoon.temperament && <Button handler={() => {setCurrentPartOfDay("afternoon")}} 
        active={currentPartOfDay === "afternoon"} variant="small" text="День"/>}
        {analytics.evening.temperament && <Button handler={() => {setCurrentPartOfDay("evening")}} 
        active={currentPartOfDay === "evening"} variant="small" text="Вечер"/>}
        </>
    )
}