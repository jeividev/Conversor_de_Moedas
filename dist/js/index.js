const campoValorAtual = document.getElementById("valorAtual");
const campoValorConv = document.getElementById("valorConvertido");
const atualizaValores = () => {
    const moedaValorAtual = document.getElementById("tipoMoedaAtual");
    const moedaValorConv = document.getElementById("tipoMoedaConvertida");
    cotacao(moedaValorAtual.value, moedaValorConv.value);
};
const cotacao = (moedaAtual, moedaConversao) => {
    const url = `https://economia.awesomeapi.com.br/json/last/${moedaConversao}-${moedaAtual}`;
    if (moedaAtual == moedaConversao) {
        campoValorConv.value = campoValorAtual.value;
    }
    else {
        fetch(url)
            .then((dados) => dados.json())
            .then((resposta) => resposta[`${moedaConversao}${moedaAtual}`])
            .then((detalhesApi) => detalhesApiCotacao(detalhesApi))
            .then((cotacao) => {
            const valorAtual = parseFloat(campoValorAtual.value);
            campoValorConv.value = (!valorAtual ? "0,00" : (valorAtual / cotacao.valorVenda).toFixed(2));
        })
            .catch((e) => console.log(e));
    }
};
const detalhesApiCotacao = (api) => {
    const detalhes = new DetalhesCotacao();
    detalhes.codigo = api.code;
    detalhes.valorCompra = parseFloat(api.bid);
    detalhes.valorVenda = parseFloat(api.ask);
    detalhes.variacao = api.varBid;
    return detalhes;
};
class DetalhesCotacao {
}
