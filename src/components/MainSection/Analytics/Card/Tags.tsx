import { FC} from "react";
import classes from './Card.module.css'

type TagsPropsType = {
    e: {
        name: string,
        value: number
    }
}

export const Tags:FC<TagsPropsType> = ({e}) => {
    return (
        <div className={classes.inlineTag} 
        
        > {e.name}<div className={classes.inlineTagDetails}> {e.value} </div> </div>
    )
}