const product = new Product();
const user = new User();
const delivery = new Shipment();
const order = new Order();

//Product Form EventListeners ***********************************************************************************

function addProductEventListeners() {
    productForm.addEventListener('submit', submitProductForm);
    batterySelector.addEventListener('click', changeBatteryModel);
    colorInputs.forEach((input) => input.addEventListener('click', changeColor));
}

function removeProductEventListeners() {
    productForm.removeEventListener('submit', submitProductForm);
    batterySelector.removeEventListener('click', changeBatteryModel);
    colorInputs.forEach(color => removeEventListener('click', changeColor));
}

// Profile Form EventListeners *************************************************************************************
const profileElements = ['username', 'email', 'password', 'password2'];

const addProfileEventListeners = () => {
    profileForm.addEventListener('submit', submitLogin);
    profileElements.forEach((profileInput) => {
        document.getElementById(profileInput).addEventListener('focusout', validateField);
        document.getElementById(profileInput).addEventListener('keydown', validateField);
    });
}

const removeProfileEventListeners = () => {
    profileElements.forEach((element) => {
        document.getElementById(element).removeEventListener('keydown', validateField);
        document.getElementById(element).removeEventListener('focusout', validateField);
    });
    profileForm.removeEventListener('submit', submitLogin);
}

// Address Form EventListeners *************************************************************************************
const formElements = ['firstname', 'lastname', 'birthday', 'addressOne', 'addressTwo', 'postalCode', 'phone'];
const addAddressEventListeners = () => {
    addressForm.addEventListener('submit', submitAddress);
    formElements.forEach((element) => {
        document.getElementById(element).addEventListener('focusout', validateField);
        document.getElementById(element).addEventListener('keydown', validateField);
    });
    country.addEventListener('change', changeCountryPhoneSelect);
}

const removeAddressEventListeners = () => {
    formElements.forEach((element) => {
        document.getElementById(element).removeEventListener('keydown', validateField);
        document.getElementById(element).removeEventListener('focusout', validateField);
    });
    country.removeEventListener('change', changeCountryPhoneSelect);
    addressForm.removeEventListener('submit', submitAddress);
}

// Shipping Form Event Listeners *********************************************************************************

const addShipmentEventListeners = () => {
    shipmentForm.addEventListener('submit', submitShipment);
    isGift.addEventListener('click', toggleGiftOptions);
    giftMessage.addEventListener('keydown', validateField);
    giftMessage.addEventListener('focusout', validateField);
    typeShip.forEach(el => {
        el.addEventListener('change', chooseShipmentType);
    });
}

const removeShipmentEventListeners = () => {
    shipmentForm.removeEventListener('submit', submitShipment);
    isGift.removeEventListener('click', toggleGiftOptions);
    giftMessage.removeEventListener('keydown', validateField);
    giftMessage.removeEventListener('focusout', validateField);
    typeShip.forEach(el => {
        el.removeEventListener('change', chooseShipmentType);
    });
}

// Confirm Event Listeners ***********************************************************************************

const addConfirmEventListeners = () => {
    confirmOrderForm.addEventListener('submit', domSetHTMLValues);
}

const removeConfirmEventListeners = () => {
    confirmOrderForm.removeEventListener('submit', domSetHTMLValues);
}

// Form Helpers **************************************************************************************************
const validateField = (event) => {
    const domElement = event.target;
    const regex = /^(?=.*[~`!@#$%^&*()--+={}\[\]|\\:;"'<>,.?/_₹]).*$/;

    if (event.type === 'keydown') setErrorField(domElement, 'hide');
    else {
        switch (event.target.id) {
            case 'username':
                if (domElement.value.length < 5 || domElement.value.length > 20) {
                    setErrorField(domElement, 'show');
                }
                break;
            case 'email':
                if (domElement.value.length > 50 || !domElement.value.match(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/)) {
                    setErrorField(domElement, 'show');
                }
                break;
            case 'password':
                if (domElement.value.length < 8) {
                    setErrorField(domElement, 'show', '**Password must be at least 8 characters');
                } else if (domElement.value.length > 20) {
                    setErrorField(domElement, 'show', "**Password length must not exceed 20 characters");
                } else if (domElement.value.search(/[0-9]/) < 0) {
                    setErrorField(domElement, 'show', "**Password must contain at least 1 number");
                } else if (domElement.value.search(/[A-Z]/) < 0) {
                    setErrorField(domElement, 'show', "**Password must contain at least 1 uppercase letter");
                } else if (domElement.value.search(/[a-z]/) < 0) {
                    setErrorField(domElement, 'show', "**Password must contain at least 1 lowercase letter");
                } else if (!regex.test(domElement.value)) {
                    setErrorField(domElement, 'show', "**Password must contain at least 1 special character");
                }

                let pw = document.getElementById("password2");
                if (pw.value != domElement.value) {
                    setErrorField(pw, 'show', "Password do not match");
                } else {
                    setErrorField(pw, 'hide');
                }
                break;
            case 'password2':
                let pw1 = document.getElementById("password").value;
                if (pw1 != domElement.value) {
                    setErrorField(domElement, 'show', "Passwords do not match");
                } else {
                    setErrorField(domElement, 'hide');
                }
                break;
            case 'firstname': case 'lastname':
                if (domElement.value.length > 20) {
                    setErrorField(domElement, 'show');
                } else {
                    setErrorField(domElement, 'hide');
                }
                break;
            case 'addressOne': case 'addressTwo':
                if (domElement.value.length > 50) {
                    setErrorField(domElement, 'show');
                } else {
                    setErrorField(domElement, 'hide');
                }
                break;
            case 'birthday':
                let date = new Date(domElement.value);
                let now = new Date();
                if ((now.getFullYear() - date.getFullYear()) < 14) {
                    setErrorField(domElement, 'show', "Only if you are more than 14 years old");
                } else {
                    setErrorField(domElement, 'hide');
                }
                break;
            case 'postalCode':
                if (!domElement.value.match(/^\d{5}(-\d{4})?$/)) {
                    setErrorField(domElement, 'show');
                } else {
                    setErrorField(domElement, 'hide');
                }
                break;
            case 'phone':
                if (!domElement.value.match(/^\d{9}$/)) {
                    setErrorField(domElement, 'show');
                } else {
                    setErrorField(domElement, 'hide');
                }
                break;
            case 'giftMessage':
                if (domElement.value.length > 200) {
                    setErrorField(domElement, 'show');
                } else {
                    setErrorField(domElement, 'hide');
                }
                break;
        }
        if (domElement.value.length === 0) {
            setErrorField(domElement, 'hide');
        }
    }
}

const setErrorField = (domElement, action, message) => {
    let errorText = document.querySelector(`[data-target=${domElement.id}]`);
    let originalText = document.querySelector(`label[for=${domElement.id}]`).textContent;

    if (message) {
        errorText.textContent = message;
        return;
    }

    if (action === 'show') {
        domElement.style.color = 'red';
        domElement.style.border = '3px solid red';
        errorText.textContent = `El campo ${originalText} no es correcto`;

    } else {
        domElement.style.color = 'black';
        domElement.style.border = '1px solid black';
        errorText.textContent = '';
    }
}

// Previous Button *********************************************************************************************
const addPreviousButtonEventListener = () => {
    previousButton.addEventListener('click', () => {
        const page = document.querySelector('.form-step-active').getAttribute('data-target');
        switch (page) {
            case 'address':
                changeDomToNextForm(page, 'profile');
                break;
            case 'ship':
                changeDomToNextForm(page, 'address');
                break;
            case 'confirm':
                changeDomToNextForm(page, 'shipment');
                break;
        }
    });
}

function addExitButtonEventListener() {
    exitButton.addEventListener('click', () => {
        addProductEventListeners();
        // Reset objects
        user.resetUser();
        product.resetProduct();
        delivery.resetShipment();
        // Reset views
        resetOrderFormsView();
        // Reset forms
        resetAllForms();
        clearInterval(popupInterval);
    });
}

//Initialize EventListeners ***********************************************************************************
product.getThumbnails('black');
addProductEventListeners();

addPreviousButtonEventListener();
addExitButtonEventListener();