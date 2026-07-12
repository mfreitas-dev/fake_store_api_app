import { useMemo } from "react";
import { useCarrinho } from "../contexts/CarrinhoContext";
import { Link } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import { formatarMoeda } from "../utils/formatarMoeda";

export function Carrinho(){
    const {state, dispatch} = useCarrinho();
    const valortotal = useMemo(() => 
        state.reduce((acumulador, item) => {return ((item.price)*(item.quantidade)) + acumulador}, 0)
    , [state]);
    const {usuario} = useAuth();

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
            ?   <div className="estado_vazio">
                    <svg xmlns="http://www.w3.org/2000/svg" width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round">
                        <circle cx="9" cy="21" r="1"/>
                        <circle cx="20" cy="21" r="1"/>
                        <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"/>
                    </svg>
                    <p>Seu carrinho está vazio.</p>
                    <p className="estado_vazio_sub">Explore nossos produtos e adicione itens ao carrinho.</p>
                </div>
            : state.map((item) => (
                <div className="cardcarrinho" key={item.id}>
                    <p>Item: {item.title}</p>
                    <p>Valor unitário: {formatarMoeda(item.price)}</p>
                    <div className="item_quantidade">
                    <p>Quantidade: {item.quantidade}</p>
                    <button onClick={() => handleButton("aumentar_quantidade", item)} className="btn_mais">+</button>
                    <button onClick={() => handleButton("diminuir_quantidade", item)} className="btn_menos">-</button>
                    </div>
                    <p>Valor total do item: {formatarMoeda((item.price)*(item.quantidade))}</p>
                    <button onClick={() => handleButton("remover", item)} className="btn_remover">REMOVER</button>
                </div>
                ))
            }
            {(state.length !== 0) &&
            <>
                <br/><br/><p className="valortotal">Valor total: {formatarMoeda(valortotal)}</p>
                <div className="carrinho_actions">
                <button onClick={() => handleButton("limpar")} className="btn_secundario">LIMPAR CARRINHO</button>
                <Link to={(usuario) ? "/checkout" : "/login"}><button className="btn_primario">FINALIZAR COMPRA</button></Link>
                </div>
            </>}
        </div>
    )
};