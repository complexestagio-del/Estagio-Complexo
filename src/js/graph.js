// CRIACAO DO PONTO
var contador = 1;
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
    const argumentoRadianos =
    Math.atan2(imaginario, real);
    const argumentoGraus =
    argumentoRadianos * 180 / Math.PI;
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
    const intervaloInicial =
        maiorValor / 5;
    // Descobre a ordem de grandeza
    const potencia =
        10 ** Math.floor(
            Math.log10(intervaloInicial)
        );
    const valorNormalizado =
        intervaloInicial / potencia;

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
    const arredondado = Number(valor.toFixed(10));
    return arredondado;
}
// DESENHA A PONTA DA SETA
function desenharSeta(
    ctx,
    inicioX,
    inicioY,
    fimX,
    fimY
) {
    const tamanho = 10;
    const angulo = Math.atan2(
        fimY - inicioY,
        fimX - inicioX
    );
    ctx.beginPath();
    ctx.moveTo(
        fimX,
        fimY
    );
    ctx.lineTo(
        fimX -
        tamanho *
        Math.cos(angulo - Math.PI / 6),

        fimY -
        tamanho *
        Math.sin(angulo - Math.PI / 6)
    );
    ctx.moveTo(
        fimX,
        fimY
    );
    ctx.lineTo(
        fimX -
        tamanho *
        Math.cos(angulo + Math.PI / 6),
        fimY -
        tamanho *
        Math.sin(angulo + Math.PI / 6)
    );
    ctx.stroke();
}
// DESENHA O GRAFICO
function desenharGrafico(real, imaginario) {
    // Converte os valores recebidos para numero
    real = Number(real);
    imaginario = Number(imaginario);
    // VALIDACAO
    if (
        !Number.isFinite(real) ||
        !Number.isFinite(imaginario)
    ) {
        console.log(
            "Digite valores numericos validos."
        );

        return null;
    }
    const canvas =
        document.getElementById("ag");

    if (!canvas) {
        console.log(
            "Canvas nao encontrado."
        );
        return null;
    }
    const ctx =
        canvas.getContext("2d");
    // Limpa o grafico anterior
    ctx.clearRect(
        0,
        0,
        canvas.width,
        canvas.height
    );
    // CENTRO DO PLANO
    const centroX =
        canvas.width / 2;
    const centroY =
        canvas.height / 2;
    // DESCOBRE O TAMANHO NECESSARIO DO PLANO
    const maiorValor = Math.max(
        Math.abs(real),
        Math.abs(imaginario)
    );
    const intervalo =
        calcularIntervalo(maiorValor);
    // Garante espaco alem do ponto
    let limite =
        Math.ceil(
            maiorValor / intervalo
        ) * intervalo;
    // Se for 0 + 0i
    if (limite === 0) {
        limite = 5;
    }
    // Acrescenta uma divisao de margem
    limite += intervalo;
    // ESCALA AUTOMATICA
    const margem = 50;
    const espacoX =
        centroX - margem;

    const espacoY =
        centroY - margem;

    const escalaX =
        espacoX / limite;

    const escalaY =
        espacoY / limite;

    const escala =
        Math.min(
            escalaX,
            escalaY
        );
    // CONFIGURACOES DO TEXTO
    ctx.font = "12px Arial";
    ctx.textBaseline = "middle";
    // EIXO REAL
    ctx.beginPath();
    ctx.moveTo(
        margem / 2,
        centroY
    );
    ctx.lineTo(
        canvas.width - margem / 2,
        centroY
    );
    ctx.stroke();
    // Seta positiva do eixo real
    ctx.beginPath();
    ctx.moveTo(
        canvas.width - margem / 2,
        centroY
    );
    ctx.lineTo(
        canvas.width - margem / 2 - 10,
        centroY - 5
    );
    ctx.moveTo(
        canvas.width - margem / 2,
        centroY
    );
    ctx.lineTo(
        canvas.width - margem / 2 - 10,
        centroY + 5
    );
    ctx.stroke();
    ctx.fillText(
        "Real",
        canvas.width - margem,
        centroY - 15
    );
    // EIXO IMAGINARIO
    ctx.beginPath();
    ctx.moveTo(
        centroX,
        canvas.height - margem / 2
    );
    ctx.lineTo(
        centroX,
        margem / 2
    );
    ctx.stroke();
    // Seta positiva
    ctx.beginPath();
    ctx.moveTo(
        centroX,
        margem / 2
    );
    ctx.lineTo(
        centroX - 5,
        margem / 2 + 10
    );
    ctx.moveTo(
        centroX,
        margem / 2
    );
    ctx.lineTo(
        centroX + 5,
        margem / 2 + 10
    );
    ctx.stroke();
    ctx.fillText(
        "Imaginario",
        centroX + 10,
        margem / 2 + 10
    );
    // MARCA A ORIGEM
    ctx.fillText(
        "0",
        centroX - 15,
        centroY + 15
    );
    // MARCACOES DOS EIXOS
    for (
        let valor = intervalo;
        valor <= limite;
        valor += intervalo
    ) {
        const distancia =
            valor * escala;
        // EIXO REAL POSITIVO
        const xPositivo =
            centroX + distancia;
        if (
            xPositivo <
            canvas.width - margem / 2
        ) {
            ctx.beginPath();
            ctx.moveTo(
                xPositivo,
                centroY - 4
            );
            ctx.lineTo(
                xPositivo,
                centroY + 4
            );
            ctx.stroke();
            ctx.fillText(
                formatarNumero(valor),
                xPositivo - 5,
                centroY + 15
            );
        }
        // EIXO REAL NEGATIVO
        const xNegativo =
            centroX - distancia;
        if (
            xNegativo >
            margem / 2
        ) {
            ctx.beginPath();
            ctx.moveTo(
                xNegativo,
                centroY - 4
            );
            ctx.lineTo(
                xNegativo,
                centroY + 4
            );
            ctx.stroke();
            ctx.fillText(
                formatarNumero(-valor),
                xNegativo - 8,
                centroY + 15
            );
        }
        // EIXO IMAGINARIO POSITIVO
        const yPositivo =
            centroY - distancia;
        if (
            yPositivo >
            margem / 2
        ) {
            ctx.beginPath();
            ctx.moveTo(
                centroX - 4,
                yPositivo
            );
            ctx.lineTo(
                centroX + 4,
                yPositivo
            );
            ctx.stroke();
            ctx.fillText(
                formatarNumero(valor),
                centroX + 8,
                yPositivo
            );
        }
        // EIXO IMAGINARIO NEGATIVO
        const yNegativo =
            centroY + distancia;
        if (
            yNegativo <
            canvas.height - margem / 2
        ) {
            ctx.beginPath();
            ctx.moveTo(
                centroX - 4,
                yNegativo
            );
            ctx.lineTo(
                centroX + 4,
                yNegativo
            );
            ctx.stroke();
            ctx.fillText(
                formatarNumero(-valor),
                centroX + 8,
                yNegativo
            );
        }
    }
    // CRIA O VETOR
    const vetor =
        criarVetor(
            real,
            imaginario
        );
    // CONVERTE PARA COORDENADAS DO CANVAS
    const pontoX =
        centroX +
        vetor.ponto.x * escala;
    const pontoY =
        centroY -
        vetor.ponto.y * escala;
    // DESENHA O VETOR
    if (
        real !== 0 ||
        imaginario !== 0
    ) {
        ctx.beginPath();
        ctx.moveTo(
            centroX,
            centroY
        );
        ctx.lineTo(
            pontoX,
            pontoY
        );
        ctx.stroke();
        desenharSeta(
            ctx,
            centroX,
            centroY,
            pontoX,
            pontoY
        );
    }
    // DESENHA O PONTO
    ctx.beginPath();
    ctx.arc(
        pontoX,
        pontoY,
        5,
        0,
        2 * Math.PI
    );
    ctx.fill();
    // MONTA O TEXTO DO NUMERO COMPLEXO
    let texto;
    if (imaginario < 0) {
        texto =
            real +
            " - " +
            Math.abs(imaginario) +
            "i";
    } else {
        texto =
            real +
            " + " +
            imaginario +
            "i";
    }
    // POSICAO DO TEXTO
    let textoX =
        pontoX + 10;
    let textoY =
        pontoY - 15;
    // Evita sair pela direita
    if (
        pontoX >
        canvas.width - 120
    ) {
        textoX =
            pontoX - 100;
    }
    // Evita sair pela esquerda
    if (
        pontoX < 100
    ) {
        textoX =
            pontoX + 10;
    }
    // Evita sair por cima
    if (
        pontoY < 40
    ) {
        textoY =
            pontoY + 20;
    }
    // Evita sair por baixo
    if (
        pontoY >
        canvas.height - 40
    ) {
        textoY =
            pontoY - 20;
    }
    ctx.fillText(
        texto,
        textoX,
        textoY
    );
    // CALCULOS FINAIS
    const modulo = calcularModulo(real,imaginario);
    const argumento = calcularArgumento(real,imaginario);
    const quadrante = descobrirQuadrante(real,imaginario);
    // TRATA O ARGUMENTO
    let argumentoFinal = null;
    if (argumento !== null) {
        argumentoFinal = Number(argumento.toFixed(2));
    }
    // RESULTADO FINAL
    const resultado = {
        real: real,
        imaginario: imaginario,
        ponto: vetor.ponto,
        vetor: vetor,
        modulo: Number(modulo.toFixed(2)),
        argumento: argumentoFinal,
        quadrante: quadrante,
        intervalo: intervalo,
        escala: escala
    };
    return resultado;
}
//ADICIONAR/REMOVER EXPRESSAO:
function add(){
    contador++;
    const main=document.getElementById('main');
    const novaexpressao=document.createElement('p');
    //novaexpressao.id="z"+contador;
    novaexpressao.innerHTML= `Z${contador} = <input type="number" id="a${contador}"> + <input type="number" id="b${contador}">× i `;
    main.appendChild(novaexpressao);
}
// function remove(){
//     const main=document.getElementById('main');
//     main.removeChild(document.getElementById('z'+contador));
//     contador--;
// }