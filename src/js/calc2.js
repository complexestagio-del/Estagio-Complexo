class cn{
    constructor(arg,modulo){
        this.arg=arg;
        this.modulo=modulo;
    }
    conjugado(){
        const arg = -this.arg;
        return new cn(arg,this.modulo);
    }
    multiplicacao(z2){
        
    }
}
function calc(op){
    let z1=new cn(document.getElementById('anga_put').value,document.getElementById('moduloa').value);
    let z2=new cn(document.getElementById('angb_put').value,document.getElementById('modulob').value);
    var resultado;
    switch (op){
        case 'conjugadoA':
            resultado=z1.conjugado();
            document.getElementById('anga_put').value=resultado.arg;
            break;
        case 'conjugadoB':
            resultado=z2.conjugado();
            document.getElementById('angb_put').value=resultado.arg;
            break;
    }
}
function muda(arg){
}