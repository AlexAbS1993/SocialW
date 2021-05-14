import classes from './Header.module.css'
import rain from '../../assets/gif/rain.svg'
import cloud from '../../assets/gif/cloud.svg'
import sunny from '../../assets/gif/sunny.svg'
import { NavLink } from 'react-router-dom'
import { Microservices } from '../../assets/components/Microservices/Microservices'

const icons = [rain, cloud, sunny]

export const Header = () => {
    return (
        <div className={classes.wrapper}>
            <Microservices />
            <div className={classes.iconWrapper}> <img src={icons[Math.floor(Math.random() * icons.length)]} alt="анимация погоды"/></div>
            <div className={classes.title}><NavLink to="/home"><h1>The Social Weather</h1></NavLink></div>
        </div>
    )  
}