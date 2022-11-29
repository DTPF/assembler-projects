class User {
    constructor(product) {
        this.email = '';
        this.password = '';
        this.firstname = '';
        this.lastname = '';
        this.birthday = '';
        this.addressOne = '';
        this.addressTwo = '';
        this.postalCode = '';
        this.country = '';
        this.phone = '';
        this.product = product;
        this.isRegularAdress = false;
    }

    submitAddress = (e) => {
        e.preventDefault();

        // ** The last form validation
        if (firstname.value.length > 20) {
            return;
        }
        if (lastname.value.length > 20) {
            return;
        }
        if (addressOne.value.length > 50) {
            return;
        }
        if (addressTwo.value.length > 50) {
            return;
        }
        if (!postalCode.value.match(/^\d{5}(-\d{4})?$/)) {
            return;
        }
        if (country.value) {

        }
        if (!phone.value.match(/^\d{9}$/)) {
            return;
        }

        this.assignAddressValues();
        console.log(this);
        changeDomToNextForm('address', 'ship');
    }

    submitLogin = (e) => {
        e.preventDefault();
        if (password.value === "") {
            return;
        }
        if (password.value.length < 8) {
            return;
        }
        if (password.value.search(/[0-9]/) < 0) {
            return;
        }
        if (password.value.search(/[A-Z]/) < 0) {
            return;
        }
        if (password.value.search(/[a-z]/) < 0) {
            return;
        }
        const containSymbol = /^(?=.*[~`!@#$%^&*()--+={}\[\]|\\:;"'<>,.?/_₹]).*$/;
        if (!containSymbol.test(password.value)) {
            return;
        }
        if (password.value.length > 20) {
            return;
        }

        if (password.value != password2.value) {
            return;
        }

        this.assignLoginValues();
        console.log(this);
        changeDomToNextForm('profile', 'address');
    }

    assignLoginValues = () => {
        this.username = username.value;
        this.email = email.value;
        this.password = password.value;
    }

    assignAddressValues = () => {
        this.firstname = firstname.value;
        this.lastname = lastname.value;
        this.birthday = birthday.value;
        this.addressOne = addressOne.value;
        this.addressTwo = addressTwo.value;
        this.postalCode = postalCode.value;
        this.country = country.value;
        this.phone = countryPhone.value + phone.value;
        this.isRegularAdress = regularAddress.checked;
    }

    changeCountryPhoneSelect = (event) => {
        const optionToSelect = document.querySelector(`[data-country=${event.target.value}]`);
        countryPhone.value = optionToSelect.value;
        countryPhone.removeAttribute('disabled');
    }

    resetUser() {
        this.email = '';
        this.password = '';
        this.firstname = '';
        this.lastname = '';
        this.birthday = '';
        this.addressOne = '';
        this.addressTwo = '';
        this.postalCode = '';
        this.country = '';
        this.phone = '';
        this.product = product;
        this.isRegularAdress = false;
    }

}




