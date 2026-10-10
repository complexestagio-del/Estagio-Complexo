function chent(forma){
    if (forma == 'alg') {
        document.getElementById("put").innerHTML = "Z = <input type='number' id='a'>+<input type='number' id='b'>× i<br>";
    }
    else{
        document.getElementById("put").innerHTML = '<label>ZB = <input type="number" id="modulo"> × [cos(θ) + i × sen(θ)] </label> <p>Ângulo: <input type="number" id="ang_put"></p>';
    }
}
function calcularModulo(real, imaginario) {
    const somaQuadrado = real ** 2 + imaginario ** 2;
    const modulo = Math.sqrt(somaQuadrado);
    return formatarNumero(modulo);
}
function formatarNumero(valor) {
    // Evita valores como 0.30000000004
    const arredondado = Number(valor.toFixed(4));
    return arredondado;
}
// CALCULO DO ARGUMENTO
function calcularArgumento(real, imaginario) {
    // O numero 0 + 0i nao possui argumento definido
    if (real === 0 && imaginario === 0) {
        return null;
    }
    const argumentoRadianos = Math.atan2(imaginario, real);
    const argumentoGraus = argumentoRadianos * 180 / Math.PI;
    return formatarNumero(argumentoGraus);
}
function convert(forma){
    if (forma==='alg'){
        const a = document.getElementById('a').value;
        const b = document.getElementById('b').value;

        const mod = calcularModulo(a,b);
        const theta = calcularArgumento(a,b);
        document.getElementById("output").innerHTML = mod+" × [cos ("+theta+") + i × sen ("+theta+")]";
    }else{
        const theta = Number(document.getElementById('ang_put').value);
        const mod = Number(document.getElementById('modulo').value);

        const a = formatarNumero(mod * Math.cos(theta*(Math.PI/180)));
        const b = formatarNumero(mod * Math.sin(theta*(Math.PI/180)));

        document.getElementById('output').innerHTML= a +" + "+ b +" × i";
    }
}