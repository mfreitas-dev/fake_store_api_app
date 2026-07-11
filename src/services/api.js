const urlbase = "https://fakestoreapi.com";

function getHeaders(){
    const token = localStorage.getItem("token");
    return {
        "Content-Type": "application/json",
        ...(token && {"Authorization": `Bearer ${token}`})
    }
};

export async function get(final_da_url,sinal){
    const resposta = await fetch(`${urlbase}${final_da_url}`, {
        headers: getHeaders(),
        signal: sinal,
    });
    if(!resposta.ok){
        console.error(resposta);
        throw new Error(resposta.status);
    };

    return resposta.json()
};

export async function post(final_da_url, body) {
    const resposta = await fetch(`${urlbase}${final_da_url}`, {
        method: "POST",
        headers: getHeaders(),
        body: JSON.stringify(body)
    });
    if(!resposta.ok){
        console.error(resposta);
        throw new Error(resposta.status)
    };

    return resposta.json()
};