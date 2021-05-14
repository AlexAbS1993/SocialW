import classes from './Microservices.module.css'
import React, { FC, useState } from 'react'
import pict from '../../gif/cloud.svg'
import pict2 from '../../gif/sunny.svg'

const micros = [{
    href: "localhost:3000/home",
    img: pict
},
{
    href: "localhost:4000/home",
    img: pict2
},
]

export const Microservices: FC = () => {
    const [hovered, setHovered] = useState(false)
    const [hoveredIndex, setHoveredIndex] = useState(0)
    console.log(hovered)
    return (
        <div className={classes.wrapper} 
        onMouseLeave={(event) => {
            setHovered(false)
        }}
        onMouseEnter={(event) => {
            setHovered(true)
        }}
        >
            {micros.map((e, i) => {
                return (
                    <div 
                    onMouseEnter={(event) => {
                        setHoveredIndex(i)
                    }}
                    > 
                        <a href={e.href}>
                            <img src={e.img} className={`${i === hoveredIndex && hovered === true ? classes.imgHovered : ""}${hovered === true && i !== hoveredIndex ? classes.imgUnhovered : ""}${!hovered ? classes.imgStock : ""}`}/>
                        </a>
                    </div>
                )
            })}
        </div>
    )
}