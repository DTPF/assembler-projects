class Order {
    constructor() {
        this.user = user;
        this.product = product;
        this.shipment = delivery;
    }
    
    domSetHTMLValues(e) {
        e.preventDefault();
        console.log(this);
        thankImage.src = this.product.image ? this.product.image : './assets/products/black/black-1.png';
        thanksModel.textContent = this.product.productName ? this.product.productName : 'Scooter MQT45BK';
        thanksBattery.textContent = this.product.batteryCapacity ? this.product.batteryCapacity : '10000mAh';
        thanksColor.textContent = this.product.color ? this.product.color : 'black';
        thanksPrice.textContent = this.product.price ? this.product.price : '695 €';
        thanksShipping.textContent = this.shipment.cost ? this.shipment.cost : 0;
        thanksTotalPrice.textContent = orderTotalPrice.textContent;
        registrationMinutes.textContent = minutesElapsed;
        registrationSeconds.textContent = secondsElapsed;
        thanksArriveDate.textContent = 
            `Between ${minDate.getDate()} of ${months[minDate.getMonth()]} ${minDate.getFullYear()} 14:00h and ${maxDate.getDate()} of ${months[maxDate.getMonth()]} ${maxDate.getFullYear()} 20:00h.`;
        thanksEmail.textContent = this.user.email;
        thanksName.textContent = `${this.user.firstname} ${this.user.lastname}`;
        thanksPhoneNumber.textContent = this.user.phone;
        thanksAddress.textContent = this.user.addressOne;
        thanksPostalCode.textContent = this.user.postalCode;
        thanksCountry.textContent = this.user.country;
        
        if (confirmOrderCheckbox.checked) {
            changeDomToNextForm('confirm', 'thanks');
            clearInterval(popupInterval);
            confirmOrderForm.removeEventListener('submit', this.domSetHTMLValues, true);
            confirmOrderTermsMessage.classList.add('hide');
            confirmOrderCheckbox.checked = false;
        } else {
            confirmOrderTermsMessage.textContent = 'Please accept the terms and conditions';
            confirmOrderTermsMessage.classList.remove('hide');
        }
    }
}