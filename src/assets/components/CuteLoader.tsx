import { FC } from 'react'
import classes from './Loader.module.css'

export const CuteLoader:FC = () => {
    return (
        <div className={classes.loader}>
            <div className={classes.borderLoader}> </div>
        </div>
    )
}