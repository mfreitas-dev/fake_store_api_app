import { useMemo, useState } from "react";
import { useCarrinho } from "../contexts/CarrinhoContext";
import { useNavigate } from "react-router-dom";


export function Checkout(){
    const {state, dispatch} = useCarrinho();
    const valortotal = useMemo(() => 
        state.reduce((acumulador, item) => {return ((item.price)*(item.quantidade)) + acumulador}, 0)
    , [state]);
    const [nome, setNome] = useState("");
    const [logradouro, setLogradouro] = useState("");
    const [cep, setCep] = useState("");

    const navigate = useNavigate();

    function handleButton(){
        dispatch({type: "LIMPAR"});
        alert("COMPRA EFETUADA COM SUCESSO!");
        navigate("/");
    };

    return(
        <div className="checkoutpage">
            <p>ITENS:</p>
            {state.map((item) => (
                <div className="checkoutcard" key={item.id}>
                    <p>Item: {item.title}</p>
                    <p>Quantidade: {item.quantidade}</p>
                    <p>Subtotal: R${(item.price)*(item.quantidade)}</p>
                </div>
            ))}
            <p>Total: R${valortotal}</p>
            <form>
                <label>Seu Nome:</label>
                <input type="text" value={nome} onChange={(event) => setNome(event.target.value)} />
                <br/><label htmlFor="">Logradouro:</label>
                <input type="text" value={logradouro} onChange={(event) => setLogradouro(event.target.value)} />
                <br/><label htmlFor="">CEP:</label>
                <input type="text" value={cep} onChange={(event) => setCep(event.target.value)} />
            </form><button onClick={handleButton}>CONFIRMAR PEDIDO</button>
        </div>
    )
}