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