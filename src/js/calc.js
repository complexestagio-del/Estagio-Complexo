class NumeroComplexo {
    constructor(real, imaginario){
           this.real = real;
           this.imaginario = imaginario;//this representa o objeto que esta sendo criado ou utilizado
    }

    mostrar() {
        const real = Number(this.real.toFixed(4));
        const imaginario = Number(this.imaginario.toFixed(4));
        if (this.imaginario === 0) {// verifica se a parte imaginaria é igual a zero
            return `${real}`;
        }
        if (this.real === 0) {
            return `${imaginario}i`;
        }
        if (this.imaginario > 0) {//verifica se a parte imaginaria eh maior que zero
            return `${real} + ${imaginario}i`;
        }
        return `${real} - ${Math.abs(imaginario)}i`//math.abs serve para transformar um numero negativo em positivo, para nao ficar dois sinais na resposta
    }    // o math.abs eh um objeto que existe dentro do javascript e ele possui varias propriedades matematicas e funções tambem
    //abs vem de absolut value, ou seja valor absoluto, valor absoluto eh a distancia de um numero ate zero, ignorando o sinal
    somar(outroNumeroComplexo){
        const novoReal = parseInt(this.real) + parseInt(outroNumeroComplexo.real);// aqui esta somando as partes reais de  numeros complexos
        const novoImaginario = parseInt(this.imaginario) + parseInt(outroNumeroComplexo.imaginario);// aqui esta somando as partes imaginarias de numeros complexos
        return new NumeroComplexo(novoReal, novoImaginario);
    }

    subtrair(outroNumeroComplexo){
        const novoReal = parseInt(this.real) - parseInt(outroNumeroComplexo.real);
        const novoImaginario = parseInt(this.imaginario) - parseInt(outroNumeroComplexo.imaginario);
        return new NumeroComplexo(novoReal, novoImaginario);
    }

    multiplicar(outroNumeroComplexo){
        const novoReal = (parseInt(this.real) * parseInt(outroNumeroComplexo.real)) - (parseInt(this.imaginario) * parseInt(outroNumeroComplexo.imaginario));
        const novoImaginario = (parseInt(this.real) * parseInt(outroNumeroComplexo.imaginario)) + (parseInt(this.imaginario) * parseInt(outroNumeroComplexo.real));
        //aqui ele realiza a distributiva
        return new NumeroComplexo(novoReal, novoImaginario);
    }
    dividir(outroNumeroComplexo){
        const denominador = (outroNumeroComplexo.real * outroNumeroComplexo.real) + (outroNumeroComplexo.imaginario * outroNumeroComplexo.imaginario);
        if(denominador === 0){
            return null;
        }
        const novoReal =  ((this.real * outroNumeroComplexo.real) +  (this.imaginario * outroNumeroComplexo.imaginario)) / denominador;
        const novoImaginario = ((this.imaginario * outroNumeroComplexo.real) - (this.real * outroNumeroComplexo.imaginario)) / denominador;
        return new NumeroComplexo(novoReal, novoImaginario);
    }
    conjugado(){
      const novoReal = this.real;
      const novoImaginario = -this.imaginario;
      return new NumeroComplexo(novoReal, novoImaginario);
    }
}

class Resolucao {
    gerarSoma(numero1, numero2, resultado) {
        const linhas = [];
        // Primeira linha: mostra a operação
        linhas.push(`(${numero1.mostrar()}) + (${numero2.mostrar()})`);
        // Segunda linha: mostra como a soma é feita
        linhas.push(`= <br> (${numero1.real} + ${numero2.real}) + (${numero1.imaginario} + ${numero2.imaginario})i`);
        // Terceira linha: mostra o resultado final
        linhas.push(`=<br> ${resultado.mostrar()}`);
        document.getElementById("resultado").innerHTML=linhas;
    }

    gerarSubtracao(numero1, numero2, resultado) {
        const linhas = [];
        linhas.push(
            `(${numero1.mostrar()}) - (${numero2.mostrar()})`
        );
        linhas.push(
            `= <br>(${numero1.real} - (${numero2.real})) + ` +
            `(${numero1.imaginario} - (${numero2.imaginario}))i`
        );
        linhas.push(
            `= <br>${resultado.mostrar()}`
        );
        document.getElementById("resultado").innerHTML=linhas;
    }

    gerarMultiplicacao(numero1, numero2, resultado) {
        const linhas = [];
        const primeiroReal = numero1.real * numero2.real;
        const primeiroImaginario = numero1.real * numero2.imaginario;
        const segundoImaginario = numero1.imaginario * numero2.real;
        const termoComIQuadrado = numero1.imaginario * numero2.imaginario;
        // Mostra a multiplicação original
        linhas.push(
            `(${numero1.mostrar()}) × (${numero2.mostrar()})`
        );
        // Mostra a propriedade distributiva
        linhas.push(
            `= <br>(${numero1.real} × ${numero2.real}) + ` +
            `(${numero1.real} × ${numero2.imaginario})i + ` +
            `(${numero1.imaginario} × ${numero2.real})i + ` +
            `(${numero1.imaginario} × ${numero2.imaginario})i²`
        );
        // Mostra o resultado de cada multiplicação
        linhas.push(
            `= <br>${primeiroReal} + ` +
            `(${primeiroImaginario})i + ` +
            `(${segundoImaginario})i + ` +
            `(${termoComIQuadrado})i²`
        );
        // Substitui i² por -1
        linhas.push(
            `= <br>${primeiroReal} + ` +
            `(${primeiroImaginario})i + ` +
            `(${segundoImaginario})i + ` +
            `(${termoComIQuadrado} × -1)`
        );
        // Junta as partes reais e imaginárias
        linhas.push(
            `=<br> (${primeiroReal} - (${termoComIQuadrado})) + ` +
            `(${primeiroImaginario} + (${segundoImaginario}))i`
        );
        // Mostra o resultado final
        linhas.push(
            `= <br>${resultado.mostrar()}`
        );
        document.getElementById("resultado").innerHTML=linhas;
    }
    gerarDivisao(numero1, numero2, resultado) {
        const linhas = [];
        if (resultado === null) {
            linhas.push("Não é possível dividir por zero.");
            document.getElementById("resultado").innerHTML=linhas.join('<br>');
            return;
        } else
        var conjugadoDivisor = numero2.conjugado();
        const denominador =
            (numero2.real ** 2) +
            (numero2.imaginario ** 2);
        const numeradorReal =
            (numero1.real * numero2.real) +
            (numero1.imaginario * numero2.imaginario);
        const numeradorImaginario =
            (numero1.imaginario * numero2.real) -
            (numero1.real * numero2.imaginario);
        // Mostra a divisão original
        linhas.push(
            `(${numero1.mostrar()}) ÷ (${numero2.mostrar()})`
        );
        // Multiplica o numerador e o denominador
        // pelo conjugado do divisor
        linhas.push(
            `= <br>[(${numero1.mostrar()}) × ` +
            `(${conjugadoDivisor.mostrar()})] / ` +
            `[(${numero2.mostrar()}) × ` +
            `(${conjugadoDivisor.mostrar()})]`
        );
        // Mostra os cálculos do numerador e denominador
        linhas.push(
            `= <br>[((${numero1.real} × ${numero2.real}) + ` +
            `(${numero1.imaginario} × ${numero2.imaginario})) + ` +
            `((${numero1.imaginario} × ${numero2.real}) - ` +
            `(${numero1.real} × ${numero2.imaginario}))i] / ` +
            `[(${numero2.real}²) + (${numero2.imaginario}²)]`
        );
        // Mostra os valores já calculados
        linhas.push(
            `= <br>[${numeradorReal} + (${numeradorImaginario})i] / ` +
            `${denominador}`
        );
        // Separa a parte real e a imaginária
        linhas.push(
            `= <br>(${numeradorReal} / ${denominador}) + ` +
            `(${numeradorImaginario} / ${denominador})i`
        );
        // Mostra o resultado final
        linhas.push(
            `= <br>${resultado.mostrar()}`
        );
        document.getElementById("resultado").innerHTML=linhas;
    }

    gerarConjugado(numero, resultado) {
        const linhas = [];
        linhas.push(
            `Conjugado de (${numero.mostrar()})`
        );
        // Multiplica a parte imaginária por -1
        linhas.push(
            `= <br>${numero.real} + ` +
            `(${numero.imaginario} × -1)i`
        );
        linhas.push(
            `= <br>${resultado.mostrar()}`
        );
        document.getElementById("resultado").innerHTML=linhas;
    }
}


function calculaOperacao(op) {
    if (isNaN(a)&&isNaN(b)){
        return null;
    }else{
        //aqui são feitas as operações da classe NumeroComplexo para que seja integrada com o html
        let z1 = new NumeroComplexo(
            parseFloat(document.getElementById("aa").value), 
            parseFloat(document.getElementById("ba").value)
        );
        let z2 = new NumeroComplexo(
            parseFloat(document.getElementById("ab").value), 
            parseFloat(document.getElementById("bb").value)
        );
        var resultado;
        var calc = new Resolucao();
        switch(op) {
            case 'soma':
                resultado = z1.somar(z2);
                calc.gerarSoma(z1,z2,resultado);
                break;
            case 'subtracao':
                resultado = z1.subtrair(z2);
                calc.gerarSubtracao(z1,z2,resultado);
                break;
            case 'multiplicacao':
                resultado = z1.multiplicar(z2);
                calc.gerarMultiplicacao(z1,z2,resultado);
                break;
            case 'divisao':
                resultado= z1.dividir(z2);
                if(resultado === null){
                    document.getElementById("resultado").innerHTML="Não é possível dividir por 0";
                }else{
                    calc.gerarDivisao(z1,z2,resultado);
                    break;
                }
                break;
            case 'conjugadoA':
                resultado=z1.conjugado();
                calc.gerarConjugado(z1,resultado);
                break;
            case 'conjugadoB':
                resultado=z2.conjugado();
                calc.gerarConjugado(z2,resultado);
                break;
        }
    }
}

function trocarValores(){// essa função troca completamente os valores de dois numeros complexos na pg inicial
    let z1 = new NumeroComplexo(
    parseFloat(document.getElementById("aa").value), 
    parseFloat(document.getElementById("ba").value)
    );
    let z2 = new NumeroComplexo(
        parseFloat(document.getElementById("ab").value), 
        parseFloat(document.getElementById("bb").value)
    );
    const realTemporario = z1.real;// guarda a parte real antiga do z1
    const imaginarioTemporario = z1.imaginario;//  guarda a parte imaginaria antiga do z1

    document.getElementById("aa").value=z2.real;
    document.getElementById("ba").value=z2.imaginario;
    //aqui ele vai exibir no HTML
    document.getElementById("ab").value=realTemporario;
    document.getElementById("bb").value=imaginarioTemporario;
    //eu alterei um pouco só pra ficar mais simples mesmo :)
}