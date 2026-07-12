import { useMemo } from "react";
import { useCarrinho } from "../contexts/CarrinhoContext";
import { Link } from "react-router-dom";

export function Carrinho(){
    const {state, dispatch} = useCarrinho();
    const valortotal = useMemo(() => 
        state.reduce((acumulador, item) => {return ((item.price)*(item.quantidade)) + acumulador}, 0)
    , [state]);

    function handleButton(action, item){
        if(action === "remover"){
            dispatch({type: "REMOVER", payload: item.id})
        } else if(action === "aumentar_quantidade"){
            dispatch({type: "ALTERAR_QUANTIDADE", 
                payload: { ...item, quantidade: item.quantidade + 1 }})
        } else if(action === "diminuir_quantidade"){
            dispatch({type: "ALTERAR_QUANTIDADE", 
                payload: { ...item, quantidade: item.quantidade - 1 }})
        } else if(action === "limpar"){
            dispatch({type: "LIMPAR"})
        }
    };

    return (
        <div className="carrinho_page">
            {(state.length === 0) 
            ? <p>Carrinho vazio</p>
            : state.map((item) => (
                <div className="cardcarrinho" key={item.id}>
                    <p>Item: {item.title}</p>
                    <p>Valor unitário: R${item.price}</p>
                    <p>Quantidade: {item.quantidade}</p>
                    <button onClick={() => handleButton("aumentar_quantidade", item)}>+</button>
                    <button onClick={() => handleButton("diminuir_quantidade", item)}>-</button>
                    <p>Valor total do item: R${(item.price)*(item.quantidade)}</p>
                    <button onClick={() => handleButton("remover", item)}>REMOVER</button>
                </div>
                ))
            }
            {(state.length !== 0) &&
            <>
                <p className="valortotal">Valor total: R${valortotal}</p>
                <Link to={"/checkout"}><button>FINALIZAR COMPRA</button></Link>
            </>}
        </div>
    )
};