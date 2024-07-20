import { easeOut, spring } from "framer-motion"

export const fadeIn = (direction,delay)=>{
    return{
        hidden:{
            y:direction ==='up' ? 40 : direction === 'down'? -40:0,
            x:direction ==='left' ? 40 : direction === 'right'? -40:0,
            
        },
        show:{
            y:0,
            x:0,
            opacity:1,
            transition:{
                type:'tween',
                duration:1.5,
                delay:delay,
                ease:easeOut,
            }

        }
    }
}