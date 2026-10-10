function entra(quant){
    if(quant=='3'){
        document.getElementById('h4').style.display = 'none';
        document.getElementById('h5').style.display='none';
        document.getElementById('h6').style.display='none';
    }else if (quant =='4'){
        document.getElementById('h4').style.display = 'block';
        document.getElementById('h5').style.display='none';
        document.getElementById('h6').style.display='none';
    }else if (quant=='5'){
        document.getElementById('h4').style.display = 'block';
        document.getElementById('h5').style.display='block';
        document.getElementById('h6').style.display='none';
    }else if (quant == '6'){
        document.getElementById('h4').style.display = 'block';
        document.getElementById('h5').style.display='block';
        document.getElementById('h6').style.display='block';
    }
}
function desenha(){
    const quantidad = Number(document.getElementById('quant').value);

    let real = [];
    let imaginario = [];
    let maiorValor = 0;

    const canvas = document.getElementById('ag');
    const ctx = canvas.getContext('2d');
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    for (i = 0; i < quantidad; i++) {
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
    for (i = 0; i < quantidad; i++) {
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