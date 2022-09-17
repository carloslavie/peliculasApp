/* eslint-disable react/react-in-jsx-scope */
import { createContext, useState } from 'react';

interface ImageColorsProps{
    primary: string;
    secondary:string;
}

interface ContextProps{
   colors: ImageColorsProps;
   prevColors: ImageColorsProps; 
   setMainColors: (colors: ImageColorsProps) => void; 
   setPrevMainColors: (colors: ImageColorsProps) => void;
}

export const GradientContext = createContext({} as ContextProps);

export const GradientProvider =({children}:any)=>{

    const [colors, setColors] = useState<ImageColorsProps>({
        primary: 'transparent',
        secondary: 'transparent',
    })
    const [prevColors, setPrevColors] = useState<ImageColorsProps>({
        primary: 'transparent',
        secondary: 'transparent',
    })

    const setMainColors = (color: ImageColorsProps)=>{
        setColors(color)
    }
    const setPrevMainColors = (color: ImageColorsProps)=>{
        setPrevColors(color)
    }

    return (
        <GradientContext.Provider
            value={{
                colors,
                prevColors,
                setMainColors,
                setPrevMainColors,
            }}
        >
            {children}
        </GradientContext.Provider>
    )
}