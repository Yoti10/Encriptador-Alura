const txtEncrypt = document.getElementById('txt-out')
const txtUncrypt = document.getElementById('txt-in')
const encryptBtn = document.getElementById('encriptar')
const unencryptBtn = document.getElementById('desencriptar')
const copiarAccion = document.getElementById('copiarButton')
const errorMessage = document.getElementById('error-message');
const imgSalida = document.getElementById('img-salida');
//const imgSalida = document.getElementsByClassName('img-salida');
const txtSalida = document.getElementById('text-salida');

const checkAluraValidations = (text) => {
    const hasAccentOrSpecialChar = /[ÀÈÌÒÙàèìòùáéíóúüñÁÉÍÓÚÜÑ!@#$%^&*(),.?":{}|<>·]/.test(text);

    if (hasAccentOrSpecialChar) {
        showError("* No se permiten acentos ni caracteres especiales.");
        encryptBtn.disabled = !false;
        unencryptBtn.disabled = !false;
    } else {
        hideError();
        encryptBtn.disabled = false;
        unencryptBtn.disabled = false;
    }
}

const showError = (message) => {
    errorMessage.textContent = message;
    errorMessage.style.display = 'block';
};

const hideError = () => {
    errorMessage.textContent = '';
    errorMessage.style.display = 'none';
};


const updateButtonState = () => {
    const text = txtUncrypt.value.toLowerCase(); // Convertir a minúsculas para realizar comparaciones sin distinción de mayúsculas/minúsculas
    const hasAccentOrSpecialChar = /[ÀÈÌÒÙàèìòùáéíóúüñÁÉÍÓÚÜÑ!@#$%^&*(),.?":{}|<>·]/.test(text);
    const encryptButtonEnabled = !hasAccentOrSpecialChar && !text.includes('imes') && !text.includes('ai') && !text.includes('ober') && !text.includes('ufat');
    const unencryptButtonEnabled = text.includes('imes') || text.includes('ai') || text.includes('ober') || text.includes('ufat');
    const anyTextEntered = text.length > 0;
    const anyTextOutput = txtEncrypt.value;
    encryptBtn.disabled = !encryptButtonEnabled || !anyTextEntered;
    unencryptBtn.disabled = !unencryptButtonEnabled || !anyTextEntered;

    

    copiarAccion.disabled = !anyTextOutput.length > 0 || anyTextOutput.length  == 0;
    
    if(txtEncrypt.value.length >0){
        txtSalida.style.display = 'block';
        imgSalida.style.display = 'none';
    }
    else{
        txtSalida.style.display = 'none';
        imgSalida.style.display = 'block';

    }

}


txtUncrypt.addEventListener('input', () => {
    const text = txtUncrypt.value;
    txtUncrypt.value = text.toLowerCase(); // Convertir a minúsculas

    checkAluraValidations(txtUncrypt.value);

    updateButtonState();
});


encryptBtn.addEventListener('click', () => {
    const text = txtUncrypt.value; //toma el texto del texto no encriptado

    checkAluraValidations(text);

    const textEncriptado = text.replaceAll('e', 'enter')
        .replaceAll('i', 'imes')
        .replaceAll('a', 'ai')
        .replaceAll('o', 'ober')
        .replaceAll('u', 'ufat');

    txtEncrypt.value = textEncriptado;
    txtUncrypt.value = '';
    
    updateButtonState();
})

unencryptBtn.addEventListener('click', () => {
    const text = txtUncrypt.value; //toma el texto del texto encriptado

    checkAluraValidations(text);

    const textDesencriptado = text
        .replaceAll('imes', 'i')
        .replaceAll('ober', 'o')
        .replaceAll('ufat', 'u') 
        .replaceAll('ai', 'a')
        .replaceAll('enter', 'e');//desencripta
        

    txtEncrypt.value = textDesencriptado;
    txtUncrypt.value = '';
    
    updateButtonState();
})



copiarAccion.addEventListener('click', () => {
    if (txtEncrypt.value !== "") {
        navigator.clipboard.writeText(txtEncrypt.value)
    } 
    Swal.fire({
        title: 'Copiado!',
        text: 'Texto Copiado al portapapeles',
        icon: 'success',
        confirmButtonText: 'Cool'
      })
    txtEncrypt.value ='';
    copiarAccion.disabled = true;

    txtSalida.style.display = 'none';
    imgSalida.style.display = 'block';
})



encryptBtn.disabled = true;
unencryptBtn.disabled = true;
copiarAccion.disabled = true;