const form = document.getElementById('form');
const nomInput = document.getElementById('nomInput');
const prenomInput = document.getElementById('prenomInput');
const emailInput = document.getElementById('emailInput');
const emailConfirmationInput = document.getElementById('emailConfirmationInput');
const passwordInput = document.getElementById('passwordInput');
const passwordConfirmationInput = document.getElementById('passwordConfirmationInput');

const setError = (element, message) => {
    const inputControl = element.parentElement;
    const errorDisplay = inputControl.querySelector('.errorMessage');

    errorDisplay.innerText = message;
    inputControl.classList.add('error');
    inputControl.classList.remove('success');
};

const setSuccess = (element) => {
    const inputControl = element.parentElement;
    const errorDisplay = inputControl.querySelector('.errorMessage');

    errorDisplay.innerText = '';
    inputControl.classList.add('success');
    inputControl.classList.remove('error');
};

const isValidEmail = email => {
    const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
};

const validateForm = () => {
    let noError = true;
    const nomInputValue = nomInput.value.trim();
    const prenomInputValue = prenomInput.value.trim();
    const emailInputValue = emailInput.value.trim();
    const emailConfirmationInputValue = emailConfirmationInput.value.trim();
    const passwordInputValue = passwordInput.value.trim();
    const passwordConfirmationInputValue = passwordConfirmationInput.value.trim();


    if (nomInputValue === '') {
        setError(nomInput, 'Votre nom est requis');
        noError = false;
    } else {
        setSuccess(nomInput);
    }

    if (prenomInputValue === '') {
        setError(prenomInput, 'Votre prénom est requis');
        noError = false;
    } else {
        setSuccess(prenomInput);
    }

    if (emailInputValue === '') {
        setError(emailInput, 'Votre adresse email est requise');
        noError = false;
    } else if (!isValidEmail(emailInputValue)) {
        setError(emailInput, 'Votre email doit être valide');
        noError = false;
    } else {
        setSuccess(emailInput);
    }

    if (emailConfirmationInputValue === '') {
        setError(emailConfirmationInput, 'La confirmation de votre adresse email est requise');
        noError = false;
    } else if (emailInputValue !== emailConfirmationInputValue) {
        setError(emailConfirmationInput, "Votre confirmation d'email doit être identique au email");
        noError = false;
    } else {
        setSuccess(emailConfirmationInput);
    }

    if (passwordInputValue === '') {
        setError(passwordInput, 'Votre mot de passe est requis');
        noError = false;
    } else if (passwordInputValue.length < 8) {
        setError(passwordInput, 'Votre mot de passe doit contenir au moins 8 caractères');
        noError = false;
    } else {
        setSuccess(passwordInput);
    }

    if (passwordConfirmationInputValue === '') {
        setError(passwordConfirmationInput, 'La confirmation de votre mot de passe est requise');
        noError = false;
    } else if (passwordInputValue !== passwordConfirmationInputValue) {
        setError(passwordConfirmationInput, 'Votre confirmation de mot de passe doit être indentique au mot de passe')
        noError = false;
    } else {
        setSuccess(passwordConfirmationInput);
    }

    return noError;
};