import { FC, useEffect, useState } from "react";
import { analyticsType } from "../../../../store/cityReducer";
import classes from './Card.module.css'
import { PartOfDayButtons } from "./PartOfDayButtons";
import { Tags } from "./Tags";

type CardWrapperPropsType = {
    analytics: analyticsType,
    currentPartOfDay: "morning" | "afternoon" | "night" | "evening",
    setCurrentPartOfDay: React.Dispatch<React.SetStateAction<"morning" | "afternoon" | "night" | "evening" | undefined>>
}

export const CardWrapper:FC<CardWrapperPropsType> = ({analytics,currentPartOfDay, setCurrentPartOfDay}) => {


    return (
        <div className={`${classes.wrapper} ${currentPartOfDay && classes[currentPartOfDay]}`}>
            <div className={classes.navDayButtons}>
               {currentPartOfDay && <PartOfDayButtons analytics={analytics} setCurrentPartOfDay={setCurrentPartOfDay} currentPartOfDay={currentPartOfDay}/>} 
            </div>
            {currentPartOfDay && <>
            <div className={classes.title}>
                {
                    analytics[currentPartOfDay].temperature !== undefined || analytics[currentPartOfDay].temperature !== null ? 
                    <h2>{Number(analytics[currentPartOfDay].temperature) > 0 
                        ? `+${analytics[currentPartOfDay].temperature.toFixed(0)}`:analytics[currentPartOfDay].temperature}</h2> 
                        : "Информации о температуре пока нет"
                }
                
            </div>
            <div className={classes.usually}>
                {
                    analytics[currentPartOfDay].temperament 
                    ? <p>Погода {analytics[currentPartOfDay].temperament.usually ? "обычная" : "необычная"} для этой даты и времени дня</p>
                    : "Информации о характере погоды пока нет"
                }
            </div>
            <div>
                <div className={classes.tagsWrapper}>
                {   
                    analytics[currentPartOfDay].tags ?
                    analytics[currentPartOfDay].tags.map((e, i) => {
                        if (i < 4){
                        return <Tags e={e} key={e.name}/>}
                        }
                        )
                    : "Информации о тегах пока нет"      
                }
                </div>
            </div>
            </>
                }
        </div>
    )
}