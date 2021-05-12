import classes from './Wrapper.module.css'
import { FC, useEffect, useState } from 'react'
import { LeftSideWrapper } from './LeftSide/LeftSideWrapper'
import { RightSideWrapper } from './RightSide/RightSideWrapper'
import { useTransition } from '@react-spring/core'
import { RightSidePic } from './RightSide/RightSidePic'
import { useDispatch, useSelector } from 'react-redux'
import { AppDispatch, RootState } from '../../store/store'
import { registrationDoneAC, setErrorAC, setNotificationAC } from '../../store/authReducer'


export const LoginAndRegistrationWrapper:FC = () => {
    const isRegistrationDone = useSelector<RootState>(state => state.auth.registrationDone)
    const [currentPage, setCurrentPage] = useState<"login"|"registration">("login")
    const error = useSelector<RootState, string>(state => state.auth.error)
    const notification = useSelector<RootState, string>(state => state.auth.notification)
    const dispatch = useDispatch<AppDispatch>()
    useEffect(() => {
        if (isRegistrationDone){
            setCurrentPage("login")
        }
    }, [isRegistrationDone])
    useEffect(() => {
        if (currentPage === "login"){
            dispatch(registrationDoneAC(false))
        }
    }, [currentPage])
    useEffect(() => {
          let  a = setTimeout(() => {
                 dispatch(setErrorAC(""))
                 dispatch(setNotificationAC(""))
            }, 2000)
        return () => {
            clearTimeout(a)
        }
    }, [error, notification, dispatch])
    useEffect(() => {
        return () => {
            dispatch(setErrorAC(""))
            dispatch(setNotificationAC(""))
        }
    }, [dispatch])
    const [city, setCity] = useState<string>("")
    const [area, setArea] = useState<string>("")
    const transition = useTransition(currentPage, {
        from: {opacity: 0},
        enter: {opacity: 1, display: "grid", delay: 500},
        leave: {opacity: 0, config:{duration: 500}
    }}   
        )
    
    return (
        <div className={classes.wrapperForAll}>
            {error && <div className={classes.error}> {error} </div>}
            {notification && <div className={classes.notification}>{notification}</div>}
        <div className={classes.wrapper}>
            <section className={classes.section}>
                <LeftSideWrapper 
                currentPage={currentPage} 
                transition={transition} 
                setCurrentPage={setCurrentPage} 
                city={city} 
                area={area} 
                setCity={setCity} 
                setArea={setArea}/>
            </section>
            <div className={classes.line}></div>
            <section className={classes.section}>
                <div className={classes.rigthSideWrapper}>
                {transition((style, item) => {
                   return item === "registration" ? 
                   <RightSideWrapper 
                   style={style}
                   city={city} 
                   area={area} 
                    setCity={setCity} 
                    setArea={setArea}
                   /> : <RightSidePic style={style}/>
                })}

                </div>
            </section>
        </div>
        </div>
    )
}