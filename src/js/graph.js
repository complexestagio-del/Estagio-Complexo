//ADICIONAR/REMOVER EXPRESSAO:
var contador = 1;
function add() {
    contador++;
    const main = document.getElementById('main');
    const novaexpressao = document.createElement('p');
    novaexpressao.id = "z" + contador;
    novaexpressao.innerHTML = `Z${contador} = <input type="number" id="a${contador}"> + <input type="number" id="b${contador}">× i `;
    main.appendChild(novaexpressao);
    if (contador == 6) {
        document.getElementById('add').style.display = 'none';
    }
}
function remove() {
    const main = document.getElementById('main');
    main.removeChild(document.getElementById('z' + contador));
    contador--;
    if (contador < 6) {
        document.getElementById('add').style.display = 'block';
    }
}

// CRIACAO DO PONTO
function criarPonto(real, imaginario) {
    const ponto = {
        x: real,
        y: imaginario
    };
    return ponto;
}
// CRIACAO DO VETOR
function criarVetor(real, imaginario) {
    const origem = {
        x: 0,
        y: 0
    };
    const ponto = criarPonto(real, imaginario);
    const vetor = {
        origem,
        ponto
    };
    return vetor;
}
// CALCULO DO MODULO
function calcularModulo(real, imaginario) {
    const somaQuadrado =
        real ** 2 + imaginario ** 2;
    const modulo =
        Math.sqrt(somaQuadrado);
    document.getElementById('modulo').innerHTML = modulo;
    return modulo;
}
// CALCULO DO ARGUMENTO
function calcularArgumento(real, imaginario) {
    // O numero 0 + 0i nao possui argumento definido
    if (real === 0 && imaginario === 0) {
        document.getElementById('angulo').innerHTML = 'Não há';
        return null;
    }
    const argumentoRadianos = Math.atan2(imaginario, real);
    const argumentoGraus = argumentoRadianos * 180 / Math.PI;
    document.getElementById('anguloGraus').innerHTML = argumentoGraus;
    document.getElementById('anguloRad').innerHTML = argumentoRadianos;
    return argumentoGraus;
}
// DESCOBRE O QUADRANTE
function descobrirQuadrante(real, imaginario) {
    if (real > 0 && imaginario > 0) {
        document.getElementById('quad').innerHTML = 'Primeiro';
        return 1;
    }
    if (real < 0 && imaginario > 0) {
        document.getElementById('quad').innerHTML = "Segundo";
        return 2;
    }
    if (real < 0 && imaginario < 0) {
        document.getElementById('quad').innerHTML = 'Terceiro';
        return 3;
    }
    if (real > 0 && imaginario < 0) {
        document.getElementById('quad').innerHTML = 'Quarto';
        return 4;
    }
    // Se estiver sobre algum eixo ou na origem
    document.getElementById('quad').innerHTML = 'Nenhum';
    return 0;
}
// CALCULA UM INTERVALO ADEQUADO PARA OS EIXOS
function calcularIntervalo(maiorValor) {
    if (maiorValor === 0) {
        return 1;
    }
    // Queremos aproximadamente 5 divisoes
    const intervaloInicial = maiorValor / 5;
    // Descobre a ordem de grandeza
    const potencia = 10 ** Math.floor(Math.log10(intervaloInicial));
    const valorNormalizado = intervaloInicial / potencia;
    let intervalo;
    if (valorNormalizado <= 1) {
        intervalo = 1;
    } else if (valorNormalizado <= 2) {
        intervalo = 2;
    } else if (valorNormalizado <= 5) {
        intervalo = 5;
    } else {
        intervalo = 10;
    }
    return intervalo * potencia;
}
// FORMATA NUMEROS DOS EIXOS
function formatarNumero(valor) {
    // Evita valores como 0.30000000004
    const arredondado = Number(valor.toFixed(4));
    return arredondado;
}
// DESENHA A PONTA DA SETA
function desenharSeta(ctx, inicioX, inicioY, fimX, fimY) {
    const tamanho = 10;
    const angulo = Math.atan2(fimY - inicioY, fimX - inicioX);
    ctx.beginPath();
    ctx.moveTo(fimX, fimY);
    ctx.lineTo(fimX - tamanho * Math.cos(angulo - Math.PI / 6), fimY - tamanho * Math.sin(angulo - Math.PI / 6));
    ctx.moveTo(fimX, fimY);
    ctx.lineTo(fimX - tamanho * Math.cos(angulo + Math.PI / 6), fimY - tamanho * Math.sin(angulo + Math.PI / 6));
    ctx.stroke();
}
// DESENHA O GRAFICO
function desenharGrafico() {
    let real = [];
    let imaginario = [];
    const canvas = document.getElementById('ag');
    const ctx = canvas.getContext('2d');
    let maiorValor = 0;
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    for (i = 0; i < contador; i++) {
        real[i] = Number(document.getElementById('a' + (i + 1)).value);
        imaginario[i] = Number(document.getElementById('b' + (i + 1)).value);
        maiorValor = Math.max(maiorValor, Math.abs(real[i]), Math.abs(imaginario[i]));
    }
    const intervalo = calcularIntervalo(maiorValor);
    let limite = Math.ceil(maiorValor / intervalo) * intervalo;
    if (limite === 0) {
        limite = 5;
    }
    limite += intervalo;
    // CENTRO DO PLANO
    const centroX = canvas.width / 2;
    const centroY = canvas.height / 2;
    // ESCALA AUTOMATICA
    const margem = 50;
    const espacoX = centroX - margem;
    const espacoY = centroY - margem;
    const escalaX = espacoX / limite;
    const escalaY = espacoY / limite;
    const escala = Math.min(escalaX, escalaY);
    // CONFIGURACOES DO TEXTO
    ctx.font = "11px Arial";
    ctx.textBaseline = "middle";
    // EIXO REAL
    ctx.beginPath();
    ctx.moveTo(margem / 2, centroY);
    ctx.lineTo(canvas.width - margem / 2, centroY);
    ctx.stroke();
    // Seta positiva do eixo real
    ctx.beginPath();
    ctx.moveTo(canvas.width - margem / 2, centroY);
    ctx.lineTo(canvas.width - margem / 2 - 10, centroY - 5);
    ctx.moveTo(canvas.width - margem / 2, centroY);
    ctx.lineTo(canvas.width - margem / 2 - 10, centroY + 5);
    ctx.stroke();
    ctx.fillText("R", canvas.width - margem, centroY - 15);
    // EIXO IMAGINARIO
    ctx.beginPath();
    ctx.moveTo(centroX, canvas.height - margem / 2);
    ctx.lineTo(centroX, margem / 2);
    ctx.stroke();
    // Seta positiva
    ctx.beginPath();
    ctx.moveTo(centroX, margem / 2);
    ctx.lineTo(centroX - 5, margem / 2 + 10);
    ctx.moveTo(centroX, margem / 2);
    ctx.lineTo(centroX + 5, margem / 2 + 10);
    ctx.stroke();
    ctx.fillText("Im", centroX + 10, margem / 2 + 10);
    // MARCA A ORIGEM
    ctx.fillText("0", centroX - 15, centroY + 15);
    // MARCACOES DOS EIXOS
    for (let valor = intervalo; valor <= limite; valor += intervalo) {
        const distancia = valor * escala;
        // EIXO REAL POSITIVO
        const xPositivo = centroX + distancia;
        if (xPositivo < canvas.width - margem / 2) {
            ctx.beginPath();
            ctx.moveTo(xPositivo, centroY - 4);
            ctx.lineTo(xPositivo, centroY + 4);
            ctx.stroke();
            ctx.fillText(formatarNumero(valor), xPositivo - 5, centroY + 15);
        }
        // EIXO REAL NEGATIVO
        const xNegativo = centroX - distancia;
        if (xNegativo > margem / 2) {
            ctx.beginPath();
            ctx.moveTo(xNegativo, centroY - 4);
            ctx.lineTo(xNegativo, centroY + 4);
            ctx.stroke();
            ctx.fillText(formatarNumero(-valor), xNegativo - 8, centroY + 15);
        }
        // EIXO IMAGINARIO POSITIVO
        const yPositivo = centroY - distancia;
        if (yPositivo > margem / 2) {
            ctx.beginPath();
            ctx.moveTo(centroX - 4, yPositivo);
            ctx.lineTo(centroX + 4, yPositivo);
            ctx.stroke();
            ctx.fillText(formatarNumero(valor), centroX + 8, yPositivo);
        }
        // EIXO IMAGINARIO NEGATIVO
        const yNegativo = centroY + distancia;
        if (yNegativo < canvas.height - margem / 2) {
            ctx.beginPath();
            ctx.moveTo(centroX - 4, yNegativo);
            ctx.lineTo(centroX + 4, yNegativo);
            ctx.stroke();
            ctx.fillText(formatarNumero(-valor), centroX + 8, yNegativo);
        }
    }
    //cria os vetores
    let vetor = [];
    let texto = [];
    const pontoX = [];
    const pontoY = [];
    for (i = 0; i < contador; i++) {
        vetor[i] = criarVetor(real[i], imaginario[i]);
        pontoX[i] = centroX + vetor[i].ponto.x * escala;
        pontoY[i] = centroY - vetor[i].ponto.y * escala;
        if (real[i] !== 0 || imaginario[i] !== 0) {//desenha o vetor
            ctx.beginPath();
            ctx.moveTo(centroX, centroY);
            ctx.lineTo(pontoX[i], pontoY[i]);
            ctx.stroke();
            desenharSeta(ctx, centroX, centroY, pontoX[i], pontoY[i]);
        }
        // DESENHA O PONTO
        ctx.beginPath();
        ctx.arc(pontoX[i], pontoY[i], 5, 0, 2 * Math.PI);
        ctx.fill();
        // MONTA O TEXTO DO NUMERO COMPLEXO
        if (imaginario[i] < 0) {
            texto[i] = real[i] + " - " + Math.abs(imaginario[i]) + "i";
        } else {
            texto[i] = real[i] + " + " + imaginario[i] + "i";
        }
        // POSICAO DO TEXTO
        let textoX = pontoX[i] + 10;
        let textoY = pontoY[i] - 15;
        // Evita sair pela direita
        if (pontoX[i] > canvas.width - 120) {
            textoX = pontoX[i] - 100;
        }
        // Evita sair pela esquerda
        if (pontoX[i] < 100) {
            textoX = pontoX[i] + 10;
        }
        // Evita sair por cima
        if (pontoY[i] < 40) {
            textoY = pontoY[i] + 20;
        }
        // Evita sair por baixo
        if (pontoY[i] > canvas.height - 40) {
            textoY = pontoY[i] - 20;
        }
        ctx.fillText(texto[i], textoX, textoY);
        //calculos finais:
        const modulo = [];
        modulo[i] = calcularModulo(real[i], imaginario[i]);
        const argumento = [];
        argumento[i] = calcularArgumento(real[i], imaginario[i]);
        const quadrante = [];
        quadrante[i] = descobrirQuadrante(real[i], imaginario[i]);
        let resultado = [];
        resultado[i] = {
            real: real[i],
            imaginario: imaginario[i],
            ponto: vetor[i].ponto,
            vetor: vetor[i],
            modulo: Number(modulo[i].toFixed(2)),
            argumento: argumento === null ? null : Number(argumento).toFixed(2),
            quadrante: quadrante[i],
            intervalo: intervalo,
            escala: escala
        };
    }
    return resultado;
}