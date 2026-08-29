function chent(forma){
    if (forma == 'alg') {
        document.getElementById("put").innerHTML = "Z = <input type='number' id='a'>+<input type='number' id='b'>× i<br>";
    }
    else{
        document.getElementById("put").innerHTML = "Z = <input type='number' id='moduloa'> × [cos(<span id='anga'>θ</span>) + i × sen(<span id='anga'>θ</span>)] <br> <label>Ângulo:</label> <input type='number' id='anga_put'>";
    }
}
function convert(forma){
    
    if (forma=='alg'){
        let a = document.getElementById('a').value;
        let b = document.getElementById('b').value;
        let mod = Math.sqrt( Math.pow(parseInt(a),2) + Math.pow(parseInt(b),2) );

        let theta = Math.atan(parseInt(b)/parseInt(a));
        document.getElementById("output").innerHTML = mod+" [cos ("+theta.toFixed(2)+") + i.sen ("+theta.toFixed(2)+")]";
    }else{
        let theta = document.getElementById('anga').value;
        let mod = document.getElementById('moduloa').value;

        let a = mod * Math.cos(theta);
        let b = mod * Math.sin(theta);
        document.getElementById('output').innerHTML= a +" + "+ b +"× i";
    }
}