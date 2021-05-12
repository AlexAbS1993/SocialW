import {FC, useEffect, useMemo, useState} from 'react'
import { howToRemains } from '../../../assets/howLongTimeRemains'


export const Remains = () => {
    const [toggle, setToggle] = useState(false)
    useEffect(() => {
        let a = setInterval(() => {
            setToggle(prev => !prev)
        }, 60000*60)
        return () => {
            clearInterval(a)
        }
    }, [])

    let remain = useMemo(() => {
        return howToRemains()
    }, [toggle])
    return (
        <p> Оставить мнение снова можно через {remain} ч.</p>
    )
}