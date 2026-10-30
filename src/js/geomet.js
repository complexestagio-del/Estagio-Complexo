let quant = document.getElementById('quant').value;
function entra(quant) {
    if (quant == '3') {
        document.getElementById('h4').style.display = 'none';
        document.getElementById('h5').style.display = 'none';
        document.getElementById('h6').style.display = 'none';
    } else if (quant == '4') {
        document.getElementById('h4').style.display = 'block';
        document.getElementById('h5').style.display = 'none';
        document.getElementById('h6').style.display = 'none';
    } else if (quant == '5') {
        document.getElementById('h4').style.display = 'block';
        document.getElementById('h5').style.display = 'block';
        document.getElementById('h6').style.display = 'none';
    } else if (quant == '6') {
        document.getElementById('h4').style.display = 'block';
        document.getElementById('h5').style.display = 'block';
        document.getElementById('h6').style.display = 'block';
    }
}

function resolucao() {
    let quant = document.getElementById('quant').value;
    let linha = [];
    switch (quant) {
        case '3':
            const coordenadas = [
                [
                    Number(document.getElementById('a1').value),//a1
                    Number(document.getElementById('b1').value),//b1
                    1
                ],
                [
                    Number(document.getElementById('a2').value),//a2
                    Number(document.getElementById('b2').value),//b2
                    1
                ],
                [
                    Number(document.getElementById('a3').value),//a3
                    Number(document.getElementById('b3').value),//b3
                    1
                ]
            ];
            //se o determinante for 0, os pontos estão alinhados
            linha.push('<p>Em geometria analítica, se os pontos de Z1, Z2 e Z3 não estão alinhados, eles formam um triângulo. A sua área pode ser calculada separando os valores reais e imaginários em uma matriz 3x3:</p>');
            linha.push(`
                <table class="solve">
                    <tr>
                        <td>a1</td>
                        <td>b1</td>
                        <td>1</td>
                    </tr>
                    <tr>
                        <td>a2</td>
                        <td>b2</td>
                        <td>1</td>
                    </tr>
                    <tr>
                        <td>a3</td>
                        <td>b3</td>
                        <td>1</td>
                    </tr>
                </table>`);
                linha.push(`<p>Colocando os valores dentro da matriz:</p><table class="solve">`);
                for (let i = 0; i < quant; i++) {
                    linha.push(`
                        <tr>
                            <td>${coordenadas[i][0]}</td>
                            <td>${coordenadas[i][1]}</td>
                            <td>${coordenadas[i][2]}</td>
                        </tr>
                    `);
                }
                const lado1 = (coordenadas[0][0] * coordenadas[1][1] * coordenadas[2][2]) + (coordenadas[0][1] * coordenadas[2][1] * coordenadas[0][2]) + (coordenadas[2][0] * coordenadas[0][1] * coordenadas[1][2]);
                const lado2 = (coordenadas[0][2] * coordenadas[1][1] * coordenadas[2][0]) + (coordenadas[1][2] * coordenadas[2][1] * coordenadas[0][0]) + (coordenadas[2][2] * coordenadas[0][1] * coordenadas[1][0]);
                const det=lado1 - lado2
                const area = det / 2; //area: determinante/2
                linha.push(`</table><br>
                <p>Utilizando a regra de sarrus, calculamos o determinante. Se o ele for igual a zero, significa que os pontos estão alinhados. Senão, dividimos o determinante por 2 para descobrir a área.</p>    
                <p>O determinante resultou em <b>${det}</b>.`);
                if(det==0){
                    linha.push(" Portanto, os pontos estão alinhados.</p>");
                }else{
                    linha.push(` Portanto, os pontos NÃO estão alinhados, e a área resultou em <b>${Math.abs(area)}</b></p>`);
                }
                return linha.join("");
        case '4':
            //a fazer
        case '5':
            //a fazer
        case '6':
            //a fazer
            //posso trocar para um default ja que eles todos usam a fórmula do cadarço
    }
}

function area() {
    let quant = document.getElementById('quant').value;
    let coordenadas = [];
    switch (quant) {
        case '3':
            for (let i = 0; i < quant; i++) {
                coordenadas[i] = [
                    Number(document.getElementById('a' + (i + 1)).value),
                    Number(document.getElementById('b' + (i + 1)).value),
                    1
                ];
            }
            const lado1 = (coordenadas[0][0] * coordenadas[1][1] * coordenadas[2][2]) + (coordenadas[0][1] * coordenadas[2][1] * coordenadas[0][2]) + (coordenadas[2][0] * coordenadas[0][1] * coordenadas[1][2]);
            const lado2 = (coordenadas[0][2] * coordenadas[1][1] * coordenadas[2][0]) + (coordenadas[1][2] * coordenadas[2][1] * coordenadas[0][0]) + (coordenadas[2][2] * coordenadas[0][1] * coordenadas[1][0]);
            const area = (lado1 - lado2) / 2; //area = determinante/2
            document.getElementById("result").innerHTML=resolucao();
            return area;
        default:
            //https://stackoverflow.com/a/33670691 -> if you are reading this, thank you so much lmao
            //fórmula do cadarço
            var ac = 0;
            for (let i = 0; i < quant; i++) {
                coordenadas[i] = criarPonto(
                    Number(document.getElementById('a' + (i + 1)).value),
                    Number(document.getElementById('b' + (i + 1)).value)
                );
            }
            for (var i = 0, c = coordenadas.length; i < c; i++) {
                var a1 = coordenadas[i].x; //ponto a atual
                var b2 = coordenadas[i == coordenadas.length - 1 ? 0 : i + 1].y; //ponto b do PRÓXIMO. vê se i for o indice da ultima coordenada 
                var a2 = coordenadas[i == coordenadas.length - 1 ? 0 : i + 1].x; //ponto a do próximo. vê se i for o indice da ultima coordenada 
                var b1 = coordenadas[i].y;// ponto b atual
                ac += (a1 * b2 -a2 * b1) * 0.5;
            }
            return Number(Math.abs(ac));
    }
}

function desenha() {
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
    document.getElementById('result').style.display = 'block';
    document.getElementById('area').innerHTML = area();
    //return resultado;
}