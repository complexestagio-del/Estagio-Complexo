function entra(quant){
    if(quant=='3'){
        document.getElementById('z4').style.display = 'none';
        document.getElementById('z5').style.display='none';
        document.getElementById('z6').style.display='none';
    }else if (quant =='4'){
        document.getElementById('z4').style.display = 'block';
        document.getElementById('z5').style.display='none';
        document.getElementById('z6').style.display='none';
    }else if (quant=='5'){
        document.getElementById('z4').style.display = 'block';
        document.getElementById('z5').style.display='block';
        document.getElementById('z6').style.display='none';
    }else if (quant == '6'){
        document.getElementById('z4').style.display = 'block';
        document.getElementById('z5').style.display='block';
        document.getElementById('z6').style.display='block';
    }
}