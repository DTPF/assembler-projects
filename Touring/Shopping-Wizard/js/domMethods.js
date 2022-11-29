// Main Logic Changes
const changeDomToNextForm = (previous, next) => {
    if (previous === 'product' && next === 'profile') {
        //Reset product
        resetProductForm();

        removeProductEventListeners();
        addProfileEventListeners();
        // Change article 'PRODUCT' to section 'ORDER'
        thanksPage.classList.remove('form-step-active');
        productPage.classList.add('hide');
        orderPage.classList.remove('hide');
        // Change Headers and Footers
        headerMainProduct.classList.add('hide');
        headerMainOrder.classList.remove('hide');
        footerMainProduct.classList.add('hide');
        footerMainOrder.classList.remove('hide');
        formsSubmit.classList.remove('hide');
        formsSubmit.setAttribute('form', 'profileForm');

        // Hide the previous button
        previousButton.classList.add('hide');

    } else if (previous === 'profile' && next === 'address') {
        resetProfileForm();

        removeProfileEventListeners();
        addAddressEventListeners();

        profilePage.classList.remove('form-step-active');
        addressPage.classList.add('form-step-active');
        formsSubmit.setAttribute('form', 'addressForm');
        // Show the previous button
        previousButton.classList.remove('hide');
        advance();

    } else if (previous === 'address' && next === 'ship') {
        resetAddressForm();

        removeAddressEventListeners();
        addShipmentEventListeners();

        addressPage.classList.remove('form-step-active');
        shipmentPage.classList.add('form-step-active');
        formsSubmit.setAttribute('form', 'shipmentForm');
        advance();
    } else if (previous === 'ship' && next === 'confirm') {
        resetShipmentForm();

        addConfirmEventListeners();
        removeShipmentEventListeners();

        shipmentPage.classList.remove('form-step-active');
        confirmOrder.classList.add('form-step-active');
        // The next form is controlled by other button
        formsSubmit.setAttribute('form', '');
        // Hide footer to show the delivery resume
        footer.classList.add('hide');
        advance();
    } else if (previous === 'confirm' && next === 'thanks') {
        removeConfirmEventListeners();
        confirmOrder.classList.remove('form-step-active');
        thanksPage.classList.add('form-step-active');
        footerMainOrder.classList.remove('hide');
        footer.classList.remove('hide');
        previousButton.classList.add('hide');
        formsSubmit.classList.add('hide');
        registeringPopupDiv.classList.add('hide');
        advance();
    } else if (previous === 'address' && next === 'profile') {
        resetAddressForm();

        removeAddressEventListeners();
        addProfileEventListeners();

        formsSubmit.setAttribute('form', 'profileForm');
        addressPage.classList.remove('form-step-active');
        profilePage.classList.add('form-step-active');
        // Hide the previous button
        previousButton.classList.add('hide');
        goBack();

    } else if (previous === 'ship' && next === 'address') {
        resetShipmentForm();

        removeShipmentEventListeners();
        addAddressEventListeners();

        shipmentPage.classList.remove('form-step-active');
        addressPage.classList.add('form-step-active');
        formsSubmit.setAttribute('form', 'addressForm');
        goBack();

    }
}

// Product Page Methods
const changeProductPrice = (price) => {
    productPrice.innerHTML = '';
    productPrice.textContent = price;
}

const changeProductTitle = (title) => {
    productTitle.innerHTML = '';
    productTitle.textContent = title;
}

const insertImageThumbnails = (img) => {
    thumbnails.insertAdjacentHTML('beforeend', img)
}

const resetThumbnails = () => {
    thumbnails.innerHTML = '';
}

const changeImageColor = (color) => {
    image.children[0].src = `./assets/products/${color}/${color}-1.png`;
    image.children[0].alt = color;
}

// Resume Page
const assignConfirmHtmlValues = () => {
    orderImg.src = product.image;
    orderProductName.textContent = product.productName;
    orderBattery.textContent = product.batteryCapacity;
    orderColor.textContent = product.color;
    orderPrice.textContent = product.price;
    orderShipping.textContent = delivery.cost;
    orderTotalPrice.textContent = parseInt(product.price) + parseInt(delivery.cost);
}


// Progress Bar
let jumps = 0;

const advance = () => {
    jumps++;
    updateProgressbar();
}

const goBack = () => {
    jumps--;
    updateProgressbar();
}

const updateProgressbar = () => {
    progressSteps.forEach((progressStep, index) => {
        if (index < jumps + 1) {
            progressStep.classList.add("progress-step-active");
        } else {
            progressStep.classList.remove("progress-step-active");
        }
    });
    const progressActive = document.querySelectorAll(".progress-step-active");
    progress.style.width = ((progressActive.length - 1) / (progressSteps.length - 1)) * 100 + "%";
}

// Resets
const resetAllForms = () => {
    resetProfileForm();
    resetAddressForm();
    resetShipmentForm();
}

const resetProductForm = () => {
    batterySelector.value = '10000mAh';
    colorInputs.forEach(radio => radio.checked = false);
}

const resetProfileForm = () => {
    resetAllErrors();
    username.value = '';
    email.value = '';
    password.value = '';
    password2.value = '';
}

const resetAddressForm = () => {
    resetAllErrors();
    firstname.value = '';
    lastname.value = '';
    birthday.value = '';
    addressOne.value = '';
    addressTwo.value = '';
    postalCode.value = '';
    country.value = '';
    countryPhone.value = '';
    phone.value = '';
    regularAddress.checked = false;
}

const resetShipmentForm = () => {
    resetAllErrors();
    typeShip.forEach(radio => radio.checked = false);
    isGift.checked = false;
    giftTitle.value = '';
    giftMessage.value = '';
    giftImageFile.value = '';
}

const resetOrderFormsView = () => {
    // Page Product
    headerMainProduct.classList.remove('hide');
    productPage.classList.remove('hide');
    footerMainProduct.classList.remove('hide');

    headerMainOrder.classList.add('hide');
    orderPage.classList.add('hide');
    footerMainOrder.classList.add('hide');

    // Form Views
    profilePage.classList.add('form-step-active');
    addressPage.classList.remove('form-step-active');
    shipmentPage.classList.remove('form-step-active');
}

const resetAllErrors = () => {
    allErrors.forEach(err => {
        err.textContent = '';
    });
    allInputs.forEach(input => {
        input.style.border = '1px solid black';
    });
}