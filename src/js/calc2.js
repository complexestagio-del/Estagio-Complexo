class cn {
    constructor(arg, modulo) {
        this.arg = arg;
        this.modulo = modulo;
    }
    multiplicacao(z2) {
        const mr = parseFloat(this.modulo) * parseFloat(z2.modulo);
        const ar = parseFloat(this.arg) + parseFloat(z2.arg);
        return new cn(ar, mr);
    }
    divisao(z2) {
        if (z2.modulo == 0) {
            return null;
        }
        const mr = parseFloat(this.modulo) / parseFloat(z2.modulo);
        const ar = parseFloat(this.arg) - parseFloat(z2.arg);
        return new cn(ar, mr.toFixed(3));
    }
    formar() {
        const modulo = Number(this.modulo);
        const arg = Number(this.arg);
        if (modulo == 0 || arg == 0) {
            return 0;
        }else{
            return `${modulo} × [ cos (${arg}) + i × sen(${arg}) ]`
        }
    }
}

class Resolucao {
    multiplicar(z1, z2, resultado) {
        const linhas = [];
        linhas.push(`{ ${z1.formar()} × ${z2.formar()} }: <br>
        Módulo: ${z1.modulo} × ${z2.modulo} = ${resultado.modulo}<br>
        Argumento: ${z1.arg} + ${z2.arg} = ${resultado.arg}<br>
        ZA × ZB = ${resultado.formar()}`);
        document.getElementById("resultado").innerHTML=linhas;
    }
    dividir(z1, z2, resultado) {
        const linhas = [];
        linhas.push(`{ ${z1.formar()} / ${z2.formar()} }: <br>
        Módulo: ${z1.modulo} / ${z2.modulo} = ${resultado.modulo}<br>
        Argumento: ${z1.arg} - ${z2.arg} = ${resultado.arg}<br>
        ZA / ZB = ${resultado.formar()}`);
        document.getElementById("resultado").innerHTML=linhas;
    }
}

function calculaOperacao(op) {
    let z1 = new cn(document.getElementById('anga_put').value, document.getElementById('moduloa').value);
    let z2 = new cn(document.getElementById('angb_put').value, document.getElementById('modulob').value);
    var resultado;
    var calc = new Resolucao();
    switch (op) {
        case 'multiplicacao':
            resultado = z1.multiplicacao(z2);
            calc.multiplicar(z1,z2,resultado);
            break;
        case 'divisao':
            resultado = z1.divisao(z2);
            calc.dividir(z1,z2,resultado);
            break;
    }
}
function trocarValores() {
    let z1 = new cn(
        parseFloat(document.getElementById('anga_put').value),
        parseFloat(document.getElementById('moduloa').value)
    );
    let z2 = new cn(
        parseFloat(document.getElementById('angb_put').value),
        parseFloat(document.getElementById('modulob').value)
    );
    document.getElementById('moduloa').value = z2.modulo;
    document.getElementById('anga_put').value = z2.arg;
    document.getElementById('modulob').value = z1.modulo;
    document.getElementById('angb_put').value = z1.arg;
}
