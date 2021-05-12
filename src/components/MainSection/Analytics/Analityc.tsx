import { animated, SpringValue } from 'react-spring'
import React, {FC, useCallback, useEffect, useMemo, useState} from 'react'
import classes from './Analytics.module.css'
import { useDispatch, useSelector } from 'react-redux'
import { ThunkAppDispatch } from '../../../store/authReducer'
import { RootState } from '../../../store/store'
import { analyticsType, cityGetAnalitics, getAnalyticsThunk } from '../../../store/cityReducer'
import { Loader } from '../../../assets/components/Loader'
import { NavButton } from './NavigationButtons'
import { ExtendedInfo } from './Info/ExtendedInfo'
import { CardWrapper } from './Card/CardWrapper'

type AnalitycsPropsType  = {
    style: {
        opacity: SpringValue<number>;
    },
}

export const AnalyticsWrapper:FC<AnalitycsPropsType> = ({style}) => {
    const dispatch = useDispatch<ThunkAppDispatch>()
   
    const initialized = useSelector<RootState, boolean>(state => state.city.initialize)
    useEffect(() => {
        dispatch(getAnalyticsThunk())
        return () => {cityGetAnalitics([])
        }
    }, [dispatch])
    return (
        <animated.div className={classes.wrapper} style={style}>
                 {initialized ?  <AnalitycInner />: <Loader />}
        </animated.div>
    )
}



const AnalitycInner = () => {
    const [currentDay, setCurrentDay] = useState({
        value: "",
        index: 0
    })
    const [currentPartOfDay, setCurrentPartOfDay] = useState<"morning" | "afternoon" | "night" | "evening">()
    useEffect(() => {
        let hour = new Date().getHours()
        
        if(hour >= 5 && hour <= 12){
            setCurrentPartOfDay("morning")
        }
        else if (hour > 12 && hour <= 17){
            setCurrentPartOfDay("afternoon")
        }
        else if (hour > 17 && hour <=23){
            setCurrentPartOfDay("evening")
        }
        else {
            setCurrentPartOfDay("night")
        } 
}, [currentDay])

    const analytics = useSelector<RootState, analyticsType[]>(state => state.city.analytics)
    const datesArray:{index:number, date:string, day: string}[] = useMemo(() => {
        return analytics.map((e, i) => {
            let date = new Date(e.date)
            let month = date.getMonth() + 1
            let day = date.getDate()
            return {index: i, day: String(day), date: `${day}/${month}`}})}, [analytics])

            useEffect(() => {
                if (datesArray.length !== 0){
                    setCurrentDay({
                        value: datesArray[datesArray.length-1].date,
                        index: datesArray[datesArray.length-1].index
                    })
                }
            }, [datesArray])
    return (
        <div className={classes.formWrapper}>
                     <div><h3>Погода сейчас</h3></div>{
                         (analytics.length > 0 && currentPartOfDay !== undefined) ?
                         <>
                         <CardWrapper 
                         analytics={analytics[currentDay.index]}
                         currentPartOfDay={currentPartOfDay} 
                         setCurrentPartOfDay={setCurrentPartOfDay}/>
                         <NavButton setCurrentDay={setCurrentDay} datesArray={datesArray} currentDay={currentDay}/> 
                         <div className={classes.extendedInfo}>
                             <ExtendedInfo currentDay={currentDay} analytics={analytics} currentPartOfDay={currentPartOfDay}/>
                         </div>
                         </> : 
                         "Извините, аналитики по вашему городу пока нет"
                     }
                 </div>
    )
}