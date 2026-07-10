const urlbase = "https://fakestoreapi.com";

function getHeaders(){
    const token = localStorage.getItem("token");
    return {
        "Content-Type": "application/json",
        ...(token && {"Authorization": `Bearer ${token}`})
    }
};

export async function get(final_da_url){
    const resposta = await fetch(`${urlbase}${final_da_url}`, {
        headers: getHeaders()
    });
    if(!resposta.ok){
        throw new Error(resposta.status)
    };

    return resposta.json()
};

export async function post(final_da_url, body) {
    const resposta = await fetch(`${urlbase}${final_da_url}`, {
        method: "POST",
        headers: getHeaders(),
        body: JSON.stringify(body)
    });
    if(resposta.ok){
        throw new Error(resposta.status)
    };

    return resposta.json()
};