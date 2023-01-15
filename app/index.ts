const campoValorAtual: HTMLInputElement = <HTMLInputElement>document.getElementById("valorAtual")!;
const campoValorConv: HTMLInputElement = <HTMLInputElement>document.getElementById("valorConvertido")!;

const atualizaValores: Function = (): void => {
  const moedaValorAtual: HTMLSelectElement = <HTMLSelectElement>document.getElementById("tipoMoedaAtual")!;
  const moedaValorConv: HTMLSelectElement = <HTMLSelectElement>document.getElementById("tipoMoedaConvertida")!;

  cotacao(moedaValorAtual.value, moedaValorConv.value);
};

const cotacao: Function = (moedaAtual: string, moedaConversao: string): void => {
  const url = `https://economia.awesomeapi.com.br/json/last/${moedaConversao}-${moedaAtual}`;

  if (moedaAtual == moedaConversao) {
    campoValorConv.value = campoValorAtual.value;
  } else {
    fetch(url)
      .then((dados) => dados.json())
      .then((resposta) => resposta[`${moedaConversao}${moedaAtual}`])
      .then((detalhesApi) => detalhesApiCotacao(detalhesApi))
      .then((cotacao: DetalhesCotacao) => {
        const valorAtual: number = parseFloat(campoValorAtual.value);
        campoValorConv.value = (!valorAtual ? "0,00" : (valorAtual / cotacao.valorVenda).toFixed(2));
      })
      .catch((e) => console.log(e));
  }
};

const detalhesApiCotacao: Function = (api: retornoApi): object => {
  const detalhes = new DetalhesCotacao();
  detalhes.codigo = api.code;
  detalhes.valorCompra = parseFloat(api.bid);
  detalhes.valorVenda = parseFloat(api.ask);
  detalhes.variacao = api.varBid;

  return detalhes;
};

class DetalhesCotacao {
  codigo: string;
  valorVenda: number;
  valorCompra: number;
  variacao: string;
}

type retornoApi = {
  ask: string;
  bid: string;
  code: string;
  codein: string;
  create_date: string;
  high: string;
  name: string;
  pctChange: string;
  timestamp: string;
  varBid: string;
};