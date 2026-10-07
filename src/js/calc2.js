class cn {
    constructor(arg, modulo) {
        this.arg = arg;
        this.modulo = modulo;
    }
    multiplicacao(z2) {
        const mr=parseFloat(this.modulo)*parseFloat(z2.modulo);
        const ar = parseFloat(this.arg)+parseFloat(z2.arg);
        return new cn(ar,mr);
    }
    divisao(z2){
        if(z2.modulo==0){
            return null;
        }
        const mr=parseFloat(this.modulo)/parseFloat(z2.modulo);
        const ar = parseFloat(this.arg)-parseFloat(z2.arg);
        return new cn(ar,mr);
    }
}
function calc(op) {
    let z1 = new cn(document.getElementById('anga_put').value, document.getElementById('moduloa').value);
    let z2 = new cn(document.getElementById('angb_put').value, document.getElementById('modulob').value);
    var resultado;
    switch (op) {
        case 'soma':
            break;
        case 'subtracao':
            break;
        case 'multiplicacao':
            resultado=z1.multiplicacao(z2);
            break;
        case 'divisao':
            resultado=z1.divisao(z2);
            break;
    }
    document.getElementById('resultado').innerHTML=resultado;
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
