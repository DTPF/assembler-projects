const registeringPopupDiv = document.querySelector('.registering-time-popup');
const registeringPopupSpan = document.querySelector('#registerinTimePopup');
let popupInterval;

let timeElapsed = 0;
let secondsElapsed = 0;
let minutesElapsed = 0;

function registeringPopup() {
    const startTime = Date.now();

    popupInterval = setInterval(() => {
        timeElapsed = Date.now() - startTime;
        minutesSecondsElapsed(Math.round(timeElapsed / 1000));
        registeringPopupSpan.innerHTML = '';
        let secondsToFinish = 180 - Math.round(timeElapsed / 1000);
        let message = (secondsToFinish <= 30) ?
            `<div>
                <p class="hurryUp">Hurry up!</p>                        
                <p>
                    <span id="registerinTimePopup">${secondsToFinish} seconds to close.</span>
                </p>
            </div>`
            :
            `<div>
                <p>
                    You started registering
                    <span id="registerinTimePopup">${minutesElapsed}:${secondsElapsed} minutes ago.</span>
                </p>
                <p class="hurryUp">Hurry up!</p>
            </div>`;

        if ((timeElapsed > 30000 && timeElapsed < 35000) ||
            (timeElapsed > 60000 && timeElapsed < 65000) ||
            (timeElapsed > 90000 && timeElapsed < 95000) ||
            (timeElapsed > 120000 && timeElapsed < 125000)) {
            registeringPopupSpan.insertAdjacentHTML('beforeend', message);
            registeringPopupDiv.classList.remove('hide');
            registeringPopupDiv.classList.remove('hide-popup');
            registeringPopupDiv.classList.add('show-popup');
        } else if (timeElapsed > 150000) {
            registeringPopupSpan.insertAdjacentHTML('beforeend', message);
            registeringPopupDiv.classList.remove('hide');
            registeringPopupDiv.classList.add('show-popup');
            if (secondsToFinish <= 0) {
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

                productPage.classList.remove('hide');
                orderPage.classList.add('hide');
                headerMainOrder.classList.add('hide');
                headerMainProduct.classList.remove('hide');
                footerMainOrder.classList.add('hide');
                footerMainProduct.classList.remove('hide');
                registeringPopupDiv.classList.remove('show-popup');
                registeringPopupDiv.classList.add('hide-popup');
                footer.classList.remove('hide');

                confirmOrder.classList.remove('form-step-active');    
            }
        } else {
            registeringPopupDiv.classList.remove('show-popup');
            registeringPopupDiv.classList.add('hide-popup');
        }
    }, 1000);

    productForm.removeEventListener('submit', registeringPopup, true);
}

function minutesSecondsElapsed(e) {
    minutesElapsed = Math.floor(e % 3600 / 60).toString();
    secondsElapsed = Math.floor(e % 60).toString().padStart(2, '0');
}

productForm.addEventListener('submit', () => registeringPopup());