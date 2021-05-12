import classes from './MainSection.module.css'
import {FC, useEffect, useState} from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { AppDispatch, RootState } from '../../store/store'
import {useTransition, animated} from 'react-spring'
import { WheaterAddWrapper } from './WheaterAdd/WheaterAddWrapper'
import { cityErrorAC, citySetNotificationAC } from '../../store/cityReducer'
import { AnalyticsWrapper } from './Analytics/Analityc'


export const MainSectionWrapper:FC = () => {
    const error = useSelector<RootState, string>(state => state.city.error)
    const notification = useSelector<RootState, string>(state => state.city.notification)
    const [currentPage, setCurrentPage] = useState<"add"|"get">("add")
    const itIsChangeAlready = useSelector<RootState, boolean>(state => state.city.itIsChangeNow)
    useEffect(() => {
        if (itIsChangeAlready){
            setCurrentPage("get")
        }
    }, [itIsChangeAlready])
    const transition = useTransition(currentPage, {
        from: {opacity: 0},
        enter: {opacity: 1, delay: 500},
        leave: {opacity: 0, config:{duration: 500}
    }}   
        )

    const errorTransition = useTransition(error, {
        from: {opacity: 0, transform: "translateX(100%)"},
        enter: {opacity: 1, transform: "translateX(0%)"},
        leave: {opacity: 0, transform: "translateX(100%)"}
    })
    const notTransition = useTransition(notification, {
        from: {opacity: 0, transform: "translateX(-100%)"},
        enter: {opacity: 1, transform: "translateX(0%)"},
        leave: {opacity: 0, transform: "translateX(-100%)"}
    })
    const dispatch = useDispatch<AppDispatch>()
    useEffect(() => {
        setTimeout(() => {
            dispatch(cityErrorAC(""))
            dispatch(citySetNotificationAC(""))
        },4000 )
    }, [error, notification])
    return (
        <>

            <div className={classes.wrapperForAll}>
                {errorTransition((style, item) => {
                return item && <animated.div style={style} className={classes.error}> {error} </animated.div>})}
                {notTransition((style, item) => {
                return item && <animated.div style={style} className={classes.notification}>{notification}</animated.div>
                })}        
                    <div className={classes.wrapper}>
                        <div>
                            <button onClick={() => {setCurrentPage("add")}} className={currentPage==="add" ? classes.activeButton : classes.simpleButton}> Поделитесь погодой </button>
                            <button onClick={() => {setCurrentPage("get")}}className={currentPage==="get" ? classes.activeButton : classes.simpleButton}> Узнайте погоду </button>
                        </div>
                        <div className={classes.middleWrapper}>
                        {
                            transition((style, item) => {
                                return item === "get" ?  <AnalyticsWrapper style={style}/> : <WheaterAddWrapper setCurrentPage={setCurrentPage} style={style} /> 
                            })
                        }
                        </div>
                    </div>        
         </div>
        
        </>
    )
}