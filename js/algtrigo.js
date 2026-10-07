function chent(forma){
    if (forma == 'alg') {
        document.getElementById("put").innerHTML = "Z = <input type='number' id='a'>+<input type='number' id='b'>× i<br>";
    }
    else{
        document.getElementById("put").innerHTML = "Z = <input type='number' id='moduloa'> × [cos(<span id='anga'>θ</span>) + i × sen(<span id='anga'>θ</span>)] <br> <label>Ângulo:</label> <input type='number' id='anga_put'>";
    }
}
function calcularModulo(real, imaginario) {
    const somaQuadrado = real ** 2 + imaginario ** 2;
    const modulo = Math.sqrt(somaQuadrado);
    return modulo;
}
// CALCULO DO ARGUMENTO
function calcularArgumento(real, imaginario) {
    // O numero 0 + 0i nao possui argumento definido
    if (real === 0 && imaginario === 0) {
        return null;
    }
    const argumentoRadianos = Math.atan2(imaginario, real);
    const argumentoGraus = argumentoRadianos * 180 / Math.PI;
    return argumentoGraus;
}
function convert(forma){
    if (forma=='alg'){
        let a = document.getElementById('a').value;
        let b = document.getElementById('b').value;

        let mod = calcularModulo(a,b);
        let theta = calcularArgumento(a,b);
        document.getElementById("output").innerHTML = mod+" [cos ("+theta+") + i.sen ("+theta+")]";
    }else{
        let theta = document.getElementById('anga').value;
        let mod = document.getElementById('moduloa').value;

        let a = mod * Math.cos(theta);
        let b = mod * Math.sin(theta);
        document.getElementById('output').innerHTML= a +" + "+ b +"× i";
    }
}