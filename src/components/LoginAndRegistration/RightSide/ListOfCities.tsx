import classes from './RigthSide.module.css'
import React, { FC, ReactNode } from 'react'

type citiesListType = {
    citiesList: ReactNode,
}

export const ListOfCities:FC<citiesListType> = ({citiesList}) => {
    return (
        <ul className={classes.ulWrapper}>
            {citiesList}
        </ul>
    )
}