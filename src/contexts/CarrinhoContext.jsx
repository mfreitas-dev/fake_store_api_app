/* eslint-disable react-refresh/only-export-components */
import { createContext, useContext, useReducer } from "react";

const CarrinhoContext = createContext(null);

function reducer(state, action){
    switch(action.type){
        case "ADICIONAR": {
            const existe = state.find((item) => item.id === action.payload.id);
            if (existe) {
                return state.map((item) =>
                (item.id === action.payload.id)
                ? { ...item, quantidade: item.quantidade + 1 }
                : item
                )
            };
            return [...state, { ...action.payload, quantidade: 1 }]
        };

        case "REMOVER": return state.filter((item) => item.id !== action.payload);

        case "ALTERAR_QUANTIDADE": return state.map((item) => 
            (item.id === action.payload.id) 
            ? {...item, quantidade: action.payload.quantidade} 
            : item
        );

        case "LIMPAR": return [];
    }
};

export function CarrinhoProvider({children}){
    const [state, dispatch] = useReducer(reducer, []);

    return (
        <CarrinhoContext.Provider value={{state, dispatch}}>
            {children}
        </CarrinhoContext.Provider>
    )
};

export function useCarrinho(){
    const contextoProdutos = useContext(CarrinhoContext);
    if(!contextoProdutos){
        throw new Error("useProdutos deve ser usados dentro do CarrinhoProvider")
    };
    return contextoProdutos
};