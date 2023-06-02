// Exercise 7
function validate(event) {
    //var error = 0;
    // Get the input fields
    var fName = document.getElementById("fName");
    var fEmail = document.getElementById("fEmail");
    var fAddress = document.getElementById("fAddress");
    var fLastN = document.getElementById("fLastN");
    var fPassword = document.getElementById("fPassword");
    var fPhone = document.getElementById("fPhone");

    //Establim variables regex per poder validar
    var regName = /[a-zA-z]{3}/;
    var regEmail = /[\w-\.]+@([\w-]+\.)+[\w-]{2}/;
    var regAddress = /\w{3}/;
    var regPassword = /^\w{4,8}$/;
    var regPhone = /^\d{9}$/;

    // Validem: si és invàlid...
    if (!regName.test(fName.value)) {
        fName.classList.add("is-invalid");
        fName.classList.remove("is-valid");
    }

    if (!regEmail.test(fEmail.value)) {
        fEmail.classList.add("is-invalid");
        fEmail.classList.remove("is-valid");
    }

    if (!regAddress.test(fAddress.value)) {
        fAddress.classList.add("is-invalid");
        fAddress.classList.remove("is-valid");
    }

    if (!regName.test(fLastN.value)) {
        fLastN.classList.add("is-invalid");
        fLastN.classList.remove("is-valid");
    }

    if (!regPassword.test(fPassword.value)) {
        fPassword.classList.add("is-invalid");
        fPassword.classList.remove("is-valid");
    }

    if (!regPhone.test(fPhone.value)) {
        fPhone.classList.add("is-invalid");
        fPhone.classList.remove("is-valid");
    }

    //Validem: si és vàlid...
    if (regName.test(fName.value)) {
        //afegir classe is-invalid a l'input-->com a conseq ja es mostrarà el missatge
        fName.classList.add("is-valid");
        fName.classList.remove("is-invalid");
    }

    if (regEmail.test(fEmail.value)) {
        fEmail.classList.add("is-valid");
        fEmail.classList.remove("is-invalid");
    }

    if (regAddress.test(fAddress.value)) {
        fAddress.classList.add("is-valid");
        fAddress.classList.remove("is-invalid");
    }

    if (regName.test(fLastN.value)) {
        fLastN.classList.add("is-valid");
        fLastN.classList.remove("is-invalid");
    }

    if (regPassword.test(fPassword.value)) {
        fPassword.classList.add("is-valid");
        fPassword.classList.remove("is-invalid");
    }

    if (regPhone.test(fPhone.value)) {
        fPhone.classList.add("is-valid");
        fPhone.classList.remove("is-invalid");
    }

    event.preventDefault();
    event.stopPropagation();

}

