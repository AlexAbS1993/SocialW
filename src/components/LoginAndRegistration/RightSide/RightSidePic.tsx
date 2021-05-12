import classes from './RigthSide.module.css'
import React, { FC } from 'react'
import scene from '../../../assets/pict/rightSidePic.jpg'
import {animated} from 'react-spring'

type RightSideWrapperType = {
    style: any
}

export const RightSidePic:FC<RightSideWrapperType> = ({style}) => {
    return(
        <animated.div className={classes.wrapper} style={style}>
            <div className={classes.innerImgWrapper}>
                <img alt="Иконки различной погоды" src={scene} className={classes.sceneImg}/>
            </div>
        </animated.div>
    )
}