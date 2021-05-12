import React, { FC, useEffect, useMemo } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { RootState } from '../../../store/store'
import {citiesType, getCitiesThunk} from '../../../store/cityReducer'
import classes from './RigthSide.module.css'
import { ThunkAppDispatch } from '../../../store/authReducer'
import { ListOfCities } from './ListOfCities'
import { Loader } from '../../../assets/components/Loader'
import {animated, SpringValue} from 'react-spring'
import {citiesAndAreas} from '../../../assets/RussianCity'

type RightSideWrapperType = {
    style: {opacity: SpringValue<number>},
    area: string,
    city: string,
    setCity: React.Dispatch<React.SetStateAction<string>>,
    setArea: React.Dispatch<React.SetStateAction<string>>
}

export const RightSideWrapper: FC<RightSideWrapperType> = ({style, area, setArea, city, setCity}) => {
    const dispatchThunk = useDispatch<ThunkAppDispatch>()
    useEffect(() => {
        dispatchThunk(getCitiesThunk())
    }, [dispatchThunk])
    const cities = useSelector<RootState, citiesType[]>(state => state.city.cities)
    const isLoading = useSelector<RootState, boolean>(state => state.city.isLoading)
    const citiesList = useMemo(() => {
        if (city.length > 0){
           return citiesAndAreas.concat(cities).filter(e => new RegExp("^" + city, "i").test(e.name)).map(e => {
                return <li key={`${e.name}${e.area}`} onClick={() => {setCity(e.name); setArea(e.area)}}>{e.name}, <small>{e.area}</small></li>
            })
        }
    }, [city])
    

    return (
        <animated.div className={classes.wrapper} style={style}>
            <div className={classes.innerWrapper}>
                <div className={classes.title}><h2>Города</h2></div>
                 {isLoading ? <Loader /> : <ListOfCities citiesList={citiesList}/>}
            </div>
        </animated.div>
    )
}