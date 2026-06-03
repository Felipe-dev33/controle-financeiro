console.log("Script carregado com sucesso!");

const transacoes = JSON.parse(localStorage.getItem("transacoes")) || [];

const tipo = document.getElementById("tipo");
const saldo = document.getElementById("saldo");
const descricao = document.getElementById("descricao");
const valor = document.getElementById("valor");
const btnAdicionar = document.getElementById("btnAdicionar");
const listaTransacoes = document.getElementById("listaTransacoes");

const formatarMoeda = (valor) => {
    return new Intl.NumberFormat('pt-BR', {
        style: 'currency',
        currency: 'BRL'
    }).format(valor);
};

function salvarTransacoes() {
    localStorage.setItem("transacoes", JSON.stringify(transacoes));
}

function atualizarSaldo() {
    const saldoAtual = transacoes.reduce((total, transacao) => {
        if (transacao.tipo === "entrada") {
            return total + transacao.valor;
        } else {
            return total - transacao.valor;
        }
    }, 0);

    saldo.textContent = `R$ ${saldoAtual}`;
}

function renderizarTransacoes() {
    listaTransacoes.innerHTML = "";

    transacoes.forEach((transacao) => {
        const item = document.createElement("li");

        item.innerHTML = `
            ${transacao.tipo.toUpperCase()} - ${transacao.descricao}: R$ ${transacao.valor}
            <button onclick="deletarTransacao(${transacao.id})">X</button>
        `;

        listaTransacoes.appendChild(item);
    });
}

function deletarTransacao(id) {
    const index = transacoes.findIndex(t => t.id === id);

    transacoes.splice(index, 1);

    salvarTransacoes();
    renderizarTransacoes();
    atualizarSaldo();
}

btnAdicionar.addEventListener("click", () => {
    const transacao = {
        id: Date.now(),
        descricao: descricao.value.trim(),
        valor: Number(valor.value),
        tipo: tipo.value
    };

    transacoes.push(transacao);

    salvarTransacoes();
    renderizarTransacoes();
    atualizarSaldo();

    descricao.value = "";
    valor.value = "";
});

renderizarTransacoes();
atualizarSaldo();