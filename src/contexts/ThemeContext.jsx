/* eslint-disable react-refresh/only-export-components */
import { createContext, useContext, useState } from "react";

const ThemeContext = createContext(null);

export function ThemeProvider({children}){
    const [TemaClaro, setTemaClaro] = useState(true);

    return (
        <ThemeContext.Provider value={{TemaClaro, setTemaClaro}}>
            {children}
        </ThemeContext.Provider>
    )
};

export function useTheme(){
    const contextoTema = useContext(ThemeContext);
    if(!contextoTema){
        throw new Error("O useTheme deve ser usado dentro do seu provider")
    };
    return contextoTema
};